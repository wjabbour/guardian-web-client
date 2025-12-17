import styles from "./Success.module.scss";
import { useLocation } from "react-router-dom";
import { ColorOption } from "../../lib/constants";

export default function Success() {
  const location = useLocation();

  const cart = location.state?.cart || {};
  const cart_keys = Object.keys(cart);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className="flex justify-center text-xl font-bold mb-4">
          <h1>Order Placed Successfully</h1>
        </div>
        <div className={styles.scrollable}>
          {cart_keys.map((k) => {
            const item = cart[k];
            const isDefaultColor =
              item.color === ColorOption.DEFAULT || !item.color;

            const imagePath = isDefaultColor
              ? `/images/${item.code}.jpg`
              : `/images/${item.code}_${item.color
                  .split(" ")
                  .join("_")
                  .toLowerCase()}.jpg`;

            return (
              <div key={k} className={styles.line__item}>
                <div className={styles.image__container}>
                  <img
                    className={`${
                      ["1240", "2240", "1640"].includes(item.code)
                        ? styles.small
                        : ""
                    }`}
                    src={imagePath}
                    alt={item.name}
                  />
                </div>
                <div className={styles.information__panel}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.price}>${item.price} each</div>

                  {!isDefaultColor && (
                    <div className={styles.color__title}>
                      Color: {item.color}
                    </div>
                  )}

                  {item.embroidery && (
                    <div className={styles.color__title}>
                      <p>
                        Embroidery: {item.embroidery}
                        {item.secondEmbroidery && ` / ${item.secondEmbroidery}`}
                      </p>
                    </div>
                  )}

                  {item.placement && (
                    <div className={styles.color__title}>
                      Placement: {item.placement}
                      {item.secondPlacement && ` / ${item.secondPlacement}`}
                    </div>
                  )}

                  {/* Only show size if it's not a customs/accessory item where size might be "default" */}
                  {item.size && item.size !== "default" && (
                    <div className={styles.size}>Size: {item.size}</div>
                  )}

                  <div className={styles.quantity}>
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
