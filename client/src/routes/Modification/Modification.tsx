import styles from "./Modification.module.scss";
import { getWebCatalog } from "guardian-common";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getEmbroidery } from "../../lib/utils";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import { CartItem } from "../../lib/interfaces";
import EmbroiderySelector from "./EmbroiderySelector";
import { getWebConfigValue } from "guardian-common";
import Description from "./Description";
import { addCustomsToCart } from "./utils";
import { ColorOption } from "../../lib/constants";

type UserSelection = {
  [key: string]: {
    quantity: number;
  };
};

export async function loader({ params }) {
  return getWebCatalog().find((i) => i.code === params.id);
}

export default function Modification() {
  const item: any = useLoaderData();
  const [selected_color, set_selected_color] = useState(
    item.default_color || ""
  );

  const [image_source, set_image_source] = useState(
    item.colors
      ? `/images/${item.code}_${selected_color
          .toLowerCase()
          .split(" ")
          .join("_")}.jpg`
      : `/images/${item.code}.jpg`
  );
  const [cart, set_cart] = useOutletContext<any>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText] = useState("Item added to cart");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const sizes = [];
  const colors = item.colors;
  /*
    this value is used for two things

    1) for displaying some text in the price overview: "starts at $x"
    2) discount calculation
  */
  const lowestPricedItemVariation = Math.min(
    ...Object.values(item.pricing).map((i: any) => i.price)
  );

  const [firstEmbroidery, setFirstEmbroidery] = useState("");
  const [secondEmbroidery, setSecondEmbroidery] = useState("");
  const logo_placements = getWebConfigValue("logo_placements")[item.type] || [];
  const embroideries = getEmbroidery(item.sub_category || item.type) || [];
  // lets adapt this to work for both grids and singular input, the quantity selector should just write to this object and we apply embroideries
  const [selectedQuantity, setSelectedQuantity] = useState({
    base: Math.min(...item.quantities),
  });

  const description = item.description || "";

  const [firstPlacement, setFirstPlacement] = useState(
    logo_placements[0] || "Left Chest"
  );

  const [secondPlacement, setSecondPlacement] = useState(
    logo_placements[0] || "Left Chest"
  );

  const [userSelection, setUserSelection] = useState<UserSelection>({});

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
    const new_cart = structuredClone(cart);

    if (Object.values(selectedQuantity).every((qty) => !qty)) {
      setErrorSnackbarOpen(true);
      setErrorSnackbarText("Must make a selection");
      return;
    }

    // key is size + color, value is object containing quantity
    for (const [key, quantity] of Object.entries(userSelection)) {
      addCustomsToCart(
        item,
        quantity,
        key,
        new_cart,
        firstEmbroidery,
        secondEmbroidery,
        lowestPricedItemVariation
      );

      set_cart(new_cart);
      sessionStorage.setItem("cart", JSON.stringify(new_cart));
    }

    // TODO: shouldnt this be broken out to a function?
    // if (shouldUseCustomQuantityBasedOrdering) {
    //   const items: { [key: string]: number } = {};

    //   Object.keys(customsOrder).forEach((k: string) => {
    //     // the keys of customsOrder are the quantity chosen and the color, like "1,Blue"
    //     const quantity = parseInt(k.split(",")[0]);
    //     // object representing quantity and color selected
    //     const orderInfo = customsOrder[k];

    //     /*
    //       if the user ordered 2x500 and 1x1000 then we need to add them together
    //     */
    //     if (items[orderInfo.color]) {
    //       items[orderInfo.color] += quantity * orderInfo.quantity;
    //     } else {
    //       items[orderInfo.color] = quantity * orderInfo.quantity;
    //     }
    //   });

    //   for (const [color, quantity] of Object.entries(items)) {
    //     addCustomsToCart(
    //       item,
    //       quantity,
    //       color,
    //       new_cart,
    //       firstEmbroidery,
    //       secondEmbroidery,
    //       lowestPricedItemVariation
    //     );
    //   }

    //   set_cart(new_cart);
    //   sessionStorage.setItem("cart", JSON.stringify(new_cart));
    setSnackbarOpen(true);
    setUserSelection({});
    return;
    // }

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
            color: colors
              ? colors[i - 1]
              : item.default_color || ColorOption.DEFAULT,
            code: item.code,
            placement: placementTypes.includes(item.type)
              ? firstPlacement
              : null,
            embroidery: firstEmbroidery,
          };

          let key = `${item.code},${Object.keys(item.sizes)[j]},${
            colors ? colors[i - 1] : item.default_color || ColorOption.DEFAULT
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

  return (
    <div className="flex justify-center">
      <div className="flex gap-[50px] bg-white p-[25px] min-w-[1000px] border border-gray-400">
        <div className={styles.image__container}>
          <img src={image_source} alt={item.fullname} />
        </div>

        <div className={`${styles.information__panel} flex flex-col flex-1`}>
          <div className={styles.name}>{item.fullname}</div>
          {item.type !== "customs" && (
            <div className="font-bold text-[16px] mb-[20px]">
              Starts at ${lowestPricedItemVariation} each
            </div>
          )}
          <Description description={description} />

          <div className="mt-[10px] flex gap-[50px]">
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
            <ColorSelector
              item={item}
              set_selected_color={set_selected_color}
              selected_color={selected_color}
              set_image_source={set_image_source}
            />
          </div>

          <QuantitySelector
            item={item}
            userSelection={userSelection}
            setUserSelection={setUserSelection}
            setSelectedQuantity={setSelectedQuantity}
            selectedQuantity={selectedQuantity}
          />

          <div className="mt-auto pt-[20px] flex justify-end">
            <div
              className="flex items-center justify-center bg-[#f3c313] w-[135px] h-[35px] rounded-[15px] cursor-pointer hover:brightness-95 transition-all"
              onClick={() => addItemToCart()}
            >
              <p className="text-[16px] font-medium">Add to Cart</p>
            </div>
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
