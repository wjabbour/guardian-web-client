import { useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ColorOption } from "../../lib/constants";

export default function QuantitySelector({
  item,
  customsOrder,
  setCustomsOrder,
  selectedQuantity,
  setSelectedQuantity,
}) {
  const activeColor =
    item.colors?.[0] || item.default_color || ColorOption.DEFAULT;

  console.log(customsOrder);
  // Auto-populate the first option on mount if quantities exist
  useEffect(() => {
    if (item.quantities && item.quantities.length > 0) {
      const firstQty = item.quantities[0];

      // Update the local UI state
      setSelectedQuantity((prev) => ({
        ...prev,
        base: firstQty,
      }));

      // Update the parent's customsOrder
      const initialOrder = {
        [`${activeColor}`]: {
          quantity: firstQty,
        },
      };
      setCustomsOrder(initialOrder);
    }
  }, [item.quantities, activeColor, setSelectedQuantity, setCustomsOrder]);

  /**
   * Updates the parent's customsOrder object on manual change.
   */
  const handleSelectionChange = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);

    setSelectedQuantity((prev) => ({
      ...prev,
      base: value,
    }));

    const newOrder = {
      [`${activeColor}`]: {
        quantity: value,
      },
    };

    setCustomsOrder(newOrder);
  };

  function QuantitySelect() {
    return (
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-bold text-gray-700">
          Select Quantity:
        </label>
        <Select
          value={"" + selectedQuantity.base}
          onChange={handleSelectionChange}
          sx={{
            width: "120px",
            height: "40px",
            backgroundColor: "white",
          }}
          size="small"
        >
          {item.quantities.map((q) => (
            <MenuItem key={q} value={q}>
              {q}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  if (item.quantities) {
    return <QuantitySelect />;
  }

  return (
    <div className="mt-4 p-2 bg-gray-50 rounded-md border border-dashed border-gray-300">
      <p className="text-sm italic text-gray-500">
        Enter quantity in the table above for {item.fullname}
      </p>
    </div>
  );
}
