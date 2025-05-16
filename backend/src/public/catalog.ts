import { TameronCatalog } from "./catalogs/tameron";
import { StiversCatalog } from "./catalogs/stivers";
import { PremierCatalog } from "./catalogs/premier";
import { CannonCatalog } from "./catalogs/cannon";
import { GuardianCatalog } from "./catalogs/guardian";
import { LeithCatalog } from "./catalogs/leith";
import { CatalogItem } from "./interfaces";
import { HennessyCatalog } from "./catalogs/hennessy";
import { PohankaCatalog } from "./catalogs/pohanka";
import { NavarreCatalog } from "./catalogs/navarre";

export const Catalog = function (companyName: string): CatalogItem[] {
  if (companyName === "Tameron") {
    return TameronCatalog;
  } else if (companyName === "Stivers") {
    return StiversCatalog;
  } else if (companyName === "Premier") {
    return PremierCatalog;
  } else if (companyName === "Cannon") {
    return CannonCatalog;
  } else if (companyName === "Guardian") {
    return GuardianCatalog;
  } else if (companyName === "Hennessy") {
    return HennessyCatalog;
  } else if (companyName === "Leith") {
    return LeithCatalog;
  } else if (companyName === "Pohanka") {
    return PohankaCatalog;
  } else if (companyName === "Navarre") {
    return NavarreCatalog;

  }
};
