import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ColorOption, SizeOption } from "../../lib/constants";

export default function QuantitySelector({ item, setUserSelection, reset }) {
  const [selectedQty, setSelectedQty] = useState<number | "">("");
  const [gridValues, setGridValues] = useState<Record<string, number>>({});

  const effectiveSizes =
    item.sizes && item.sizes.length > 0
      ? item.sizes
      : item.colors && item.colors.length > 0 && !item.quantities
      ? [SizeOption.BASE]
      : [];

  const activeColor =
    item.colors?.[0] || item.default_color || ColorOption.DEFAULT;

  useEffect(() => {
    if (item.quantities && item.quantities.length > 0) {
      const firstQty = Number(item.quantities[0]);
      setSelectedQty(firstQty);
      setUserSelection({ [`${SizeOption.BASE},${activeColor}`]: firstQty });
    } else {
      setGridValues({});
      setSelectedQty("");
    }
  }, [item.quantities, activeColor, setUserSelection, reset]);

  const handleSelectionChange = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);
    setSelectedQty(value);
    setUserSelection({ [`${SizeOption.BASE},${activeColor}`]: value });
  };

  const handleGridChange = (size: string, color: string, value: string) => {
    // Just parse it. If it's not a number, default to 0.
    const qty = parseInt(value, 10) || 0;
    const key = `${size},${color}`;

    setGridValues((prev) => {
      const updated = { ...prev, [key]: qty };
      setUserSelection(updated);
      return updated;
    });
  };

  const handleSingleInputChange = (value: string) => {
    const qty = parseInt(value, 10) || 0;
    setSelectedQty(qty);
    setUserSelection({ [`${SizeOption.BASE},${activeColor}`]: qty });
  };

  // 1. PRE-DEFINED QUANTITIES (Dropdown)
  if (item.quantities && item.quantities.length > 0) {
    return (
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-bold text-gray-700">
          Select Quantity:
        </label>
        <Select
          value={selectedQty}
          onChange={handleSelectionChange}
          sx={{ width: "120px", height: "40px", backgroundColor: "white" }}
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

  // 2. SIZE/COLOR GRID
  if (effectiveSizes.length > 0 && item.colors && item.colors.length > 0) {
    return (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border bg-gray-100 text-xs uppercase text-gray-600">
                Color \ Size
              </th>
              {effectiveSizes.map((size: string) => (
                <th
                  key={size}
                  className="p-2 border bg-gray-50 text-xs font-bold uppercase text-center"
                >
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
                {effectiveSizes.map((size: string) => {
                  const key = `${size},${color}`;
                  return (
                    <td key={key} className="p-2 border">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={gridValues[key] || ""}
                        className="w-16 p-1 border rounded text-center focus:outline-none focus:ring-1 focus:ring-black"
                        onChange={(e) =>
                          handleGridChange(size, color, e.target.value)
                        }
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

  // 3. SINGLE TEXT INPUT
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm font-bold text-gray-700">Input Quantity:</label>
      <input
        type="text"
        inputMode="numeric"
        value={selectedQty}
        className="w-32 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
        onChange={(e) => handleSingleInputChange(e.target.value)}
        placeholder="0"
      />
    </div>
  );
}
