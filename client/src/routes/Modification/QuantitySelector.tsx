import styles from "./Modification.module.scss";
import Checkbox from "@mui/material/Checkbox";

export default function QuantitySelector({
  item,
  sizes,
  customsOrder,
  setCustomsOrder,
}) {
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
                  <td>
                    {item.type === "customs" && (
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
                    {item.type !== "customs" && <input type="text"></input>}
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
