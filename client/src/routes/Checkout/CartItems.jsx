import DeleteIcon from "@mui/icons-material/Delete";
import { useOutletContext } from "react-router-dom";
import { ColorOption, SizeOption } from "../../lib/constants";
import { CartService } from "../../services/cartService";
import { getCatalogItem } from "../../lib/utils";

export default function CartItems() {
  const [cart, set_cart] = useOutletContext();
  return (
    <div className="flex flex-col gap-3 w-[340px] max-h-[400px] overflow-auto border-2 border-gray-400 border-solid rounded-md">
      <div className="border-b-2 border-gray-400 border-solid p-1">
        <p className="text-lg font-bold">Cart</p>
      </div>
      {Object.keys(cart).map((k) => {
        const item = cart[k];
        const isDefaultSize = item.size === SizeOption.DEFAULT;
        const catalogItem = getCatalogItem(item.code);
        const shouldShowColor = catalogItem && !catalogItem.disableColorSelector;

        // Look up the color value for the sapVariation code
        const sapVariationDisplay = item.sapVariation && catalogItem?.sapVariations
          ? catalogItem.sapVariations.find((v) => v.code === item.sapVariation)?.color || item.sapVariation
          : item.sapVariation;

        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        // Usage
        const priceDisplay = formatter.format(item.price);
        return (
          <div className="relative flex p-1">
            <div className="relative top-1 cursor-pointer">
              <DeleteIcon
                style={{ color: "#C70000" }}
                onClick={() => {
                  CartService.removeItem(cart, set_cart, k);
                }}
              />
            </div>

            <div className="flex flex-col p-1 text-sm">
              <p>
                <b>{item.name}</b>
              </p>
              <p>
                <b>Price: </b>
                {priceDisplay} each
              </p>
              {shouldShowColor && !(item.color === ColorOption.DEFAULT) && (
                <p>
                  <b>Color:</b> {item.color}
                </p>
              )}
              {item.sapVariation && (
                <p>
                  <b>{catalogItem?.variationTextOverride || "Type:"}</b> {sapVariationDisplay}
                </p>
              )}
              {item.embroidery && (
                <>
                  {item.secondEmbroidery && (
                    <p>
                      <b>Embroidery:</b> {item.embroidery} /{" "}
                      {item.secondEmbroidery}
                    </p>
                  )}
                  {!item.secondEmbroidery && (
                    <p>
                      <b>Embroidery:</b> {item.embroidery}
                    </p>
                  )}
                </>
              )}
              {item.placement && (
                <p>
                  <b>Placement:</b>{" "}
                  {item.secondPlacement
                    ? `${item.placement} / ${item.secondPlacement}`
                    : `${item.placement}`}
                </p>
              )}
              {!isDefaultSize && (
                <p>
                  <b>Size:</b> {item.size}
                </p>
              )}
              <p>
                <b>Quantity:</b> {item.quantity}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
