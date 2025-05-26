import styles from "./Modification.module.scss";
import { Catalog } from "../../lib/catalog";
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { getDomainAwarePath, getEmbroidery } from "../../lib/utils";
import { getWebConfigValue } from "guardian-common";
import Thumbnail from "./Thumbnail";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import { CartItem } from "../../lib/interfaces";

export async function loader({ params }) {
  return Catalog().find((i) => i.code === params.id);
}

export default function Modification() {
  const item: any = useLoaderData();
  const navigate = useNavigate();
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
  const [selected_customs_white_quantity, set_selected_customs_white_quantity] =
    useState(null);
  const [selected_customs_black_quantity, set_selected_customs_black_quantity] =
    useState(null);
  const [price] = useState(item.sizes[selected_size]);
  const [embroidery, setEmbroidery] = useState("");
  const [placement, setPlacement] = useState("Left Chest");
  const logo_placements = getWebConfigValue("logo_placements") as string[];
  const [customsOrder, setCustomsOrder] = useState({});

  const handleChange = (event) => {
    setEmbroidery(event.target.value);
  };

  const handlePlacementChange = (event) => {
    setPlacement(event.target.value);
  };

  const embroideries = getEmbroidery(item.type).map((e) => {
    return <MenuItem value={e}>{e}</MenuItem>;
  });

  const embroiderySelector = () => {
    if (item.type === "customs" || embroideries.length === 0) {
      return <></>;
    }

    return (
      <div className={styles.selector}>
        <FormControl fullWidth>
          <InputLabel>Logo</InputLabel>
          <Select value={embroidery} label="embroidery" onChange={handleChange}>
            {embroideries}
          </Select>
        </FormControl>
      </div>
    );
  };

  const placementSelector = () => {
    const hasCorrectType = ["womens", "mens"].includes(item.type);
    const hasPlacementOptions = logo_placements.length > 0;

    if (hasCorrectType && hasPlacementOptions) {
      const placements = logo_placements.map((l) => {
        return <MenuItem value={l}>{l}</MenuItem>;
      });

      return (
        <div className={styles.selector}>
          <FormControl fullWidth>
            <InputLabel>Logo Placement</InputLabel>
            <Select
              value={placement}
              label="placement"
              onChange={handlePlacementChange}
            >
              {placements}
            </Select>
          </FormControl>
        </div>
      );
    } else {
      return <></>;
    }
  };

  function handleSnackbarClose() {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  }

  function addItemToCart() {
    const new_cart = {
      ...cart,
    };

    if (item.type === "customs") {
      // check customs order not empty

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
        // the keys of customsOrder are the different available quantities
        const quantity = parseInt(k);
        const colors = customsOrder[k];

        colors.forEach((color) => {
          items[color] = items[color] ? items[color] + quantity : quantity;
        });
      });

      for (const [key, value] of Object.entries(items)) {
        addCustomsToCart(value, key, new_cart);
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

    if (
      hasEmbroideryOptions &&
      embroideryTypes.includes(item.type) &&
      !embroidery
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
            price: item.sizes[sizes[i - 1]],
            quantity: Number(inputs[j].value),
            size: sizes[i - 1],
            color: colors[j],
            code: item.code,
            placement: item.type === "accessory" ? "N/A" : placement,
            embroidery,
          };

          const key = `${item.code},${Object.keys(item.sizes)[i - 1]},${
            colors[j]
          },${embroidery}`;

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
      setEmbroidery("");
      set_selected_customs_black_quantity(null);
      set_selected_customs_white_quantity(null);
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
      price: item.sizes[quantity],
      quantity: Number(quantity),
      size: "default",
      color: color,
      code: item.code,
      placement: null,
      embroidery,
    };

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
      <div
        className={styles.back__button}
        onClick={() => {
          navigate(getDomainAwarePath("/"));
        }}
      >
        <SvgIcon fontSize="inherit">
          <ArrowBackIcon />
        </SvgIcon>
      </div>
      <div className={styles.card}>
        <div className={styles.image__container}>
          <img src={image_source}></img>
        </div>
        <div className={styles.information__panel}>
          <div className={styles.name}>{item.fullname}</div>
          {item.type !== "customs" && (
            <div className={styles.price}>Starts at ${price} each</div>
          )}
          <div className={styles.color__selector}>
            <ColorSelector
              item={item}
              set_selected_color={set_selected_color}
              selected_color={selected_color}
              set_image_source={set_image_source}
            />
          </div>
          <div className={`${styles.flex} ${styles.md_margin_bottom}`}>
            <div>
              {embroiderySelector()}
              {placementSelector()}
            </div>
            <div>
              <Thumbnail img={embroidery} />
            </div>
          </div>

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
