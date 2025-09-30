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

Determines the values for the `Logo Placement` dropdown on item pages.

### show_image_preview

When a logo is selected from the `Logo` dropdown, if `show_image_preview` is `true` then the chosen logo will be rendered on the item page.

### embroideries

Determines the values for the `Logo` dropdown on item pages per item category.

**e.g.**

```
hat: [
  "Cadillac"
],
mens: [
  "Hennessy Ford",
],
```

If a user were to view an item page for any item with `type` or `sub_category` equal to `hat` then the `Logo` select would have only one option: `Cadillac`. If a user were to view an item page for any item with `type` equal to `mens` then the `Logo` select would have only one option: `Hennessy Ford`. 

**Note:** `sub_category` takes precedence over `type`. Therefore, if an item has a `type` of `mens` and a `sub_category` of `tshirt`, then the application will first attempt to set the Logo dropdown options to the values contained in the `tshirt` array, falling back to `mens` if none exists for that item.

**Note:** These must correspond to a file in `{project_root}/client/public/images` - `cadillac.jpg` and `hennessy_ford.jpg`.

### email_recipients

Determines which email addresses will receive an order email once an order is successfully placed and paid for. **Note:** The email associated with the order will always receive an order email, even if they're not in this array.

### enable_customs_store_picker

If true, when a user navigates to the customs catalog, they will be presented with a list of stores to choose from. They must enter the password associated with the store. This is used when different stores have different sets of customs items.

### stores

Each store option looks like this:

```
{
  code: "ABC123",
  name: "Test Store",
  address: "123 Highway",
  password: "secret"
}
```

Each entry in the `stores` array creates an option on the `Store` dropdown on the checkout page. The name of the option is the concatenation of the store `name` + the store `address`. The `code` should be globally unique amongst all stores. `password` is optional, but if supplied will cause a password modal to pop up when a user tries to navigate to a store from the customs catalog.

### bypass_codes

Determines the possible codes that a user can enter into the `Code` text input on the checkout page. If the text that the user enters matches one of the codes (both the user's input and all of the codes are lowercased when performing the comparison so casing is not important) then:

1. if PayPal is enabled for the site, the PayPal checkout requirement will be bypassed and a checkout button will appear allowing the user to place the order.
2. if PayPal is not enabled for the site, the disabled checkout button will become enabled allowing the user to place the order.

### server_hostname

Determines which server the client will make API calls to. This value should always be `https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com` except for Cannon.

### account_reps

Determines the account rep information displayed on the client's footer.

### route_prefix

**Note:** One of the required properties to make the website accessible from gpc81.

Enables navigation for gpc81 sites.

`route_prefix` is a string prefixed with a forward slash. For example, `/test`, `/cannon`, `/my-new-site`. Two configs must not share the same value for `route_prefix`.

### password

**Note:** One of the required properties to make the website accessible from gpc81.

Enables navigation for gpc81 sites.

`route_prefix` is a string prefixed with a forward slash. For example, `/test`, `/cannon`, `/my-new-site`. Two configs must not share the same value for `route_prefix`.

### paypal_not_supported

Determines whether the PayPal checkout flow should be displayed on the checkout page.

## gpc81

Before April 2025, all websites were deployed to separate domains. But going forward, we would like to use gpc81.com as the base domain and have all other sites be accessible from this domain via path parameters.

e.g.

```
gpc81.com -> main landing page
gpc81.com/hennessy -> hennessy landing page
gpc81.com/stivers -> stivers landing page
```

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
