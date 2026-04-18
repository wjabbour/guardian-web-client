import { useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();

  const cart = location.state?.cart || {};
  const meta = location.state?.meta || {};
  const cart_keys = Object.keys(cart);

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const formattedDate = meta.created_at
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(parseInt(meta.created_at))
    : null;

  return (
    <div className="flex justify-center p-[100px]">
      <div className="flex flex-col w-[380px] border-2 border-gray-400 rounded-md overflow-hidden">
        <div className="bg-gray-100 border-b-2 border-gray-400 p-3">
          <h1 className="text-lg font-bold">Order Placed Successfully</h1>
        </div>

        <div className="flex flex-col gap-1 p-3 border-b-2 border-gray-400 text-sm bg-white">
          {meta.order_id && <p><b>Order ID:</b> {meta.order_id}</p>}
          {meta.email && <p><b>Email:</b> {meta.email}</p>}
          {formattedDate && <p><b>Placed:</b> {formattedDate}</p>}
          {meta.customer_po && <p><b>PO:</b> {meta.customer_po}</p>}
          <p><b>Total:</b> {totalItems} item{totalItems !== 1 ? "s" : ""} — ${totalPrice}</p>
        </div>

        <div className="flex flex-col overflow-y-auto max-h-[600px]">
          {cart_keys.map((k) => {
            const item = cart[k];

            return (
              <div key={k} className="flex flex-col gap-1 p-3 border-b border-gray-200 text-sm">
                <p><b>{item.name}</b></p>
                <p><b>Price:</b> ${item.price} each</p>

                {item.color && item.color !== "default" && (
                  <p><b>Color:</b> {item.color}</p>
                )}

                {item.embroidery && (
                  <p>
                    <b>Embroidery:</b> {item.embroidery}
                    {item.secondEmbroidery && ` / ${item.secondEmbroidery}`}
                  </p>
                )}

                {item.placement && (
                  <p>
                    <b>Placement:</b> {item.placement}
                    {item.secondPlacement && ` / ${item.secondPlacement}`}
                  </p>
                )}

                {item.size && item.size !== "default" && (
                  <p><b>Size:</b> {item.size}</p>
                )}

                <p><b>Quantity:</b> {item.quantity}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
