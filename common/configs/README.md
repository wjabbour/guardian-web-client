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

## Config Options

All configs support exactly the same set of configuration options, e.g. stores, embroideries, etc. The sites functionality and UI changes depending on the values you set for each option. This section details what each config value does.

### title

`title` has two jobs; one is very important and one is not very important. The unimportant job is that it sets the text in the browser tab. The important job is that it allows the backend and client to use the correct config. Therefore, it's very important that `title` is unique amongst all of the configs - no two configs should have the same value for `title`.

### company_logo

Determines which picture will be rendered in the top navigation bar. The value for `company_logo` should correspond to a file in `{project_root}/client/public/images`.

### logo_placements

Determines the values for the `Logo` dropdown on item pages.

### show_image_preview

When a logo is selected from the `Logo` dropdown, if `show_image_preview` is `true` then the chosen logo will be rendered on the item page.

## gpc81

Before April 2025, all websites were deployed to separate domains. But going forward, we would like to use gpc81.com as the base domain and have all other sites be accessible from this domain via path parameters.

e.g.

```
gpc81.com -> main landing page
gpc81.com/hennessy -> hennessy landing page
gpc81.com/stivers -> stivers landing page
```

To make your website accessible from gpc81, you will need to set two properties on that website's config in `{project_root}/client/src/configs`.

1. `route_prefix` - this should be a string, prefixed with a forward slash. For example, `/test`, `/cannon`, `/my-new-site`. Two configs must not share the same value for `route_prefix`.
2. `password` - this is the password that the user must enter on gpc81 to be navigated to this website. Two configs must not share the same value for `password`.

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
