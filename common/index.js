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
];

export function getStoreCode(companyName, storeAddress) {
  const config = allConfigs.find((config) => config.title === companyName);

  for (const [address, code] of Object.entries(config.stores)) {
    if (address === storeAddress) return code;
  }
}

export function getStore(companyName, storeCode) {
  const config = allConfigs.find((config) => config.title === companyName);

  for (const [address, code] of Object.entries(config.stores)) {
    if (code === storeCode) return address;
  }
}

export function getRoutePrefix(password) {
  const config = allConfigs.find((config) => {
    return config.password === password;
  });

  return config ? config.route_prefix : undefined;
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
  } else {
    // when the user is on gpc81.com landing page we need to display a string in the browser tab
    return DEFAULT_CONFIG[val];
  }
}

export function getConfigValue(val, config) {
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
  }
}
