import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function QuantitySelector({
  item,
  customsOrder,
  setCustomsOrder,
  selectedQuantity,
  setSelectedQuantity,
}) {
  const [order, setOrder] = useState(structuredClone(customsOrder));

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

  // function Header() {
  //   return (
  //     <thead>
  //       <tr>
  //         <th scope="col"></th>
  //         {item.sizes.map((size) => {
  //           return <th scope="col">{size}</th>;
  //         })}
  //       </tr>
  //     </thead>
  //   );
  // }

  function NormalInput() {
    return (
      <input
        className="border-2 border-solid border-gray-600 rounded-md p-1"
        type="text"
      ></input>
    );
  }

  function QuantitySelect() {
    return (
      <Select
        value={"" + selectedQuantity.base}
        onChange={(e: SelectChangeEvent) => {
          setSelectedQuantity((prev) => {
            const newQty = structuredClone(prev);
            newQty["base"] = Number(e.target.value);
            return newQty;
          });
        }}
      >
        {item.quantities.map((q) => (
          <MenuItem value={q}>{q}</MenuItem>
        ))}
      </Select>
    );
  }

  // function CustomQuantityInput({ order, size, color, setOrder }) {
  //   return (
  //     <input
  //       className="border-2 border-solid border-gray-600 rounded-md p-1"
  //       type="text"
  //       value={order[`${size},${color}`]?.quantity || 0}
  //       onChange={(e) => {
  //         setOrder((old) => {
  //           const newOne = structuredClone(old);
  //           newOne[`${size},${color}`] = {
  //             quantity: Number(e.target.value),
  //             color,
  //           };

  //           return newOne;
  //         });
  //       }}
  //       onBlur={() => {
  //         setCustomsOrder(order);
  //       }}
  //     ></input>
  //   );
  // }

  if (item.quantities) return <QuantitySelect />;

  // return (
  //   <div className="">
  //     <table id="table">
  //       <Header />

  //       <tbody>
  //         {item.colors.map((color) => {
  //           return (
  //             <tr>
  //               <th scope="row">{color}</th>
  //               {item.sizes.map((size) => {
  //                 return (
  //                   <td className="p-[2px]">
  //                     {shouldUseCustomQuantityBasedOrdering && (
  //                       <CustomQuantityInput
  //                         order={order}
  //                         size={size}
  //                         color={color}
  //                         setOrder={setOrder}
  //                       />
  //                     )}

  //                     {shouldUseNormalOrdering && <NormalInput />}
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}
