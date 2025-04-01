import styles from "./Landing.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { Catalog } from "../../lib/catalog";

export default function LandingV2() {
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
            img={"/images/J317_black.jpg"}
            label={`Men's Apparel`}
            link={"/catalog/mens"}
            no_space={true}
          />
        )}
        {types["womens"] && (
          <ClothingIcon
            img={"/images/L317_black.jpg"}
            label={`Women's Apparel`}
            link={"/catalog/womens"}
            no_space={true}
          />
        )}
        {types["service"] && (
          <ClothingIcon
              img={"/images/600088V_plastic.jpg"}
              label={`Service`}
              link={"/catalog/service"}
              no_space={true}
          />
        )}
        {types["customs"] && (
          <ClothingIcon
            img={"/images/Guardian_33P3D.jpg"}
            label={`Customs & Decals`}
            link={"/catalog/customs"}
            no_space={true}
          />
        )}
        {types["office"] && (
         <ClothingIcon
            img={"/images/5470_buff.jpg"}
            label={`Office Supplies`}
            link={"/catalog/office"}
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
