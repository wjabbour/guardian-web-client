import styles from "./Landing.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { Catalog } from "../../lib/catalog";

export default function Landing() {
  const catalog = Catalog();
  const types = {};
  catalog.forEach((item) => {
    types[item.type] = 1;
  });

  return (
    <div className={styles.landing}>
      <div className={styles.catalog}>
        {types["mens"] && (
          <ClothingIcon
            img={"/images/"}
            label={`Men's Apparel`}
            link={"/catalog/mens"}
            no_space={true}
          />
        )}
        {types["womens"] && (
          <ClothingIcon
            img={"/images/"}
            label={`Women's Apparel`}
            link={"/catalog/womens"}
            no_space={true}
          />
        )}
        {types["office"] && (
          <ClothingIcon
            img={"/images/"}
            label={`Office Supplies`}
            link={"/catalog/office"}
            no_space={true}
          />
        )}
        {types["service"] && (
          <ClothingIcon
            img={"/images/"}
            label={`Service`}
            link={"/catalog/service"}
            no_space={true}
          />
        )}
        {types["sales"] && (
          <ClothingIcon
            img={"/images/"}
            label={`Sales`}
            link={"/catalog/sales"}
            no_space={true}
          />
        )}
        {types["customs"] && (
          <ClothingIcon
            img={"/images/"}                                 
            link={"/catalog/customs"}
            no_space={true}
          />
        )}
        {types["accessory"] && (
          <ClothingIcon
            img={"/images/04032_black.jpg"}
            label={`Mugs & Keychains`}
            link={"/catalog/accessory"}
            no_space={false}
          />
        )}
      </div>
    </div>
  );
}
