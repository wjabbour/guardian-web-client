import './colors.css'

export default function ColorSelector({
  item,
  set_selected_color,
  selected_color,
  set_image_source,
}) {
  const halfColors = item.halfColors || [];
  const colorOptions = item.colors.map((color) => {
    if (halfColors.includes(color)) {
      const primaryColor = color.split(" ")[0];
      return (
        <div className="" key={color}>
          <div
            className=""
            onClick={() => {
              const selectedColor = color.split(" ").join("_");
              set_selected_color(selectedColor);
              set_image_source(
                `/images/${item.code}_${selectedColor.toLowerCase()}.jpg`
              );
            }}
          >
            <div className=""></div>
          </div>

          <div className="">
            <p>{color}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`h-[32px] w-[38px] max-w-[38px] cursor-pointer ${color.split(" ").join("_")} rounded-sm basis-1/4`}
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
    <div className="w-[250px]">
      <div className="flex flex-wrap gap-[5px]">
        {colorOptions}
      </div>
      <div className="">
        <p>{selected_color}</p>
      </div>
    </div>);
}
