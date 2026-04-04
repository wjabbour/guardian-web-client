import { getWebCatalog, CatalogItem, Cart } from "guardian-common";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getEmbroidery } from "../../lib/utils";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import EmbroiderySelector from "./EmbroiderySelector";
import { getWebConfigValue } from "guardian-common";
import Description from "./Description";
import {
  createCartItem,
  verifyEmbroidery,
  verifyPlacement,
  verifyQuantity,
} from "./utils";
import { PlacementOption } from "../../lib/constants";
import { CartService } from "../../services/cartService";

type UserSelection = {
  [key: string]: number;
};

export async function loader({ params }: { params: { id?: string } }) {
  return getWebCatalog().find((i) => i.code === params.id);
}

export default function Modification() {
  const item = useLoaderData() as CatalogItem;
  const [selected_color, set_selected_color] = useState(
    item.default_color || ""
  );

  // Handle sapVariations: initialize with first variation if available
  // This is for IMAGE PREVIEW only (used by ColorSelector)
  const initialSapVariation = item.sapVariations && item.sapVariations.length > 0
    ? item.sapVariations[0].code
    : null;
  const [selected_sapVariation, set_selected_sapVariation] = useState(
    initialSapVariation
  );

  // Initialize image source based on sapVariations or colors
  const initialImageSource = item.sapVariations && item.sapVariations.length > 0
    ? `/images/${item.code}_${item.sapVariations[0].color
      .toLowerCase()
      .split(" ")
      .join("_")}.jpg`
    : item.colors
      ? `/images/${item.code}_${selected_color
        .toLowerCase()
        .split(" ")
        .join("_")}.jpg`
      : `/images/${item.code}.jpg`;

  const [image_source, set_image_source_raw] = useState(initialImageSource);
  const set_image_source = (src: string) => {
    setIsSwitching(true);
    set_image_source_raw(src);
  };
  const [cart, set_cart] = useOutletContext<[Cart, React.Dispatch<React.SetStateAction<Cart>>]>();

  // Update image source when selected_sapVariation changes (e.g., from ColorSelector)
  useEffect(() => {
    if (item.sapVariations && item.sapVariations.length > 0 && selected_sapVariation) {
      const variation = item.sapVariations.find((v: { code: string }) => v.code === selected_sapVariation);
      if (variation) {
        set_image_source(
          `/images/${item.code}_${variation.color
            .toLowerCase()
            .split(" ")
            .join("_")}.jpg`
        );
      }
    }
  }, [selected_sapVariation, item.sapVariations, item.code]);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText] = useState("Item added to cart");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const sizes = Object.keys(item.pricing);
  const smallestSize = sizes.sort((a, b) => Number(a) - Number(b))[0];
  const startsAtPrice = item.pricing[smallestSize].price;

  const [firstEmbroidery, setFirstEmbroidery] = useState("");
  const [secondEmbroidery, setSecondEmbroidery] = useState<string | null>(null);
  const logo_placements = getWebConfigValue("logo_placements")[item.type] || [];
  const embroideries = getEmbroidery(item.sub_category || item.type) || [];
  const [reset, setReset] = useState(Date.now());

  const description = item.description || "";
  /*
      if an item type has no placements, then we set as default, but really this is just a special
      value that we will use to process the item differently, we prob want N/A to end up on the order data
    */
  const [firstPlacement, setFirstPlacement] = useState(
    logo_placements[0] || PlacementOption.DEFAULT
  );

  const [secondPlacement, setSecondPlacement] = useState(
    logo_placements[0] || PlacementOption.DEFAULT
  );

  const [userSelection, setUserSelection] = useState<UserSelection>({});

  const handleFirstEmbroideryChange = (embroidery: string) => {
    setFirstEmbroidery(embroidery);
  };

  const handleSecondEmbroideryChange = (embroidery: string | null) => {
    setSecondEmbroidery(embroidery);
  };

  const handleFirstPlacementChange = (placement: string) => {
    setFirstPlacement(placement);
  };

  const handleSecondPlacementChange = (placement: string) => {
    setSecondPlacement(placement);
  };

  function handleSnackbarClose() {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  }

  function addItemToCart() {
    const embroideryErrMessage = verifyEmbroidery(
      item,
      embroideries,
      firstEmbroidery,
      secondEmbroidery
    );
    if (embroideryErrMessage) {
      setErrorSnackbarText(embroideryErrMessage);
      setErrorSnackbarOpen(true);
      return;
    }

    if (!verifyQuantity(userSelection)) {
      setErrorSnackbarText("Must select a quantity");
      setErrorSnackbarOpen(true);
      return;
    }

    const placementErrMessage = verifyPlacement(
      firstPlacement,
      secondPlacement,
      secondEmbroidery
    );
    if (placementErrMessage) {
      setErrorSnackbarText(placementErrMessage);
      setErrorSnackbarOpen(true);
      return;
    }

    const new_cart = CartService.cloneCart(cart);

    // key is size + color (or size + color + sapVariation), value is object containing quantity
    for (const [key, quantity] of Object.entries(userSelection)) {
      // Parse the key to get the color
      const selection = key.split(",");
      const selectedColor = selection[1];

      // Find the sapVariation code for this color if sapVariations exist
      let sapVarForCart: string | null = null;
      if (item.sapVariations && item.sapVariations.length > 0) {
        const variation = item.sapVariations.find((v: { color: string }) => v.color === selectedColor);
        if (variation) {
          sapVarForCart = variation.code;
        }
      }

      createCartItem(
        item,
        quantity,
        key,
        new_cart,
        firstEmbroidery,
        secondEmbroidery,
        firstPlacement,
        secondPlacement,
        sapVarForCart
      );
    }

    // Update cart using service (handles both state and sessionStorage)
    CartService.updateCart(new_cart, set_cart);

    setSnackbarOpen(true);
    setUserSelection({});
    // reset quantities in UI
    setReset(Date.now());
    return;
  }

  return (
    <div className="flex justify-center">
      <div className="flex gap-[50px] bg-white p-[25px] min-w-[1000px] border border-gray-400">
        <div className="relative flex items-center justify-center max-h-[520px] min-w-[400px] max-w-[450px]">
          {isInitialLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-300 rounded-sm z-10" />
          )}
          <img
            className={`max-h-full max-w-[450px] aspect-auto transition-opacity duration-300 ease-in-out ${isInitialLoading ? "opacity-0" : isSwitching ? "opacity-40" : "opacity-100"}`}
            src={image_source}
            alt={item.fullname}
            onLoad={() => { setIsInitialLoading(false); setIsSwitching(false); }}
          />
        </div>

        <div className="relative top-[50px] pb-[35px] flex flex-col flex-1">
          <div className="text-2xl font-bold">{item.fullname}</div>

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
            />{" "}
            <ColorSelector
              item={item}
              set_selected_color={set_selected_color}
              selected_color={selected_color}
              set_image_source={set_image_source}

              selected_sapVariation={selected_sapVariation}
              set_selected_sapVariation={set_selected_sapVariation}
            />
          </div>

          <QuantitySelector
            item={item}
            setUserSelection={setUserSelection}
            reset={reset}
            selected_sapVariation={selected_sapVariation}
            set_selected_sapVariation={set_selected_sapVariation}
            set_image_source={set_image_source}
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
