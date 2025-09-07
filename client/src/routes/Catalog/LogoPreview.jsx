import styles from "./Catalog.module.scss";
import { getEmbroidery } from "../../lib/utils";

export default function LogoPreview({ catalogType }) {
  if (!getEmbroidery.catalogType) {
    return null;
  }

  const logos = getEmbroidery(catalogType).map((l) => {
    l = l.toLowerCase().split(" ").join("_");
    if (l === "chrysler" || l === "dodge") {
      return (
        <img
          key={l}
          className={styles.large__picture}
          src={`/images/${l}.png`}
        ></img>
      );
    } else if (l === "quicklane") {
      return (
        <img
          key={l}
          className={styles.quicklane}
          src={`/images/${l}.png`}
        ></img>
      );
    } else {
      return <img key={l} src={`/images/${l}.png`}></img>;
    }
  });

  const logosDiv = <div className={styles.logos}>{logos}</div>;

  return (
    <div>
      {logos.length > 0 && (
        <div className={styles.logo__preview}>
          <div className={styles.title}>
            <p>Available Logos:</p>
          </div>
          {logosDiv}
        </div>
      )}
    </div>
  );
}
