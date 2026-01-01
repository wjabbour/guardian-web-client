import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ColorOption, SizeOption } from "../../lib/constants";

// Helper to determine display mode
const isMany = (arr?: string[]) => (arr ? arr.length >= 2 : false);

interface Props {
  item: any; // Ideally replace 'any' with your Product interface
  setUserSelection: (selection: Record<string, number>) => void;
  reset: number;
}

export default function QuantitySelector({
  item,
  setUserSelection,
  reset,
}: Props) {
  // State holds 'number' or empty string ""
  const [selectedQty, setSelectedQty] = useState<number | "">("");

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [gridValues, setGridValues] = useState<Record<string, number>>({});

  const hasQuantities = item.quantities && item.quantities.length > 0;
  const isManySizes = isMany(item.sizes);
  const isManyColors = isMany(item.colors);

  // Normalize effective lists for rendering
  const effectiveSizes =
    item.sizes && item.sizes.length > 0 ? item.sizes : [SizeOption.BASE];

  const effectiveColors =
    item.colors && item.colors.length > 0
      ? item.colors
      : [item.default_color || ColorOption.DEFAULT];

  useEffect(() => {
    // 1. Reset Grid
    setGridValues({});

    // 2. Determine Defaults
    const defaultSize = item.sizes?.[0] || SizeOption.BASE;
    const defaultColor =
      item.colors?.[0] || item.default_color || ColorOption.DEFAULT;

    setSelectedSize(defaultSize);
    setSelectedColor(defaultColor);

    // 3. Auto-select Quantity logic
    if (hasQuantities) {
      // We only auto-select for Dropdown views (Cases A, B, C).
      // We DO NOT auto-select for Grid (Case D).
      const isGrid = isManySizes && isManyColors;

      if (!isGrid) {
        const firstQty = Number(item.quantities[0]);
        setSelectedQty(firstQty);

        // SYNC WITH PARENT IMMEDIATELY
        setUserSelection({
          [`${defaultSize},${defaultColor}`]: firstQty,
        });
      } else {
        // If it is a grid, ensure main qty is cleared
        setSelectedQty("");
      }
    } else {
      // No quantities defined (Text Input mode), clear selection
      setSelectedQty("");
    }
  }, [item, reset, hasQuantities, isManySizes, isManyColors, setUserSelection]);

  // --- HANDLERS ---

  const handleCompositeChange = (
    newSize: string,
    newColor: string,
    newQty: number | ""
  ) => {
    setSelectedSize(newSize);
    setSelectedColor(newColor);
    setSelectedQty(newQty);

    if (newQty !== "") {
      setUserSelection({ [`${newSize},${newColor}`]: newQty });
    }
  };

  const handleQtyChange = (event: SelectChangeEvent) => {
    // MUI Select returns string even if MenuItem value is number sometimes,
    // but best practice with MUI Select is to keep values consistent.
    // We parse whatever comes back into a number.
    const val = Number(event.target.value);
    handleCompositeChange(selectedSize, selectedColor, val);
  };

  const handleSizeChange = (event: SelectChangeEvent) => {
    handleCompositeChange(event.target.value, selectedColor, selectedQty);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    handleCompositeChange(selectedSize, event.target.value, selectedQty);
  };

  const handleGridChange = (
    size: string,
    color: string,
    value: string | number
  ) => {
    // Parse input to number safely
    const qty = typeof value === "string" ? parseInt(value, 10) || 0 : value;
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
    const s = item.sizes?.[0] || SizeOption.BASE;
    const c = item.colors?.[0] || item.default_color || ColorOption.DEFAULT;
    setUserSelection({ [`${s},${c}`]: qty });
  };

  // --- RENDER LOGIC ---

  // SCENARIO 1: PRE-DEFINED QUANTITIES EXIST
  if (hasQuantities) {
    // Case D: Grid of Dropdowns (2+ Sizes AND 2+ Colors)
    if (isManySizes && isManyColors) {
      return (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border bg-gray-100"></th>
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
              {effectiveColors.map((color: string) => (
                <tr key={color}>
                  <td className="p-2 border bg-gray-50 text-xs font-bold uppercase text-gray-700">
                    {color}
                  </td>
                  {effectiveSizes.map((size: string) => {
                    const key = `${size},${color}`;
                    // Resolve value to string for MUI Select
                    const currentVal =
                      gridValues[key] !== undefined
                        ? String(gridValues[key])
                        : "";

                    return (
                      <td key={key} className="p-2 border text-center">
                        <Select
                          value={currentVal}
                          onChange={(e) =>
                            handleGridChange(size, color, e.target.value)
                          }
                          sx={{
                            width: "80px",
                            height: "35px",
                            backgroundColor: "white",
                          }}
                          size="small"
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            0
                          </MenuItem>
                          {item.quantities.map((q: number | string) => (
                            <MenuItem key={q} value={String(q)}>
                              {q}
                            </MenuItem>
                          ))}
                        </Select>
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

    // Common Dropdown Props for reuse
    const qtyDropdownProps = {
      value: String(selectedQty), // FORCE STRING for rendering
      onChange: handleQtyChange,
      sx: { width: "100px", height: "40px", backgroundColor: "white" },
      size: "small" as const,
      displayEmpty: true,
    };

    // Case C: Size Dropdown + Qty Dropdown (2+ Sizes, 0-1 Color)
    if (isManySizes) {
      return (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Size</label>
              <Select
                value={selectedSize}
                onChange={handleSizeChange}
                sx={{
                  width: "150px",
                  height: "40px",
                  backgroundColor: "white",
                }}
                size="small"
              >
                {effectiveSizes.map((s: string) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Quantity
              </label>
              <Select {...qtyDropdownProps}>
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                {item.quantities.map((q: number | string) => (
                  <MenuItem key={q} value={String(q)}>
                    {q}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      );
    }

    // Case B: Color Dropdown + Qty Dropdown (0-1 Size, 2+ Colors)
    if (isManyColors) {
      return (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Color</label>
              <Select
                value={selectedColor}
                onChange={handleColorChange}
                sx={{
                  width: "150px",
                  height: "40px",
                  backgroundColor: "white",
                }}
                size="small"
              >
                {effectiveColors.map((c: string) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">
                Quantity
              </label>
              <Select {...qtyDropdownProps}>
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                {item.quantities.map((q: number | string) => (
                  <MenuItem key={q} value={String(q)}>
                    {q}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      );
    }

    // Case A: Single Qty Dropdown (0-1 Size, 0-1 Color)
    return (
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-bold text-gray-700">
          Select Quantity:
        </label>
        <Select
          value={String(selectedQty)} // FORCE STRING for rendering
          onChange={handleQtyChange}
          sx={{ width: "120px", height: "40px", backgroundColor: "white" }}
          size="small"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select
          </MenuItem>
          {item.quantities.map((q: number | string) => (
            <MenuItem key={q} value={String(q)}>
              {q}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  // SCENARIO 2: NO PRE-DEFINED QUANTITIES (Legacy/Text Input Mode)

  // Grid (Text Input)
  if (effectiveSizes.length > 0 && item.colors && item.colors.length > 0) {
    return (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border bg-gray-100 text-xs uppercase text-gray-600"></th>
              {effectiveSizes.map((size: string) => (
                <th
                  key={size}
                  className="p-2 border bg-gray-50 text-xs font-bold uppercase text-center"
                >
                  {size !== SizeOption.BASE ? size : ""}
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

  // Single Text Input
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
