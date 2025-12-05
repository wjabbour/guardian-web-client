import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function create2DArray(n, m, initialValue = null) {
  return Array.from({ length: n }, () => Array(m).fill(initialValue));
}
export default function QuantitySelector({
  item,
  customsOrder,
  setCustomsOrder,
  setOuterSelectedQuantity,
}) {
  const [order, setOrder] = useState(structuredClone(customsOrder));
  const [selectedQuantity, setSelectedQuantity] = useState(
    create2DArray(item.colors.length, Object.keys(item.pricing).length)
  );

  console.log(selectedQuantity, "hey");

  /*
    There are three styles of item ordering that we want to support (and i bet
    this could be refactored to not need three cases)

    1. apparel style - the user enters a number in a text box. that number they
    enter is the quantity of the item added to the cart.
    2. customs style - the user enters a number in a text box. that number is
    multiplied by the label of the text box to become the quantity of the item
    added to the cart.
    3. new style - the user selects the quantity from a dropdown
  */
  let shouldUseNormalOrdering = true;

  // check if the keys of the sizes are numbers vs strings
  let shouldUseCustomQuantityBasedOrdering = !isNaN(
    Number(Object.keys(item.sizes)[0])
  );

  function Header() {
    return (
      <thead>
        <tr>
          <th scope="col"></th>
          {item.sizes.map((size) => {
            return <th scope="col">{size}</th>;
          })}
        </tr>
      </thead>
    );
  }

  function NormalInput() {
    return (
      <input
        className="border-2 border-solid border-gray-600 rounded-md p-1"
        type="text"
      ></input>
    );
  }

  function PredefinedQuantityInput() {
    return (
      <Select
        value={"" + selectedQuantity}
        onChange={(e: SelectChangeEvent) =>
          setSelectedQuantity(Number(e.target.value))
        }
      >
        {item.quantities.map((q) => (
          <MenuItem value={q}>{q}</MenuItem>
        ))}
      </Select>
    );
  }

  function CustomQuantityInput({ order, size, color, setOrder }) {
    return (
      <input
        className="border-2 border-solid border-gray-600 rounded-md p-1"
        type="text"
        value={order[`${size},${color}`]?.quantity || 0}
        onChange={(e) => {
          setOrder((old) => {
            const newOne = structuredClone(old);
            newOne[`${size},${color}`] = {
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
    );
  }

  if (true) return <PredefinedQuantityInput />;

  return (
    <div className="">
      <table id="table">
        <Header />

        <tbody>
          {item.colors.map((color) => {
            return (
              <tr>
                <th scope="row">{color}</th>
                {item.sizes.map((size) => {
                  return (
                    <td className="p-[2px]">
                      {shouldUseCustomQuantityBasedOrdering && (
                        <CustomQuantityInput
                          order={order}
                          size={size}
                          color={color}
                          setOrder={setOrder}
                        />
                      )}

                      {shouldUseNormalOrdering && <NormalInput />}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
