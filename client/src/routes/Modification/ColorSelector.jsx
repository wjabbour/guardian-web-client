import styles from "./Modification.module.scss";

export default function ColorSelector({
  item,
  set_selected_color,
  selected_color,
  set_image_source,
}) {
  const halfColors = item.halfColors || [];
  const color_selection = item.colors.map((color) => {
    if (halfColors.includes(color)) {
      const primaryColor = color.split(" ")[0];
      return (
        <div className={styles.color__option} key={color}>
          <div
            className={`${styles.color__block} ${styles[primaryColor]}`}
            onClick={() => {
              const selectedColor = color.split(" ").join("_");
              set_selected_color(selectedColor);
              set_image_source(
                `/images/${item.code}_${selectedColor.toLowerCase()}.jpg`
              );
            }}
          >
            <div className={`${styles.color__triangle} `}></div>
          </div>

          <div className={styles.color__name}>
            <p>{color}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.color__option} key={color}>
          <div
            className={`${styles.color__block} ${
              styles[color.split(" ").join("_")]
            } ${selected_color === color ? styles.selected : ""}`}
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
          <div className={styles.color__name}>
            <p>{color}</p>
          </div>
        </div>
      );
    }
  });
  return color_selection;
}
