import { TameronCatalog } from "./catalogs/tameron";
import { StiversCatalog } from "./catalogs/stivers";
import { LeithCatalog } from "./catalogs/leith";
import { PremierCatalog } from "./catalogs/premier";
import { GuardianCatalog } from "./catalogs/guardian";
import { CatalogItem } from "./interfaces";

export const Catalog = function (origin): CatalogItem[] {
  const url = origin;
  if (url.includes("localhost:3000")) {
    return TameronCatalog;
  } else if (url.includes("gpstivers.com")) {
    return StiversCatalog;
  } else if (url.includes("------------")) {
    return LeithCatalog;
  } else if (url.includes("gptameron.com")) {
    return TameronCatalog;
  } else if (url.includes("gp-premier.com")) {
    return PremierCatalog;
  } else if (url.includes("--------------")) {
    return GuardianCatalog;
  }
};
