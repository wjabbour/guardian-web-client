# Catalogs

A catalog is an array of items that will appear in the website. An item looks like this:

```
  {
    code: "J317",
    name: "Port Authority® Jacket",
    fullname: "Port Authority® Core Soft Shell Jacket",
    colors: ["Black"],
    type: "mens",
    sub_category: "tshirt",
    default_color: "Black",
    description: "Here is a description about the product",
    sizes: {
      Small: 37.99,
      Medium: 37.99,
      Large: 37.99,
      XLarge: 37.99,
      "2XLarge": 38.99,
      "3XLarge": 39.99,
      "4XLarge": 40.99,
      "5XLarge": 41.99,
      "6XLarge": 42.99,
    },
  },
```

- `code`: this should be a unique value in the catalog - no other item should have this same code.
- `name`: a short name of the item, should be two to three small words
- `fullname`: a potentially longer name for the item, can be a few words long
- `colors`: optional, governs the color preview options displayed on the modification page. If this property is not supplied then no color selector will be displayed.
- `type`: the category of the item - mens, womens, accessory, customs, service, office. Used to determine which embroideries/logos are available on the modification page
- `sub_category`: the sub-category of an item. Used to determine which embroideries/logos are available on the modification page
- `default_color`: optional, this will determine which picture is shown when initially viewing the item on the modification page (`/item/${code}`), e.g. if `default_color` is red, then the picture that will be shown is `${code}_red.jpg`. If this property is not supplied then the initial picture shown will be `${code}.jpg`. For items with no `colors` this property will determine the value of the `color` property on the order information. If omitted, this value will be set to `Default`.
- `description`: this will determine the text in the product description component on the modification page. If this property
  is not defined for an item then the application will not render the product description component. If the text is long enough
  a "Read More" button will be rendered below the text preview. If you want more control over the layout of the description you can use backticks to define the string.

<b>e.g.</b>

```
description: `
This description will properly display new lines and spaces

Like this one here

Or this one here
`
```

- `sizes`: a map of size/quantity to price.
- `halfColors`: currently only used for hats. A subset of the options from `colors` which should have their color preview set as a half-colored box. Each option in `halfColors` must be a string containing only two colors and the colors must exist in `{project_root}/client/src/routes/Modification/colors.css` file as discussed below in the section on adding new colors.

e.g.

```
{
  colors: ['White', 'Black', 'Blue White'],
  halfColors: ['Blue White'] // {item.code}_blue_white.jpg must exist, .Blue and .White must exist in colors.css
}

...
{
  halfColors: ['Green Navy Red'] // fails, MUST CONTAIN ONLY TWO COLORS
}
```

Let's take a quick look at a customs item which looks slightly different:

```
  {
    code: "3088",
    name: "Floor Mats",
    fullname: "Floor Mats/Coated Paper (500/bx)",
    colors: ["White"],
    type: "service",
    default_color: "White",
    sizes: {
      10: 0.75,
      20: 0.60
    },
  },
```

With the above configuration, the user would see two options: 10 & 20. This indicates the user would be choosing to purchase either a quantity of 10 or a quantity of 20. If they were to purchase a quantity of 10, the price would be 0.75 each for a total of 7.50. At checkout, the application will apply the best available price based on the quantity. For example, if the user were to order a quantity of 10 two separate times (and thus their cart would have a total quantity of 20) then the application will set the price as being 0.60 each.

### Adding new items

If this is the first time this item has been added to a catalog, you will need to add its pictures. You will need one picture of the item in each color that it is available and you will need one picture of the item in its default color.

For example, if you have item `A` that is available in colors `['Blue', 'Black', 'Green']` then the following files should be in the `{project_root}/client/public/images` folder.

```
A_blue.jpg
A_black.jpg
A_green.jpg
A.jpg
```

### Adding new colors

If this is the first time you are using a specific color for an item, that item color will need to be added to `{project_root}/client/src/routes/Modification/Modification.module.scss`. Without this, the color box on the modification page will be white.

For example, if you have item `A` which is available in colors `['Lime Green']` then you will need the following lines in `modification.module.scss`

```
.Lime_Green {
  background-color: {your_hex_code};
}
```

`your_hex_code` always begins with the `#` character and ends with 6 alphanumeric characters. It is up to you to decide the hex code. VSCode has a nice hexcode picker. If that doesn't work for you, you can go online and find a hexcode->color converter and copy the hex code that most closely matches the color to the `Modification.module.scss` file.
