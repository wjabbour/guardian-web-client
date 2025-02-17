import styles from "./Modification.module.scss";
import Checkbox from "@mui/material/Checkbox";

export default function QuantitySelector({
  item,
  sizes,
  set_selected_customs_black_quantity,
  set_selected_customs_white_quantity,
  set_selected_customs_color,
  selected_customs_color,
  selected_customs_black_quantity,
  selected_customs_white_quantity,
}) {
  sizes = item.type === "customs" ? [500, 1000, 2500] : sizes;
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
                        checked={
                          color === "Black"
                            ? selected_customs_black_quantity === size
                            : selected_customs_white_quantity === size
                        }
                        onChange={() => {
                          if (color === "Black") {
                            set_selected_customs_black_quantity(size);
                          } else {
                            set_selected_customs_white_quantity(size);
                          }
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
