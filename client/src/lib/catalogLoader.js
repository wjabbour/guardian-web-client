import { detectUrlKey, initWebCatalog } from "guardian-common";

const catalogModules = import.meta.glob("../../../common/catalogs/*.js");

export async function loadCatalogForCurrentUrl() {
  const urlKey = detectUrlKey();
  if (!urlKey) return;
  const loader = catalogModules[`../../../common/catalogs/${urlKey}.js`];
  if (loader) {
    const mod = await loader();
    initWebCatalog(mod.catalog);
  }
}
