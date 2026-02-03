import "./colors.css";

export default function ColorSelector({
  item,
  set_selected_color,
  selected_color,
  set_image_source,
  sapVariations,
  selected_sapVariation,
  set_selected_sapVariation,
}) {
  // If color selector is disabled, don't render
  if (item.disableColorSelector) {
    return null;
  }

  // If sapVariations exist, render variation blocks instead of color blocks
  if (item.sapVariations && item.sapVariations.length > 0) {
    const variationOptions = item.sapVariations.map((variation) => {
      return (
        <div
          className={`h-[32px] w-[38px] cursor-pointer ${variation.color
            .split(" ")
            .join("_")} rounded-sm ${variation.code === selected_sapVariation
              ? "border-[2px] border-yellow-400"
              : "border-[1px] border-black"
            } `}
          key={variation.code}
          onClick={() => {
            set_selected_sapVariation(variation.code);
            set_selected_color(variation.color);
            set_image_source(
              `/images/${item.code}_${variation.color
                .split(" ")
                .join("_")
                .toLowerCase()}.jpg`
            );
          }}
        ></div>
      );
    });

    // Find the selected variation to display its color name
    const selectedVariation = item.sapVariations.find(
      (v) => v.code === selected_sapVariation
    );

    return (
      <div className="w-[300px] mt-[25px]">
        <div className="flex flex-wrap gap-[5px]">{variationOptions}</div>
        <p className="mt-2 font-medium">
          <span className="text-[16px] text-gray-400">
            {item.variationTextOverride || "Color:"}{" "}
          </span>
          {selectedVariation ? selectedVariation.color : ""}
        </p>
      </div>
    );
  }

  if (!item.colors) return null;

  const halfColors = item.halfColors || [];
  const colorOptions = item.colors.map((color) => {
    if (halfColors.includes(color)) {
      const topColor = color.split(" ")[0];
      const bottomColor = color.split(" ")[1];
      return (
        // TODO: refactor to component
        <div
          className={`relative h-[32px] w-[38px] cursor-pointer rounded-sm ${color === selected_color
            ? "border-[2px] border-yellow-400"
            : "border-[1px] border-black"
            }`}
          key={color}
          onClick={() => {
            set_selected_color(color);
            set_image_source(
              `/images/${item.code}_${color
                .split(" ")
                .join("_")
                .toLowerCase()}.jpg`
            );
          }}
        >
          <div className={`h-[15px] ${topColor}`}></div>
          <div className={`h-[15px] ${bottomColor}`}></div>
        </div>
      );
    } else {
      return (
        <div
          className={`h-[32px] w-[38px] cursor-pointer ${color
            .split(" ")
            .join("_")} rounded-sm ${color === selected_color
              ? "border-[2px] border-yellow-400"
              : "border-[1px] border-black"
            } `}
          key={color}
          onClick={() => {
            set_selected_color(color);
            set_image_source(
              `/images/${item.code}_${color
                .split(" ")
                .join("_")
                .toLowerCase()}.jpg`
            );
          }}
        ></div>
      );
    }
  });

  return (
    <div className="w-[300px] mt-[25px]">
      <div className="flex flex-wrap gap-[5px]">{colorOptions}</div>
      <p className="mt-2 font-medium">
        <span className="text-[16px] text-gray-400">Color: </span>
        {selected_color}
      </p>
    </div>
  );
}
