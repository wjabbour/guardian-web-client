import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ColorOption } from "../../lib/constants";

export default function QuantitySelector({
  item,
  setUserSelection,
}) {
  // Local state initialized as a number (or undefined until set)
  const [selectedQty, setSelectedQty] = useState<number | "">("");

  const activeColor =
    item.colors?.[0] || item.default_color || ColorOption.DEFAULT;

  useEffect(() => {
    if (item.quantities && item.quantities.length > 0) {
      // Coerce to number
      const firstQty = Number(item.quantities[0]);

      setSelectedQty(firstQty);

      const initialOrder = {
        [`${activeColor}`]: firstQty,
      };
      setUserSelection(initialOrder);
    }
  }, [item.quantities, activeColor, setUserSelection]);

  const handleSelectionChange = (event: SelectChangeEvent) => {
    // Explicitly coerce the event value to a number
    const value = Number(event.target.value);

    setSelectedQty(value);

    const newOrder = {
      [`${activeColor}`]: value,
    };

    setUserSelection(newOrder);
  };

  function QuantitySelect() {
    return (
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-bold text-gray-700">
          Select Quantity:
        </label>
        <Select
          value={"" + selectedQty}
          onChange={handleSelectionChange}
          sx={{
            width: "120px",
            height: "40px",
            backgroundColor: "white",
          }}
          size="small"
        >
          {item.quantities.map((q) => (
            <MenuItem key={q} value={Number(q)}>
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
}