import styles from "./Modification.module.scss";
import { getWebCatalog } from "guardian-common";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { getEmbroidery } from "../../lib/utils";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import { CartItem } from "../../lib/interfaces";
import EmbroiderySelector from "./EmbroiderySelector";
import { getWebConfigValue } from "guardian-common";

export async function loader({ params }) {
  return getWebCatalog().find((i) => i.code === params.id);
}

export default function Modification() {
  const item: any = useLoaderData();
  const [selected_color, set_selected_color] = useState(item.default_color);
  const [image_source, set_image_source] = useState(
    `/images/${item.code}_${selected_color
      .toLowerCase()
      .split(" ")
      .join("_")}.jpg`
  );
  const [cart, set_cart] = useOutletContext<any>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText] = useState("Item added to cart");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const sizes = Object.keys(item.sizes);
  const colors = item.colors;
  const [selected_size] = useState(sizes[0]);
  const [price] = useState(item.sizes[selected_size]);
  const [firstEmbroidery, setFirstEmbroidery] = useState("");
  const [secondEmbroidery, setSecondEmbroidery] = useState("");
  const logo_placements = getWebConfigValue("logo_placements")[item.type] || [];
  const embroideries = getEmbroidery(item.sub_category || item.type) || [];

  const [firstPlacement, setFirstPlacement] = useState(
    logo_placements[0] || "Left Chest"
  );

  const [secondPlacement, setSecondPlacement] = useState(
    logo_placements[0] || "Left Chest"
  );
  const [customsOrder, setCustomsOrder] = useState({});

  const handleFirstEmbroideryChange = (event) => {
    setFirstEmbroidery(event.target.value);
  };

  const handleSecondEmbroideryChange = (event) => {
    setSecondEmbroidery(event.target.value);
  };

  const handleFirstPlacementChange = (event) => {
    setFirstPlacement(event.target.value);
  };

  const handleSecondPlacementChange = (event) => {
    setSecondPlacement(event.target.value);
  };

  function handleSnackbarClose() {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  }

  function addItemToCart() {
    const new_cart = {
      ...cart,
    };

    // check if the keys of the sizes are numbers vs strings
    const shouldUseQuantityBasedOrdering = !isNaN(
      Number(Object.keys(item.sizes)[0])
    );

    // TODO: shouldnt this be broken out to a function?
    if (shouldUseQuantityBasedOrdering) {
      // check order not empty
      const noCustoms =
        Object.keys(customsOrder).length === 0
          ? true
          : Object.values(customsOrder).every(
              (arr: string[]) => arr.length === 0
            );

      if (noCustoms) {
        setErrorSnackbarOpen(true);
        setErrorSnackbarText("Must make a selection");
        return;
      }

      const items: { [key: string]: number } = {};

      Object.keys(customsOrder).forEach((k: string) => {
        // the keys of customsOrder are the quantity chosen and the color, like "1,Blue"
        const quantity = parseInt(k.split(",")[0]);
        // object representing quantity and color selected
        const orderInfo = customsOrder[k];

        /*
          if the user ordered 2x500 and 1x1000 then we need to add them together
        */
        if (items[orderInfo.color]) {
          items[orderInfo.color] += quantity * orderInfo.quantity;
        } else {
          items[orderInfo.color] = quantity * orderInfo.quantity;
        }
      });

      for (const [color, quantity] of Object.entries(items)) {
        addCustomsToCart(quantity, color, new_cart);
      }

      set_cart(new_cart);
      sessionStorage.setItem("cart", JSON.stringify(new_cart));
      setSnackbarOpen(true);
      setCustomsOrder({});
      return;
    }

    let any_input_has_value = false;
    let invalid_input = false;

    const hasEmbroideryOptions = embroideries.length > 0;
    const embroideryTypes = ["mens", "womens", "accessory"];
    const placementTypes = ["mens", "womens", "tshirts", "hat"];

    if (
      hasEmbroideryOptions &&
      embroideryTypes.includes(item.type) &&
      !firstEmbroidery
    ) {
      setErrorSnackbarOpen(true);
      setErrorSnackbarText("Must select an embroidery");
      return;
    }

    const table = document.getElementById("table") as any;
    // the first row is the table headers, skip it
    for (let i = 1; i < table.rows.length; i++) {
      const inputs = table.rows[i].getElementsByTagName("input");
      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].value) {
          any_input_has_value = true;
          const isNum = /^\d+$/.test(inputs[j].value);

          if (!isNum) {
            inputs[j].value = "";
            continue;
          }

          if (item.type === "accessory" && Number(inputs[j].value) < 12) {
            invalid_input = true;
            setErrorSnackbarOpen(true);
            setErrorSnackbarText("Must order at least 12 units");
            continue;
          }

          const cart_item: CartItem = {
            price: item.sizes[sizes[j]],
            quantity: Number(inputs[j].value),
            size: sizes[j],
            color: colors[i - 1],
            code: item.code,
            placement: placementTypes.includes(item.type)
              ? firstPlacement
              : null,
            embroidery: firstEmbroidery,
          };

          let key = `${item.code},${Object.keys(item.sizes)[j]},${
            colors[i - 1]
          },${firstEmbroidery}`;

          if (secondEmbroidery) {
            cart_item["secondEmbroidery"] = secondEmbroidery;
            cart_item["secondPlacement"] = secondPlacement;
            key += `,${secondEmbroidery}`;
          }

          if (new_cart[key]) {
            new_cart[key].quantity += cart_item.quantity;
          } else {
            new_cart[key] = cart_item;
          }
        }
        inputs[j].value = "";
      }
    }

    if (!any_input_has_value || invalid_input) {
    } else {
      setFirstEmbroidery("");
      setSecondEmbroidery("");
      set_cart(new_cart);
      sessionStorage.setItem("cart", JSON.stringify(new_cart));
      setSnackbarOpen(true);
    }
  }

  function addCustomsToCart(quantity, color, cart) {
    const key = `${item.code},${color}`;
    const cart_item = {
      type: item.type,
      name: item.fullname,
      price: getPriceWithDiscount(Number(quantity), 1),
      quantity: Number(quantity),
      size: "default",
      color: color,
      code: item.code,
      placement: null,
      embroidery: firstEmbroidery,
    };

    if (secondEmbroidery) {
      cart_item["secondEmbroidery"] = secondEmbroidery;
    }

    if (cart[key]) {
      cart[key].quantity += cart_item.quantity;
      cart[key].price = getPriceWithDiscount(cart[key].quantity, price);
    } else {
      cart[key] = cart_item;
    }
  }

  function getPriceWithDiscount(cartQuantity: number, fallbackPrice: number) {
    const sortedSizes = Object.keys(item.sizes).sort(
      (a, b) => Number(a) - Number(b)
    );

    let price = fallbackPrice;
    for (const size of sortedSizes) {
      if (cartQuantity >= Number(size)) {
        price = item.sizes[size];
      }
    }

    return price;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image__container}>
          <img src={image_source}></img>
        </div>
        <div className={styles.information__panel}>
          <div className={styles.name}>{item.fullname}</div>
          {item.type !== "customs" && (
            <div className={styles.price}>Starts at ${price} each</div>
          )}
          <ColorSelector
            item={item}
            set_selected_color={set_selected_color}
            selected_color={selected_color}
            set_image_source={set_image_source}
          />

          <EmbroiderySelector
            item={item}
            placements={logo_placements}
            embroideries={embroideries}
            firstEmbroidery={firstEmbroidery}
            secondEmbroidery={secondEmbroidery}
            firstPlacement={firstPlacement}
            secondPlacement={secondPlacement}
            handleFirstEmbroideryChange={handleFirstEmbroideryChange}
            handleSecondEmbroideryChange={handleSecondEmbroideryChange}
            handleFirstPlacementChange={handleFirstPlacementChange}
            handleSecondPlacementChange={handleSecondPlacementChange}
          />
          <QuantitySelector
            item={item}
            sizes={sizes}
            customsOrder={customsOrder}
            setCustomsOrder={setCustomsOrder}
          />

          <div
            className={styles.checkout__container}
            onClick={() => addItemToCart()}
          >
            <p>Add To Cart</p>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        message={snackbarText}
        onClose={handleSnackbarClose}
      />
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">{errorSnackbarText}</Alert>
      </Snackbar>
    </div>
  );
}
