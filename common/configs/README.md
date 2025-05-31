# Configs

If you're deploying a new site, you will need to do a few things:

1. Add a config file to `{project_root}/common/configs`. The name of the config file needs to be unique and should be based on the domain name the site will be deployed to, but does not need to match exactly.

   **e.g.** If you're deploying a site to `gp-honda.com` then you might choose to name the config file `honda.js` or `gp-honda.js`.

2. Import the new config into `{project_root}/common/index.js`

   **e.g.** `import { config as HondaConfig } from "../configs/honda";`

3. Add a new case statement to the switch in the `getConfigValue` function in `{project_root}/common/index.js`.

   **e.g.**

   ```
   case "Honda" {
     return HondaConfig[val];
   }
   ```

4. Add an `if else` statement in the `getWebConfigValue` function in `{project_root}/common/index.js`.

   **e.g.**

    ```
    else if (url.includes("gp-honda.com")) {
      return HondaConfig[val];
    }
    ```
5. Update the `allConfigs` array in `{project_root}/common/index.js`.

### stores

### Client

```
e.g.

stores: ["Pohanka Hyundai , 2015 N Salisbury, Salisbury, MD 21801"],
```

The list of stores populates the options of the select box on the checkout screen. This allows the user to choose which address the order should be shipped to.

### Backend

The backend configuration for stores is implemented differently. There is a single constant named `STORES` in this file: `backend\src\public\utils.ts`. The key (the string on the left side of each colon) of this map is the store address and the value (the string on the right side of each colon) is the store code. Based on which store address the user chooses during checkout, the corresponding store code will be associated with the order and inserted into the order data.

For example,

```
const STORES = {
  "100 A Street": "123",
  "200 B Lane": "456"
}
```

If the user were to select "100 A Street" as the store address, then the server will determine that the store code for this order should be "123".

You must always ensure that the store strings in the client configs and in the `STORES` constant match exactly, else the user may not be able to select some stores.

For example, using the same `STORES` as the above example, if the site administrator had accidentally configured the client's store address to be "100, A Street" then an error will occur, because the backend doesn't have such an address in `STORES`.

### Updating Embroideries

In the config file, you will find a property named `embroideries`. Let's talk about what these values mean. Consider the following `embroideries` object.

```
embroideries: {
  hat: ['Stivers'],
  mens: ['Quicklane'],
  womens: ['Subaru'],
  accessory: ['Ford', 'Hyundai']
}
```

These values are used to determine two things:

1. The available options in the `Logo` dropdown on the item modification page.
2. The logos displayed on the catalog page when the user selects a specific group of item (accessories, mens, womens).

With the values above, if a user were to click on "Men's Apparel" then the catalog page would display the Quicklane logo picture. If a user were then to choose an apparel from the catalog screen and thus be directed to the modification page, when they click the `Logo` dropdown they would only see Quicklane as an option. The same logic follows for womens, accessory, and hat.

### Updating other config values

The other config values are updated in the same way.

## gpc81

Before April 2025, all websites were deployed to separate domains. But going forward, we would like to use gpc81.com as the base domain and have all other sites be accessible from this domain via path parameters.

e.g.

```
gpc81.com -> main landing page
gpc81.com/hennessy -> hennessy landing page
gpc81.com/stivers -> stivers landing page
```

To make your website accessible from gpc81, you will need to set two properties on that websites config in `{project_root}/client/src/configs`.

1. `route_prefix` - this should be a string, prefixed with a forward slash. For example, `/test`, `/cannon`, `/my-new-site`. Two configs must not share the same value for `route_prefix`.
2. `password` - this is the password that the user must enter on gpc81 to be navigated to this website. Two configs must not share the same value for `password`.

## Configure the backend

### Updating CORS

In `{project_root}/backend/src/utils.ts` there is an array named `ALLOWED_ORIGINS`. add the full URL of the new site to this array. e.g. `https://{your_url}`

## Local Development

When running locally, you may want to switch between gpc81 and non-gpc81, depending on which website you'd like to test (e.g. if a website is only used by customers by going to gpc81.com (Hennessy) you'll want to use the gpc81 way, if the website is only used by customers by navigating to that domain directly (Cannon) you'll want to use the non-gpc81 way)

gpc81 way:

`client\src\hooks\useNextGenRouting.js`

```
export function useNextGenRouting() {
  return (
    window.location.href.includes("gpc81") ||
    window.location.href.includes("localhost")
  );
}
```

`client\src\lib\utils.ts`

```
export function getDomainAwarePath(destination) {
  const prefix = getConfigValue("route_prefix");
  const url = window.location.href;
  const shouldPrefixRoute = url.includes("gpc81") || url.includes("localhost");

  return shouldPrefixRoute ? prefix + destination : destination;
}
```

non-gpc81 way:

`client\src\hooks\useNextGenRouting.js`

```
export function useNextGenRouting() {
  return (
    window.location.href.includes("gpc81")
  );
}
```

`client\src\lib\utils.ts`

```
export function getDomainAwarePath(destination) {
  const prefix = getConfigValue("route_prefix");
  const url = window.location.href;
  const shouldPrefixRoute = url.includes("gpc81");

  return shouldPrefixRoute ? prefix + destination : destination;
}
```

You may need to refresh your browser and navigate to localhost:3000 for the changes to fully take effect.
