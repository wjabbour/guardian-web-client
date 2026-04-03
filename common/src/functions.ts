import { CatalogItem } from "./types";

// @ts-ignore - JS config files don't have type declarations
import { config as CannonConfig } from "../configs/cannon";
// @ts-ignore
import { config as GuardianConfig } from "../configs/guardian";
// @ts-ignore
import { config as HennessyConfig } from "../configs/hennessy";
// @ts-ignore
import { config as LeithConfig } from "../configs/leith";
// @ts-ignore
import { config as NewCustomerConfig } from "../configs/newcustomer";
// @ts-ignore
import { config as PohankaConfig } from "../configs/pohanka";
// @ts-ignore
import { config as PremierConfig } from "../configs/premier";
// @ts-ignore
import { config as StiversConfig } from "../configs/stivers";
// @ts-ignore
import { config as TameronConfig } from "../configs/tameron";
// @ts-ignore
import { config as NavarreConfig } from "../configs/navarre";
// @ts-ignore
import { config as HoffmanConfig } from "../configs/hoffman";
// @ts-ignore
import { config as TommycarConfig } from "../configs/tommycar";
// @ts-ignore
import { config as VaughnConfig } from "../configs/vaughn";
// @ts-ignore
import { config as FriendshipConfig } from "../configs/friendship";
// @ts-ignore
import { config as MattbowersConfig } from "../configs/mattbowers";
// @ts-ignore
import { config as JcmortgageConfig } from "../configs/jcmortgage";
// @ts-ignore
import { config as McdonaldConfig } from "../configs/mcdonald";
// @ts-ignore
import { config as RossdowningConfig } from "../configs/rossdowning";
// @ts-ignore
import { config as TascaConfig } from "../configs/tasca";
// @ts-ignore
import { config as MullerConfig } from "../configs/muller";
// @ts-ignore
import { config as KrauseConfig } from "../configs/krause";
// @ts-ignore
import { config as GilesConfig } from "../configs/giles";
// @ts-ignore
import { config as OrrConfig } from "../configs/orr";



const DEFAULT_CONFIG = {
  title: "Guardian",
  account_reps: [],
};

/*
  Every new site should be added to this array. Each entry needs:
    - urlKey: a string present in both the site's domain and its gpc81 path (e.g. "hennessy" matches
              hennessy.com and gpc81.com/hennessy)
    - config: the site's config object
    - catalog: the site's catalog array

  This single registry drives getWebConfigValue and getConfigValue — so adding
  a new site only requires one entry here instead of multiple separate places.
  Catalogs are intentionally excluded: the frontend lazy-loads only the current
  site's catalog via initWebCatalog(); the backend uses getCatalog() from catalogFunctions.ts.
*/
const SITE_REGISTRY: { urlKey: string; config: any }[] = [
  { urlKey: "newcustomer",  config: NewCustomerConfig  },
  { urlKey: "stivers",      config: StiversConfig      },
  { urlKey: "tameron",      config: TameronConfig      },
  { urlKey: "premier",      config: PremierConfig      },
  { urlKey: "guardian",     config: GuardianConfig     },
  { urlKey: "cannon",       config: CannonConfig       },
  { urlKey: "leith",        config: LeithConfig        },
  { urlKey: "hennessy",     config: HennessyConfig     },
  { urlKey: "pohanka",      config: PohankaConfig      },
  { urlKey: "navarre",      config: NavarreConfig      },
  { urlKey: "hoffman",      config: HoffmanConfig      },
  { urlKey: "tommycar",     config: TommycarConfig     },
  { urlKey: "vaughn",       config: VaughnConfig       },
  { urlKey: "friendship",   config: FriendshipConfig   },
  { urlKey: "mattbowers",   config: MattbowersConfig   },
  { urlKey: "jcmortgage",   config: JcmortgageConfig   },
  { urlKey: "mcdonald",     config: McdonaldConfig     },
  { urlKey: "rossdowning",  config: RossdowningConfig  },
  { urlKey: "tasca",        config: TascaConfig        },
  { urlKey: "muller",       config: MullerConfig       },
  { urlKey: "krause",       config: KrauseConfig       },
  { urlKey: "giles",        config: GilesConfig        },
  { urlKey: "orr",          config: OrrConfig          },
];

const allConfigs: any[] = SITE_REGISTRY.map((s) => s.config);

export function getStoreCode(companyName: string, storeAddress: string): string | undefined {
  const config = allConfigs.find((config) => config.title === companyName);

  if (!config) return undefined;

  for (const store of config.stores) {
    // cannon doesnt have addresses
    if (
      storeAddress === store.name ||
      storeAddress === `${store.name}, ${store.address}`
    ) {
      return store.code;
    }
  }
}

export function getStore(companyName: string, storeCode: string): string | undefined {
  const config = allConfigs.find((config) => config.title === companyName);

  if (!config) return undefined;

  for (const store of config.stores) {
    if (storeCode === store.code) return store.name;
  }
}

// determines where to direct the user after they have successfully entered a password on gpc81
export function getRoutePrefix(password: string): string | undefined {
  const config = allConfigs.find((config) => {
    return config.password === password;
  });

  return config ? config.route_prefix : undefined;
}

function getSiteByUrl(): { urlKey: string; config: any } | undefined {
  const url = window.location.href;
  if (url.includes("localhost")) return SITE_REGISTRY.find((s) => s.urlKey === "hennessy");
  return SITE_REGISTRY.find((s) => url.includes(s.urlKey));
}

export function detectUrlKey(): string {
  const url = window.location.href;
  if (url.includes("localhost")) return "hennessy";
  return SITE_REGISTRY.find((s) => url.includes(s.urlKey))?.urlKey ?? "";
}

let _webCatalog: any = null;

export function initWebCatalog(catalog: any): void {
  _webCatalog = catalog;
}

export function getWebCatalog(): any {
  return _webCatalog;
}

export function getWebConfigValue(val: string): any {
  return (getSiteByUrl()?.config ?? DEFAULT_CONFIG)[val];
}

export function getConfigValue(val: string, config: string): any {
  return allConfigs.find((c) => c.title === config)?.[val];
}

