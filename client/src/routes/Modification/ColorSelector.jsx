import "./colors.css";

export default function ColorSelector({
  item,
  set_selected_color,
  selected_color,
  set_image_source,
}) {
  const halfColors = item.halfColors || [];
  const colorOptions = item.colors.map((color) => {
    if (halfColors.includes(color)) {
      const topColor = color.split(" ")[0];
      const bottomColor = color.split(" ")[1];
      console.log(topColor)
      return (
        // TODO: refactor to component
        <div
          className={`relative h-[32px] w-[38px] cursor-pointer rounded-sm ${
            color === selected_color
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
            .join("_")} rounded-sm ${
            color === selected_color
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
    <div className="w-[350px]">
      <div className="flex flex-wrap gap-[5px]">{colorOptions}</div>
      <p className="mt-2 font-medium">
        <span className="text-[16px] text-gray-400">Color: </span>
        {selected_color}
      </p>
    </div>
  );
}
