import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ColorOption } from "../../lib/constants";

// Moved style constant outside to avoid re-calculating/re-injecting
const hideArrowsStyle = `
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }
`;

export default function QuantitySelector({
  item,
  setUserSelection,
}) {
  const [selectedQty, setSelectedQty] = useState<number | "">("");
  const [gridValues, setGridValues] = useState<Record<string, number>>({});

  const activeColor =
    item.colors?.[0] || item.default_color || ColorOption.DEFAULT;

  useEffect(() => {
    if (item.quantities && item.quantities.length > 0) {
      const firstQty = Number(item.quantities[0]);
      setSelectedQty(firstQty);
      setUserSelection({ [`${activeColor}`]: firstQty });
    }
  }, [item.quantities, activeColor, setUserSelection]);

  const handleSelectionChange = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);
    setSelectedQty(value);
    setUserSelection({ [`${activeColor}`]: value });
  };

  const handleGridChange = (size: string, color: string, value: string) => {
    const qty = value === "" ? 0 : Number(value);
    const key = `${size},${color}`;

    setGridValues((prev) => {
      const updated = { ...prev, [key]: qty };
      // Push to parent immediately
      setUserSelection(updated);
      return updated;
    });
  };

  // 1. Logic for PRE-DEFINED QUANTITIES
  if (item.quantities && item.quantities.length > 0) {
    return (
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-bold text-gray-700">Select Quantity:</label>
        <Select
          value={"" + selectedQty}
          onChange={handleSelectionChange}
          sx={{ width: "120px", height: "40px", backgroundColor: "white" }}
          size="small"
        >
          {item.quantities.map((q) => (
            <MenuItem key={q} value={Number(q)}>{q}</MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  // 2. Logic for SIZE/COLOR GRID
  if (item.sizes && item.colors) {
    return (
      <div className="mt-6 overflow-x-auto">
        <style dangerouslySetInnerHTML={{ __html: hideArrowsStyle }} />

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border bg-gray-100 text-xs uppercase text-gray-600">Color \ Size</th>
              {item.sizes.map((size: string) => (
                <th key={size} className="p-2 border bg-gray-50 text-xs font-bold uppercase text-center">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.colors.map((color: string) => (
              <tr key={color}>
                <td className="p-2 border bg-gray-50 text-xs font-bold uppercase text-gray-700">
                  {color}
                </td>
                {item.sizes.map((size: string) => {
                  const key = `${size},${color}`;
                  return (
                    <td key={key} className="p-2 border">
                      <input
                        type="number"
                        value={gridValues[key] || ""}
                        className="w-16 p-1 border rounded text-center focus:outline-none focus:ring-1 focus:ring-black"
                        onChange={(e) => handleGridChange(size, color, e.target.value)}
                        placeholder="0"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}