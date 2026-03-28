// Frontend entry point for guardian-common.
// Does NOT import catalogFunctions so catalogs are excluded from the Vite bundle.
// The frontend lazy-loads only the current site's catalog via initWebCatalog().
export * from "./types";
export * from "./functions";
