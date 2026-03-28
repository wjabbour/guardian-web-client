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

// @ts-ignore - JS catalog files don't have type declarations
import { catalog as CannonCatalog } from "../catalogs/cannon";
// @ts-ignore
import { catalog as GuardianCatalog } from "../catalogs/guardian";
// @ts-ignore
import { catalog as HennessyCatalog } from "../catalogs/hennessy";
// @ts-ignore
import { catalog as LeithCatalog } from "../catalogs/leith";
// @ts-ignore
import { catalog as NewCustomerCatalog } from "../catalogs/newcustomer";
// @ts-ignore
import { catalog as PohankaCatalog } from "../catalogs/pohanka";
// @ts-ignore
import { catalog as PremierCatalog } from "../catalogs/premier";
// @ts-ignore
import { catalog as StiversCatalog } from "../catalogs/stivers";
// @ts-ignore
import { catalog as TameronCatalog } from "../catalogs/tameron";
// @ts-ignore
import { catalog as NavarreCatalog } from "../catalogs/navarre";
// @ts-ignore
import { catalog as HoffmanCatalog } from "../catalogs/hoffman";
// @ts-ignore
import { catalog as TommycarCatalog } from "../catalogs/tommycar";
// @ts-ignore
import { catalog as VaughnCatalog } from "../catalogs/vaughn";
// @ts-ignore
import { catalog as FriendshipCatalog } from "../catalogs/friendship";
// @ts-ignore
import { catalog as MattbowersCatalog } from "../catalogs/mattbowers";
// @ts-ignore
import { catalog as JcmortgageCatalog } from "../catalogs/jcmortgage";
// @ts-ignore
import { catalog as McdonaldCatalog } from "../catalogs/mcdonald";
// @ts-ignore
import { catalog as RossdowningCatalog } from "../catalogs/rossdowning";
// @ts-ignore
import { catalog as TascaCatalog } from "../catalogs/tasca";
// @ts-ignore
import { catalog as MullerCatalog } from "../catalogs/muller";
// @ts-ignore
import { catalog as KrauseCatalog } from "../catalogs/krause";
// @ts-ignore
import { catalog as GilesCatalog } from "../catalogs/giles";

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

  This single registry drives getWebConfigValue, getWebCatalog, and getConfigValue — so adding
  a new site only requires one entry here instead of three separate places.
*/
const SITE_REGISTRY: { urlKey: string; config: any; catalog: any }[] = [
  { urlKey: "newcustomer",  config: NewCustomerConfig,  catalog: NewCustomerCatalog  },
  { urlKey: "stivers",      config: StiversConfig,      catalog: StiversCatalog      },
  { urlKey: "tameron",      config: TameronConfig,      catalog: TameronCatalog      },
  { urlKey: "premier",      config: PremierConfig,      catalog: PremierCatalog      },
  { urlKey: "guardian",     config: GuardianConfig,     catalog: GuardianCatalog     },
  { urlKey: "cannon",       config: CannonConfig,       catalog: CannonCatalog       },
  { urlKey: "leith",        config: LeithConfig,        catalog: LeithCatalog        },
  { urlKey: "hennessy",     config: HennessyConfig,     catalog: HennessyCatalog     },
  { urlKey: "pohanka",      config: PohankaConfig,      catalog: PohankaCatalog      },
  { urlKey: "navarre",      config: NavarreConfig,      catalog: NavarreCatalog      },
  { urlKey: "hoffman",      config: HoffmanConfig,      catalog: HoffmanCatalog      },
  { urlKey: "tommycar",     config: TommycarConfig,     catalog: TommycarCatalog     },
  { urlKey: "vaughn",       config: VaughnConfig,       catalog: VaughnCatalog       },
  { urlKey: "friendship",   config: FriendshipConfig,   catalog: FriendshipCatalog   },
  { urlKey: "mattbowers",   config: MattbowersConfig,   catalog: MattbowersCatalog   },
  { urlKey: "jcmortgage",   config: JcmortgageConfig,   catalog: JcmortgageCatalog   },
  { urlKey: "mcdonald",     config: McdonaldConfig,     catalog: McdonaldCatalog     },
  { urlKey: "rossdowning",  config: RossdowningConfig,  catalog: RossdowningCatalog  },
  { urlKey: "tasca",        config: TascaConfig,        catalog: TascaCatalog        },
  { urlKey: "muller",       config: MullerConfig,       catalog: MullerCatalog       },
  { urlKey: "krause",       config: KrauseConfig,       catalog: KrauseCatalog       },
  { urlKey: "giles",        config: GilesConfig,        catalog: GilesCatalog        },
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

function getSiteByUrl(): { config: any; catalog: any } | undefined {
  const url = window.location.href;
  if (url.includes("localhost")) return SITE_REGISTRY.find((s) => s.urlKey === "hennessy");
  return SITE_REGISTRY.find((s) => url.includes(s.urlKey));
}

export function getWebCatalog(): any {
  return getSiteByUrl()?.catalog;
}

/*
  the values should exactly match one of the configs' value for title

  e.g. a config must have title: "Cannon", "Guardian", etc
*/
export function getCatalog(companyName: string): any {
  switch (companyName) {
    case "Cannon":
      return CannonCatalog;
    case "Guardian":
      return GuardianCatalog;
    case "Hennessy":
      return HennessyCatalog;
    case "Leith":
      return LeithCatalog;
    case "Pohanka":
      return PohankaCatalog;
    case "Premier":
      return PremierCatalog;
    case "Stivers":
      return StiversCatalog;
    case "Tameron":
      return TameronCatalog;
    case "Navarre":
      return NavarreCatalog;
    case "Hoffman":
      return HoffmanCatalog;
    case "Tommycar":
      return TommycarCatalog;
    case "Vaughn":
      return VaughnCatalog;
    case "Friendship":
      return FriendshipCatalog;
    case "Mattbowers":
      return MattbowersCatalog;
    case "Jcmortgage":
      return JcmortgageCatalog;
    case "Mcdonald":
      return McdonaldCatalog;
    case "Rossdowning":
      return RossdowningCatalog;
    case "Tasca":
      return TascaCatalog;
    case "Muller":
      return MullerCatalog;
    case "Krause":
      return KrauseCatalog;
    case "Giles":
      return GilesCatalog;
  }
}

export function getWebConfigValue(val: string): any {
  return (getSiteByUrl()?.config ?? DEFAULT_CONFIG)[val];
}

export function getConfigValue(val: string, config: string): any {
  return allConfigs.find((c) => c.title === config)?.[val];
}

