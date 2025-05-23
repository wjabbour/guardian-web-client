import { CatalogItem } from "./interfaces";
import { TameronCatalog } from "../catalogs/tameron";
import { StiversCatalog } from "../catalogs/stivers";
import { PremierCatalog } from "../catalogs/premier";
import { NewCustomerCatalog } from "../catalogs/newcustomer";
import { CannonCatalog } from "../catalogs/cannon";
import { GuardianCatalog } from "../catalogs/guardian";
import { HennessyCatalog } from "../catalogs/hennessy";
import { LeithCatalog } from "../catalogs/leith";
import { PohankaCatalog } from "../catalogs/pohanka";
import { NavarreCatalog } from "../catalogs/navarre";

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href;
  if (url.includes("localhost:3000")) {
    return HennessyCatalog;
  } else if (url.includes("newcustomer")) {
    return NewCustomerCatalog;
  } else if (url.includes("stivers")) {
    return StiversCatalog;
  } else if (url.includes("tameron")) {
    return TameronCatalog;  
  } else if (url.includes("premier")) {
    return PremierCatalog;
  } else if (url.includes("guardian")) {
    return GuardianCatalog;
  } else if (url.includes("cannon")) {
    return CannonCatalog;
  } else if (url.includes("hennessy")) {
    return HennessyCatalog;
  } else if (url.includes("leith")) {
    return LeithCatalog;
  } else if (url.includes("pohanka")) {
    return PohankaCatalog; 
  } else if (url.includes("navarre")) {
    return NavarreCatalog;  
  }
};
