import { config as PremierConfig } from "../configs/premier";
import { config as StiversConfig } from "../configs/stivers";
import { config as TameronConfig } from "../configs/tameron";
import { config as LeithConfig } from "../configs/leith";
import { config as GuardianConfig } from "../configs/guardian";
import { Config } from "./interfaces";

export function getConfigValue(val: keyof Config) {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return TameronConfig[val];
  } else if (url.includes("gpstivers.com")) {
    return StiversConfig[val];
  } else if (url.includes("gpc81.com")) {
    return LeithConfig[val];
  } else if (url.includes("gptameron.com")) {
    return TameronConfig[val];
  } else if (url.includes("gp-premier.com")) {
    return PremierConfig[val];
  } else if (url.includes("gpc81.com")) {
    return GuardianConfig[val];  
  }
}
