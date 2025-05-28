import styles from "./Modification.module.scss";
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
    const clone = structuredClone(customsOrder);
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
                      <Checkbox
                        checked={clone[size]?.includes(color)}
                        onChange={() => {
                          // we are unselecting the checkbox
                          if (clone[size]?.includes(color)) {
                            const idx = clone[size].indexOf(color);

                            if (idx > -1) {
                              clone[size].splice(idx, 1);
                            }
                          } else {
                            if (clone[size]) {
                              clone[size].push(color);
                            } else {
                              clone[size] = [color];
                            }
                          }
                          setCustomsOrder(clone);
                        }}
                      />
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
