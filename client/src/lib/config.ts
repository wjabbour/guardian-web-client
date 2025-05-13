import { config as PremierConfig } from "../configs/premier";
import { config as StiversConfig } from "../configs/stivers";
import { config as TameronConfig } from "../configs/tameron";
import { config as NewCustomerConfig } from "../configs/newcustomer";
import { config as GuardianConfig } from "../configs/guardian";
import { config as CannonConfig } from "../configs/cannon";
import { config as HennessyConfig } from "../configs/hennessy";
import { config as LeithConfig } from "../configs/leith";
import { config as PohankaConfig } from "../configs/pohanka";
import { config as NavarreConfig } from "../configs/navarre";
import { Config } from "./interfaces";

const DEFAULT_CONFIG = {
  title: "Guardian",
};

/*
  every new config should be added to this array
*/
const allConfigs: Config[] = [
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

export function getRoutePrefix(password: string): string | undefined {
  const config = allConfigs.find((config) => {
    return (config.password === password);
  });

  return config ? config.route_prefix : undefined;
}

export function getConfigValue(val: keyof Config) {
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
