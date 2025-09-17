import styles from "./Modification.module.scss";
import { useState } from "react";

export default function QuantitySelector({
  item,
  sizes,
  customsOrder,
  setCustomsOrder,
}) {
  // check if the keys of the sizes are numbers vs strings
  const shouldUseQuantityBasedOrdering = !isNaN(
    Number(Object.keys(item.sizes)[0])
  );

  function Header() {
    return (
      <thead>
        <tr>
          <th scope="col"></th>
          {sizes.map((size) => {
            return <th scope="col">{size}</th>;
          })}
        </tr>
      </thead>
    );
  }

  function QuantityOptions() {
    const [order, setOrder] = useState(structuredClone(customsOrder));
    return (
      <tbody>
        {item.colors.map((color) => {
          return (
            <tr>
             {/* TODO fix this */}
              <th scope="row">{color}</th>
              {sizes.map((size) => {
                return (
                  <td className="p-[2px]">
                    {shouldUseQuantityBasedOrdering && (
                      <input
                        className="border-2 border-solid border-gray-600 rounded-md p-1"
                        type="text"
                        value={order[`${color},${color}`]?.quantity || 0}
                        onChange={(e) => {
                          setOrder((old) => {
                            const newOne = structuredClone(old);
                            newOne[`${color},${color}`] = {
                              quantity: Number(e.target.value),
                              color,
                            };

                            return newOne;
                          });
                        }}
                        onBlur={() => {
                          setCustomsOrder(order);
                        }}
                      ></input>
                    )}
                    {!shouldUseQuantityBasedOrdering && (
                      <input
                        className="border-2 border-solid border-gray-600 rounded-md p-1"
                        type="text"
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
  return (
    <div className={styles.form__container}>
      <table id="table">
        <Header />
        <QuantityOptions />
      </table>
    </div>
  );
}
