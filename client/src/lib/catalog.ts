import { CatalogItem } from "./interfaces";
import { TameronCatalog } from "../catalogs/tameron";
import { StiversCatalog } from "../catalogs/stivers";
import { PremierCatalog } from "../catalogs/premier";
import { NewCustomerCatalog } from "../catalogs/newcustomer";
import { CannonCatalog } from "../catalogs/cannon";

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return NewCustomerCatalog;
  } else if (url.includes("newcustomer.gpstivers.com")) {
    return NewCustomerCatalog;
  } else if (url.includes("gpstivers.com")) {
    return StiversCatalog;
  } else if (url.includes("gptameron.com")) {
    return TameronCatalog;
  } else if (url.includes("gp-premier.com")) {
    return PremierCatalog;
  } else if (url.includes("cannonemployeestore.com")) {
    return CannonCatalog;
  }
};
