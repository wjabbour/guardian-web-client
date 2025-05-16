import styles from "./Thumbnail.module.scss";
import { getWebConfigValue } from "guardian-common";

export default function Thumbnail({ img }) {
  // if there is no embroidery selected, we shouldnt show a thumbnail
  const show = img !== "" && getWebConfigValue("show_modification_thumbnail");

  function getImagePath(logo_name) {
    return `/images/${logo_name.toLowerCase().split(" ").join("_")}.png`;
  }

  return (
    <div
      className={`${styles.logo_thumbnail} ${show ? styles.show : styles.hide}`}
    >
      {img && <img className={styles.logo} src={getImagePath(img)}></img>}
    </div>
  );
}
