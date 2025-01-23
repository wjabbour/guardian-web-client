import { CatalogItem } from "./interfaces";
import { TameronCatalog } from "../catalogs/tameron";
import { StiversCatalog } from "../catalogs/stivers";
import { LeithCatalog } from "../catalogs/leith";
import { PremierCatalog } from "../catalogs/premier";
import { GuardianCatalog } from "../catalogs/guardian";

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return TameronCatalog;
  } else if (url.includes("gpstivers.com")) {
    return StiversCatalog;
  } else if (url.includes("gpc81.com")) {
    return LeithCatalog;
  } else if (url.includes("gptameron.com")) {
    return TameronCatalog;
  } else if (url.includes("gp-premier.com")) {
    return PremierCatalog;
  } else if (url.includes("gpc81.com")) {
    return GuardianCatalog;  
  }
};
