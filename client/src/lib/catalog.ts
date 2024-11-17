import { CatalogItem } from "./interfaces";
import { TameronCatalog } from "../catalogs/tameron";
import { StiversCatalog } from "../catalogs/stivers";
import { NewSiteCatalog } from "../catalogs/gp---------";
import { PremierCatalog } from "../catalogs/premier";

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return TameronCatalog;
  } else if (url.includes("gpstivers.com")) {
    return StiversCatalog;
  } else if (url.includes("gp---------.com")) {
    return NewSiteCatalog;
  } else if (url.includes("gptameron.com")) {
    return TameronCatalog;
  } else if (url.includes("gp-premier.com")) {
    return PremierCatalog;
  }
};
