import { config as CannonConfig } from "./configs/cannon";
import { config as GuardianConfig } from "./configs/guardian";
import { config as HennessyConfig } from "./configs/hennessy";
import { config as LeithConfig } from "./configs/leith";
import { config as NewCustomerConfig } from "./configs/newcustomer";
import { config as PohankaConfig } from "./configs/pohanka";
import { config as PremierConfig } from "./configs/premier";
import { config as StiversConfig } from "./configs/stivers";
import { config as TameronConfig } from "./configs/tameron";

export function getStore(store_code) {
  const keys = Object.keys(STORES);

  for (let i = 0; i < keys.length; i++) {
    if (STORES[keys[i]] === store_code) {
      return keys[i];
    }
  }
}

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
];

export function getStoreCode(companyName, storeCode) {
  const config = allConfigs.find(
    (config) => config.title === companyName
  );

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

export function getConfigValue(val) {
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
  } else {
    // when the user is on gpc81.com landing page we need to display a string in the browser tab
    return DEFAULT_CONFIG[val];
  }
}

export { CannonConfig };
