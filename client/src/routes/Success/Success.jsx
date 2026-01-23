import { useLocation } from "react-router-dom";
import { ColorOption } from "../../lib/constants";
import { getCatalogItem } from "../../lib/utils";

export default function Success() {
  const location = useLocation();

  const cart = location.state?.cart || {};
  const cart_keys = Object.keys(cart);

  return (
    <div className="flex justify-center p-[100px]">
      <div className="flex flex-col bg-white w-[800px] p-[15px] gap-[15px] border border-gray-500">
        <div className="flex justify-center text-xl font-bold mb-4">
          <h1>Order Placed Successfully</h1>
        </div>
        <div className="relative overflow-y-auto overflow-x-hidden">
          {cart_keys.map((k) => {
            const item = cart[k];
            const itemConfiguration = getCatalogItem(item.code);
            const isDefaultColor =
              item.color === ColorOption.DEFAULT ||
              item.color === itemConfiguration.default_color;

            const imagePath = isDefaultColor
              ? `/images/${item.code}.jpg`
              : `/images/${item.code}_${item.color
                  .split(" ")
                  .join("_")
                  .toLowerCase()}.jpg`;

            return (
              <div key={k} className="relative flex h-[320px] mt-[15px]">
                <div className="flex items-center justify-center w-[300px] min-h-[300px]">
                  <img
                    className={`max-w-[270px] max-h-[270px] ${
                      ["1240", "2240", "1640"].includes(item.code)
                        ? "max-h-[100px]"
                        : ""
                    }`}
                    src={imagePath}
                    alt={item.name}
                  />
                </div>
                <div className="absolute top-[40px] left-[300px]">
                  <div className="text-2xl font-bold mb-[10px]">{item.name}</div>
                  <div className="font-bold text-lg mb-[15px]">${item.price} each</div>

                  {!isDefaultColor && (
                    <div className="relative bottom-[10px] font-medium text-lg">
                      Color: {item.color}
                    </div>
                  )}

                  {item.embroidery && (
                    <div className="relative bottom-[10px] font-medium text-lg">
                      <p>
                        Embroidery: {item.embroidery}
                        {item.secondEmbroidery && ` / ${item.secondEmbroidery}`}
                      </p>
                    </div>
                  )}

                  {item.placement && (
                    <div className="relative bottom-[10px] font-medium text-lg">
                      Placement: {item.placement}
                      {item.secondPlacement && ` / ${item.secondPlacement}`}
                    </div>
                  )}

                  {/* Only show size if it's not a customs/accessory item where size might be "default" */}
                  {item.size && item.size !== "default" && (
                    <div className="relative bottom-[10px] font-medium text-lg">Size: {item.size}</div>
                  )}

                  <div className="relative bottom-[10px] font-medium text-lg">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
