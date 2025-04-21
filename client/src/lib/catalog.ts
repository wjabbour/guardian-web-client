import { CatalogItem } from "./interfaces";
import { TameronCatalog } from "../catalogs/tameron";
import { StiversCatalog } from "../catalogs/stivers";
import { PremierCatalog } from "../catalogs/premier";
import { NewCustomerCatalog } from "../catalogs/newcustomer";
import { CannonCatalog } from "../catalogs/cannon";
import { GuardianCatalog } from "../catalogs/guardian";
import { HennessyCatalog } from "../catalogs/hennessy";
import { LeithCatalog } from "../catalogs/leith";

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return HennessyCatalog;
  } else if (url.includes("newcustomer")) {
    return NewCustomerCatalog;
  } else if (url.includes("gpstivers")) {
    return StiversCatalog;
  } else if (url.includes("gptameron")) {
    return TameronCatalog;  
  } else if (url.includes("gp-premier")) {
    return PremierCatalog;
  } else if (url.includes("guardian")) {
    return GuardianCatalog;
  } else if (url.includes("cannon")) {
    return CannonCatalog;
  } else if (url.includes("hennessy")) {
    return HennessyCatalog;
  } else if (url.includes("leith")) {
    return LeithCatalog;
  }
};
