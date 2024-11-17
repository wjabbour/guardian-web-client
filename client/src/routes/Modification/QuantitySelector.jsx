import styles from "./modification.module.scss";
import Checkbox from "@mui/material/Checkbox";

export default function QuantitySelector({
  item,
  sizes,
  selected_customs_quantity,
  set_selected_customs_quantity,
  set_selected_customs_color,
  selected_customs_color,
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
                          selected_customs_quantity === size &&
                          selected_customs_color === color
                        }
                        onChange={() => {
                          set_selected_customs_quantity(size);
                          set_selected_customs_color(color);
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
