import styles from "./Modification.module.scss";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

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

  function ColorHeaders() {
    return (
      <thead>
        <tr>
          <th scope="col"></th>
          {item.colors.map((color) => {
            return <th scope="col">{color}</th>;
          })}
        </tr>
      </thead>
    );
  }

  function QuantityOptions() {
    const [order, setOrder] = useState(structuredClone(customsOrder));
    console.log(order);
    return (
      <tbody>
        {sizes.map((size) => {
          return (
            <tr>
              <th scope="row">{size}</th>
              {item.colors.map((color) => {
                return (
                  <td className="p-[2px]">
                    {shouldUseQuantityBasedOrdering && (
                      <input
                        className="border-2 border-solid border-gray-600 rounded-md p-1"
                        type="text"
                        value={order[size]?.quantity || 0}
                        onChange={(e) => {
                          setOrder((old) => {
                            const newOne = structuredClone(old);
                            newOne[size] = {
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
        <ColorHeaders />
        <QuantityOptions />
      </table>
    </div>
  );
}
