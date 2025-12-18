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
        const isDefaultColor = item.color === ColorOption.DEFAULT;
        const isDefaultSize = item.size === SizeOption.DEFAULT;

        const imagePath = isDefaultColor
          ? `/images/${item.code}.jpg`
          : `/images/${item.code}_${item.color
              .split(" ")
              .join("_")
              .toLowerCase()}.jpg`;
        console.log(item, imagePath);
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

            <div className="flex flex-col w-[200px] p-1 text-sm">
              <p>
                <b>{item.price} each</b>
              </p>
              {!isDefaultColor && (
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
            <div className="h-[140px]">
              <img className="h-[120px]" src={imagePath}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
}
