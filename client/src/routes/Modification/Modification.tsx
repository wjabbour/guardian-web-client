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
import { createCartItem } from "./utils";
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

    // ensure that the user actually ordered something
    console.log(userSelection, 'userSelection')
    // key is size + color, value is object containing quantity
    for (const [key, quantity] of Object.entries(userSelection)) {
      createCartItem(
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

    setSnackbarOpen(true);
    setUserSelection({});
    return;
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
            setUserSelection={setUserSelection}
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
