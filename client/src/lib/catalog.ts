import { CatalogItem } from "./interfaces";
import { TameronCatalog } from "../catalogs/tameron";
import { StiversCatalog } from "../catalogs/stivers";
import { LeithCatalog } from "../catalogs/leith";
import { PremierCatalog } from "../catalogs/premier";
<<<<<<< HEAD
import { GuardianCatalog } from "../catalogs/guardian";
=======
import { NewCustomerCatalog } from "../catalogs/newcustomer";
>>>>>>> faef09e4674ecaf658fbeb8a153917136b750b48

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return NewCustomerCatalog;
  } else if (url.includes("newcustomer.gpstivers.com")) {
    return NewCustomerCatalog;
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
