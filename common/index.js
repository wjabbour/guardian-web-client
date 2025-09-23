import { config as CannonConfig } from "./configs/cannon";
import { config as GuardianConfig } from "./configs/guardian";
import { config as HennessyConfig } from "./configs/hennessy";
import { config as LeithConfig } from "./configs/leith";
import { config as NewCustomerConfig } from "./configs/newcustomer";
import { config as PohankaConfig } from "./configs/pohanka";
import { config as PremierConfig } from "./configs/premier";
import { config as StiversConfig } from "./configs/stivers";
import { config as TameronConfig } from "./configs/tameron";
import { config as NavarreConfig } from "./configs/navarre";
import { config as HoffmanConfig } from "./configs/hoffman";
import { config as TommycarConfig } from "./configs/tommycar";
import { config as VaughnConfig } from "./configs/vaughn";
import { config as FriendshipConfig } from "./configs/friendship";
import { catalog as CannonCatalog } from "./catalogs/cannon";
import { catalog as GuardianCatalog } from "./catalogs/guardian";
import { catalog as HennessyCatalog } from "./catalogs/hennessy";
import { catalog as LeithCatalog } from "./catalogs/leith";
import { catalog as NewCustomerCatalog } from "./catalogs/newcustomer";
import { catalog as PohankaCatalog } from "./catalogs/pohanka";
import { catalog as PremierCatalog } from "./catalogs/premier";
import { catalog as StiversCatalog } from "./catalogs/stivers";
import { catalog as TameronCatalog } from "./catalogs/tameron";
import { catalog as NavarreCatalog } from "./catalogs/navarre";
import { catalog as HoffmanCatalog } from "./catalogs/hoffman";
import { catalog as TommycarCatalog } from "./catalogs/tommycar";
import { catalog as VaughnCatalog } from "./catalogs/vaughn";
import { catalog as FriendshipCatalog } from "./catalogs/friendship";

const DEFAULT_CONFIG = {
  title: "Guardian",
};

/*
  every new config should be added to this array
*/
const allConfigs = [
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
 
];

export function getStoreCode(companyName, storeAddress) {
  const config = allConfigs.find((config) => config.title === companyName);

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

export function getStore(companyName, storeCode) {
  const config = allConfigs.find((config) => config.title === companyName);

  for (const store of config.stores) {
    if (storeCode === store.code) return store.name;
  }
}

// determines where to direct the user after they have successfully entered a password on gpc81
export function getRoutePrefix(password) {
  const config = allConfigs.find((config) => {
    return config.password === password;
  });

  return config ? config.route_prefix : undefined;
}

// TODO: consolidate web and server config and catalog retrieval functions
export function getWebCatalog() {
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
  
  }
}

/*
  the values should exactly match one of the configs' value for title

  e.g. a config must have title: "Cannon", "Guardian", etc
*/
export function getCatalog(companyName) {
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
  }
}

export function getWebConfigValue(val) {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return HennessyConfig[val];
  } else if (url.includes("newcustomer")) {
    return NewCustomerConfig[val];
  } else if (url.includes("stivers")) {
    return StiversConfig[val];
  } else if (url.includes("tameron")) {
    return TameronConfig[val];
  } else if (url.includes("premier")) {
    return PremierConfig[val];
  } else if (url.includes("guardian")) {
    return GuardianConfig[val];
  } else if (url.includes("cannon")) {
    return CannonConfig[val];
  } else if (url.includes("leith")) {
    return LeithConfig[val];
  } else if (url.includes("hennessy")) {
    return HennessyConfig[val];
  } else if (url.includes("pohanka")) {
    return PohankaConfig[val];
  } else if (url.includes("navarre")) {
    return NavarreConfig[val];
  } else if (url.includes("hoffman")) {
    return HoffmanConfig[val];
  } else if (url.includes("tommycar")) {
    return TommycarConfig[val]; 
  } else if (url.includes("vaughn")) {
    return VaughnConfig[val];
  } else if (url.includes("friendship")) {
    return FriendshipConfig[val];

  } else {
    // when the user is on gpc81.com landing page we need to display a string in the browser tab
    return DEFAULT_CONFIG[val];
  }
}

export function getConfigValue(val, config) {
  console.log(val, config);
  switch (config) {
    case "Cannon":
      return CannonConfig[val];
    case "Guardian":
      return GuardianConfig[val];
    case "Hennessy":
      return HennessyConfig[val];
    case "Leith":
      return LeithConfig[val];
    case "Pohanka":
      return PohankaConfig[val];
    case "Premier":
      return PremierConfig[val];
    case "Stivers":
      return StiversConfig[val];
    case "Tameron":
      return TameronConfig[val];
    case "Navarre":
      return NavarreConfig[val];
    case "Hoffman":
      return HoffmanConfig[val];
    case "Tommycar":
      return TommycarConfig[val]; 
    case "Vaughn":
      return VaughnConfig[val];
    case "Friendship":
      return FriendshipConfig[val];  
  }
}
