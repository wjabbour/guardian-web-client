// @ts-ignore - JS catalog files don't have type declarations
import { catalog as CannonCatalog } from "../catalogs/cannon";
// @ts-ignore
import { catalog as GuardianCatalog } from "../catalogs/guardian";
// @ts-ignore
import { catalog as HennessyCatalog } from "../catalogs/hennessy";
// @ts-ignore
import { catalog as LeithCatalog } from "../catalogs/leith";
// @ts-ignore
import { catalog as NewCustomerCatalog } from "../catalogs/newcustomer";
// @ts-ignore
import { catalog as PohankaCatalog } from "../catalogs/pohanka";
// @ts-ignore
import { catalog as PremierCatalog } from "../catalogs/premier";
// @ts-ignore
import { catalog as StiversCatalog } from "../catalogs/stivers";
// @ts-ignore
import { catalog as TameronCatalog } from "../catalogs/tameron";
// @ts-ignore
import { catalog as NavarreCatalog } from "../catalogs/navarre";
// @ts-ignore
import { catalog as HoffmanCatalog } from "../catalogs/hoffman";
// @ts-ignore
import { catalog as TommycarCatalog } from "../catalogs/tommycar";
// @ts-ignore
import { catalog as VaughnCatalog } from "../catalogs/vaughn";
// @ts-ignore
import { catalog as FriendshipCatalog } from "../catalogs/friendship";
// @ts-ignore
import { catalog as MattbowersCatalog } from "../catalogs/mattbowers";
// @ts-ignore
import { catalog as JcmortgageCatalog } from "../catalogs/jcmortgage";
// @ts-ignore
import { catalog as McdonaldCatalog } from "../catalogs/mcdonald";
// @ts-ignore
import { catalog as RossdowningCatalog } from "../catalogs/rossdowning";
// @ts-ignore
import { catalog as TascaCatalog } from "../catalogs/tasca";
// @ts-ignore
import { catalog as MullerCatalog } from "../catalogs/muller";
// @ts-ignore
import { catalog as KrauseCatalog } from "../catalogs/krause";
// @ts-ignore
import { catalog as GilesCatalog } from "../catalogs/giles";
// @ts-ignore
import { catalog as OrrCatalog } from "../catalogs/orr";

/*
  Used by backend Lambda functions to look up a catalog by company name.
  Not imported by the frontend — the frontend lazy-loads only the current
  site's catalog via initWebCatalog() in client/src/index.js.
*/
export function getCatalog(companyName: string): any {
  switch (companyName) {
    case "Cannon":      return CannonCatalog;
    case "Guardian":    return GuardianCatalog;
    case "Hennessy":    return HennessyCatalog;
    case "Leith":       return LeithCatalog;
    case "Newcustomer": return NewCustomerCatalog;
    case "Pohanka":     return PohankaCatalog;
    case "Premier":     return PremierCatalog;
    case "Stivers":     return StiversCatalog;
    case "Tameron":     return TameronCatalog;
    case "Navarre":     return NavarreCatalog;
    case "Hoffman":     return HoffmanCatalog;
    case "Tommycar":    return TommycarCatalog;
    case "Vaughn":      return VaughnCatalog;
    case "Friendship":  return FriendshipCatalog;
    case "Mattbowers":  return MattbowersCatalog;
    case "Jcmortgage":  return JcmortgageCatalog;
    case "Mcdonald":    return McdonaldCatalog;
    case "Rossdowning": return RossdowningCatalog;
    case "Tasca":       return TascaCatalog;
    case "Muller":      return MullerCatalog;
    case "Krause":      return KrauseCatalog;
    case "Giles":       return GilesCatalog;
    case "Orr":         return OrrCatalog;
  }
}
