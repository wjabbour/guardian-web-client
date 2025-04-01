import { config as PremierConfig } from "../configs/premier";
import { config as StiversConfig } from "../configs/stivers";
import { config as TameronConfig } from "../configs/tameron";
import { config as NewCustomerConfig } from "../configs/newcustomer";
import { config as CannonConfig } from "../configs/cannon";
import { config as HennessyConfig } from "../configs/hennessy";
import { Config } from "./interfaces";

export function getConfigValue(val: keyof Config) {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return HennessyConfig[val];
  } else if (url.includes("newcustomer.gpstivers.com")) {
    return NewCustomerConfig[val];
  } else if (url.includes("gpstivers.com")) {
    return StiversConfig[val];
  } else if (url.includes("gptameron.com")) {
    return TameronConfig[val];
  } else if (url.includes("gp-premier.com")) {
    return PremierConfig[val];
  } else if (url.includes("cannonemployeestore.com")) {
    return CannonConfig[val];
  } else if (url.includes("gpc81.com")) {
    return HennessyConfig[val];
  }
}
