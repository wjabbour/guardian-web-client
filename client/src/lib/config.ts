import { config as PremierConfig } from "../configs/premier";
import { config as StiversConfig } from "../configs/stivers";
import { config as TameronConfig } from "../configs/tameron";
import { config as NewCustomerConfig } from "../configs/newcustomer";
import { config as CannonConfig } from "../configs/cannon";
import { config as HennessyConfig } from "../configs/hennessy";
import { Config } from "./interfaces";

const DEFAULT_CONFIG = {
  title: 'Guardian'
}

export function getConfigValue(val: keyof Config) {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return HennessyConfig[val];
  } else if (url.includes("newcustomer")) {
    return NewCustomerConfig[val];
  } else if (url.includes("gpstivers")) {
    return StiversConfig[val];
  } else if (url.includes("gptameron")) {
    return TameronConfig[val];
  } else if (url.includes("gp-premier")) {
    return PremierConfig[val];
  } else if (url.includes("cannon")) {
    return CannonConfig[val];
  } else if (url.includes("hennessy")) {
    return HennessyConfig[val];
  } else {
    // when the user is on gpc81.com landing page we need to display a string in the browser tab
    return DEFAULT_CONFIG[val]
  }
}
