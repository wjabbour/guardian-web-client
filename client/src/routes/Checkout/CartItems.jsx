import DeleteIcon from "@mui/icons-material/Delete";
import { useOutletContext } from "react-router-dom";
import { ColorOption, SizeOption } from "../../lib/constants";

export default function CartItems() {
  const [cart, set_cart] = useOutletContext();
  return (
    <div className="absolute flex flex-col gap-3 right-0 w-[340px] h-[400px] overflow-auto border-2 border-gray-400 border-solid">
      <div className="border-b-2 border-gray-400 border-solid p-1">
        <p className="text-lg font-bold">Cart</p>
      </div>
      {Object.keys(cart).map((k) => {
        const item = cart[k];
        const isDefaultSize = item.size === SizeOption.DEFAULT;

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
                  delete cart[k];
                  sessionStorage.setItem("cart", JSON.stringify(cart));
                  set_cart({ ...cart });
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
              {!(item.color === ColorOption.DEFAULT) && (
                <p>
                  <b>Color:</b> {item.color}
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
