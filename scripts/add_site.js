#!/usr/bin/env node
/**
 * Interactive script to scaffold a new site.
 *
 * Usage (from the project root):
 *   node scripts/add_site.js
 *
 * What it does:
 *   1. Asks a series of questions about the new site
 *   2. Creates common/configs/<urlKey>.js
 *   3. Creates common/catalogs/<urlKey>.js  (empty catalog ready to populate)
 *   4. Adds the site to SITE_REGISTRY in common/src/functions.ts
 *   5. Adds the getCatalog case in common/src/catalogFunctions.ts
 */

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question, defaultValue) {
  return new Promise((resolve) => {
    const hint = defaultValue ? ` (default: ${defaultValue})` : "";
    rl.question(`${question}${hint}: `, (answer) => {
      resolve(answer.trim() || defaultValue || "");
    });
  });
}

async function askList(question) {
  console.log(`${question} (blank line to finish):`);
  const items = [];
  while (true) {
    const value = await ask("  >", "");
    if (!value) break;
    items.push(value);
  }
  return items;
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function main() {
  console.log("\n=== Add New Site ===\n");

  const urlKey = (await ask("URL key — must appear in both the domain and the gpc81 path\n  e.g. 'honda' matches 'gp-honda.com' and 'gpc81.com/honda'")).toLowerCase();
  if (!urlKey) { console.error("URL key is required."); process.exit(1); }

  const configPath  = path.join(ROOT, "common", "configs",  `${urlKey}.js`);
  const catalogPath = path.join(ROOT, "common", "catalogs", `${urlKey}.js`);

  if (fs.existsSync(configPath)) {
    console.error(`\nConfig already exists: ${configPath}`);
    process.exit(1);
  }

  const title       = await ask("Site title (used internally to identify the site)", titleCase(urlKey));
  const domain      = await ask("Production domain (e.g. gp-honda.com)", `${urlKey}.com`);
  const routePrefix = await ask("gpc81 route prefix (e.g. /honda)", `/${urlKey}`);
  const password    = await ask("gpc81 login password");
  const companyLogo = await ask("Company logo filename in client/public/images", `${urlKey}.png`);
  const serverHost  = await ask("Server hostname", "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com");
  const paypalStr   = await ask("PayPal supported? (yes/no)", "no");
  const paypalNotSupported = paypalStr.toLowerCase() !== "yes";

  console.log("\nEmail recipients for order notifications:");
  const emailRecipients = await askList("  Email addresses");

  console.log("\nAccount reps:");
  const reps = [];
  let addingReps = true;
  while (addingReps) {
    const repName = await ask("  Rep name (blank to finish)");
    if (!repName) { addingReps = false; break; }
    const repTerritory = await ask("  Territory (e.g. FL or RI, CT)", "");
    const repEmail = await ask("  Email (leave blank to use phone instead)", "");
    const repPhone = repEmail ? "" : await ask("  Phone", "");
    reps.push({ name: repName, territory: repTerritory, email: repEmail, phone: repPhone });
  }

  // ── Generate config ──────────────────────────────────────────────────────────

  const repLines = reps.map((r) => {
    const fields = [`name: "${r.name}"`];
    if (r.territory) fields.push(`territory: "${r.territory}"`);
    if (r.email)     fields.push(`email: "${r.email}"`);
    if (r.phone)     fields.push(`phone: "${r.phone}"`);
    return `    { ${fields.join(", ")} }`;
  }).join(",\n");

  const emailLines = emailRecipients.map((e) => `    "${e}"`).join(",\n");

  const configContent = `export const config = {
  title: "${title}",
  company_logo: "${companyLogo}",
  logo_placements: {
    mens:    ["Left Chest"],
    womens:  ["Left Chest"],
    hat:     ["Front Center"],
    tshirts: ["Left Chest"],
  },
  show_image_preview: true,
  minimum_apparel_order: false,
  enable_customs_store_picker: false,
  embroideries: {
    mens:      [],
    womens:    [],
    tshirts:   [],
    hat:       [],
    customs:   [],
    office:    [],
    service:   [],
    sales:     [],
    detail:    [],
    bodyshop:  [],
    parts:     [],
    accessory: [],
  },
  email_recipients: [
${emailLines}
  ],
  stores: [],
  bypass_codes: ["TEST"],
  server_hostname: "${serverHost}",
  account_reps: [
${repLines}
  ],
  route_prefix: "${routePrefix}",
  paypal_not_supported: ${paypalNotSupported},
  password: "${password}",
};
`;

  // ── Generate catalog ─────────────────────────────────────────────────────────

  const catalogContent = `export const catalog = [
  // Add catalog items here.
  // Each item needs: code, name, fullname, colors, type, default_color, sizes (or quantities), pricing
  // See common/catalogs/krause.js for examples.
];
`;

  // ── Update SITE_REGISTRY in functions.ts ─────────────────────────────────────

  const functionsPath = path.join(ROOT, "common", "src", "functions.ts");
  let functionsContent = fs.readFileSync(functionsPath, "utf8");

  const configImportLine = `// @ts-ignore\nimport { config as ${titleCase(urlKey)}Config } from "../configs/${urlKey}";\n`;

  // Insert config import after last config import block
  functionsContent = functionsContent.replace(
    /(\/\/ @ts-ignore\nimport \{ config as \w+Config \} from "\.\.\/configs\/\w+";\n)(?!\/\/ @ts-ignore\nimport \{ config)/,
    (match) => match + configImportLine
  );

  // Insert into SITE_REGISTRY before the closing ];
  const registryEntry = `  { urlKey: "${urlKey}",${" ".repeat(Math.max(1, 14 - urlKey.length))}config: ${titleCase(urlKey)}Config     },\n`;
  functionsContent = functionsContent.replace(
    /(\s*\{ urlKey: "\w+",\s+config: \w+Config\s*\},\n)(];)/,
    (_, lastEntry, closing) => lastEntry + registryEntry + closing
  );

  // ── Update getCatalog in catalogFunctions.ts ──────────────────────────────────

  const catalogFunctionsPath = path.join(ROOT, "common", "src", "catalogFunctions.ts");
  let catalogFunctionsContent = fs.readFileSync(catalogFunctionsPath, "utf8");

  const catalogImportLine = `// @ts-ignore\nimport { catalog as ${titleCase(urlKey)}Catalog } from "../catalogs/${urlKey}";\n`;

  // Insert catalog import after last catalog import
  catalogFunctionsContent = catalogFunctionsContent.replace(
    /(\/\/ @ts-ignore\nimport \{ catalog as \w+Catalog \} from "\.\.\/catalogs\/\w+";\n)(?!\/\/ @ts-ignore\nimport \{ catalog)/,
    (match) => match + catalogImportLine
  );

  // Insert case before closing brace of switch
  const caseEntry = `    case "${title}":    return ${titleCase(urlKey)}Catalog;\n`;
  catalogFunctionsContent = catalogFunctionsContent.replace(
    /(    case "\w+":.*return \w+Catalog;\n)(  \})/,
    (_, lastCase, closing) => lastCase + caseEntry + closing
  );

  // ── Write everything ──────────────────────────────────────────────────────────

  fs.writeFileSync(configPath, configContent);
  fs.writeFileSync(catalogPath, catalogContent);
  fs.writeFileSync(functionsPath, functionsContent);
  fs.writeFileSync(catalogFunctionsPath, catalogFunctionsContent);

  rl.close();

  console.log(`
✓ Created common/configs/${urlKey}.js
✓ Created common/catalogs/${urlKey}.js
✓ Added to SITE_REGISTRY in common/src/functions.ts
✓ Added to getCatalog in common/src/catalogFunctions.ts

Next steps:
  1. Add the company logo to client/public/images/${companyLogo}
  2. Populate the embroideries in common/configs/${urlKey}.js
  3. Add stores to common/configs/${urlKey}.js (if applicable)
  4. Add catalog items to common/catalogs/${urlKey}.js
  5. Build and deploy: push to main and the pipeline will handle the rest

Domain to deploy to: ${domain}
gpc81 path:          gpc81.com${routePrefix}
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
