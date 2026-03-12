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

const DEFAULT_CONFIG = {
  title: "Guardian",
};

/*
  every new config should be added to this array
*/
const allConfigs: any[] = [
  PremierConfig,
  StiversConfig,
  GuardianConfig,
  TameronConfig,
  NewCustomerConfig,
  CannonConfig,
  LeithConfig,
  HennessyConfig,
  PohankaConfig,
  NavarreConfig,
  HoffmanConfig,
  TommycarConfig,
  VaughnConfig,
  FriendshipConfig,
  MattbowersConfig,
  JcmortgageConfig,
  McdonaldConfig,
  RossdowningConfig,
  TascaConfig,
  MullerConfig,
  KrauseConfig,
];

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

// TODO: consolidate web and server config and catalog retrieval functions
export function getWebCatalog(): any {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return HennessyCatalog;
  } else if (url.includes("newcustomer")) {
    return NewCustomerCatalog;
  } else if (url.includes("stivers")) {
    return StiversCatalog;
  } else if (url.includes("tameron")) {
    return TameronCatalog;
  } else if (url.includes("premier")) {
    return PremierCatalog;
  } else if (url.includes("guardian")) {
    return GuardianCatalog;
  } else if (url.includes("cannon")) {
    return CannonCatalog;
  } else if (url.includes("leith")) {
    return LeithCatalog;
  } else if (url.includes("hennessy")) {
    return HennessyCatalog;
  } else if (url.includes("pohanka")) {
    return PohankaCatalog;
  } else if (url.includes("navarre")) {
    return NavarreCatalog;
  } else if (url.includes("hoffman")) {
    return HoffmanCatalog;
  } else if (url.includes("tommycar")) {
    return TommycarCatalog;
  } else if (url.includes("vaughn")) {
    return VaughnCatalog;
  } else if (url.includes("friendship")) {
    return FriendshipCatalog;
  } else if (url.includes("mattbowers")) {
    return MattbowersCatalog;
  } else if (url.includes("jcmortgage")) {
    return JcmortgageCatalog;
  } else if (url.includes("mcdonald")) {
    return McdonaldCatalog;
  } else if (url.includes("rossdowning")) {
    return RossdowningCatalog;
  } else if (url.includes("tasca")) {
    return TascaCatalog;
  } else if (url.includes("muller")) {
    return MullerCatalog;
  } else if (url.includes("krause")) {
    return KrauseCatalog;
  }
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
  }
}

export function getWebConfigValue(val: string): any {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return (HennessyConfig as any)[val];
  } else if (url.includes("newcustomer")) {
    return (NewCustomerConfig as any)[val];
  } else if (url.includes("stivers")) {
    return (StiversConfig as any)[val];
  } else if (url.includes("tameron")) {
    return (TameronConfig as any)[val];
  } else if (url.includes("premier")) {
    return (PremierConfig as any)[val];
  } else if (url.includes("guardian")) {
    return (GuardianConfig as any)[val];
  } else if (url.includes("cannon")) {
    return (CannonConfig as any)[val];
  } else if (url.includes("leith")) {
    return (LeithConfig as any)[val];
  } else if (url.includes("hennessy")) {
    return (HennessyConfig as any)[val];
  } else if (url.includes("pohanka")) {
    return (PohankaConfig as any)[val];
  } else if (url.includes("navarre")) {
    return (NavarreConfig as any)[val];
  } else if (url.includes("hoffman")) {
    return (HoffmanConfig as any)[val];
  } else if (url.includes("tommycar")) {
    return (TommycarConfig as any)[val];
  } else if (url.includes("vaughn")) {
    return (VaughnConfig as any)[val];
  } else if (url.includes("friendship")) {
    return (FriendshipConfig as any)[val];
  } else if (url.includes("mattbowers")) {
    return (MattbowersConfig as any)[val];
  } else if (url.includes("jcmortgage")) {
    return (JcmortgageConfig as any)[val];
  } else if (url.includes("mcdonald")) {
    return (McdonaldConfig as any)[val];
  } else if (url.includes("rossdowning")) {
    return (RossdowningConfig as any)[val];
  } else if (url.includes("tasca")) {
    return (TascaConfig as any)[val];
  } else if (url.includes("muller")) {
    return (MullerConfig as any)[val];
  } else if (url.includes("krause")) {
    return (KrauseConfig as any)[val];
  } else {
    // when the user is on gpc81.com landing page we need to display a string in the browser tab
    return (DEFAULT_CONFIG as any)[val];
  }
}

export function getConfigValue(val: string, config: string): any {
  console.log(val, config);
  switch (config) {
    case "Cannon":
      return (CannonConfig as any)[val];
    case "Guardian":
      return (GuardianConfig as any)[val];
    case "Hennessy":
      return (HennessyConfig as any)[val];
    case "Leith":
      return (LeithConfig as any)[val];
    case "Pohanka":
      return (PohankaConfig as any)[val];
    case "Premier":
      return (PremierConfig as any)[val];
    case "Stivers":
      return (StiversConfig as any)[val];
    case "Tameron":
      return (TameronConfig as any)[val];
    case "Navarre":
      return (NavarreConfig as any)[val];
    case "Hoffman":
      return (HoffmanConfig as any)[val];
    case "Tommycar":
      return (TommycarConfig as any)[val];
    case "Vaughn":
      return (VaughnConfig as any)[val];
    case "Friendship":
      return (FriendshipConfig as any)[val];
    case "Mattbowers":
      return (MattbowersConfig as any)[val];
    case "Jcmortgage":
      return (JcmortgageConfig as any)[val];
    case "Mcdonald":
      return (McdonaldConfig as any)[val];
    case "Rossdowning":
      return (RossdowningConfig as any)[val];
    case "Tasca":
      return (TascaConfig as any)[val];
    case "Muller":
      return (MullerConfig as any)[val];
    case "Krause":
      return (KrauseConfig as any)[val];
  }
}

