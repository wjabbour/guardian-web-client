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
            img={"/images/mens.jpg"}            
            link={"/catalog/mens"}
            no_space={true}
          />
        )}
        {types["womens"] && (
          <ClothingIcon
            img={"/images/womens.jpg"}            
            link={"/catalog/womens"}
            no_space={true}
          />
        )}
        {types["office"] && (
          <ClothingIcon
            img={"/images/office.jpg"}            
            link={"/catalog/office"}
            no_space={true}
          />
        )}
        {types["service"] && (
          <ClothingIcon
            img={"/images/service.jpg"}            
            link={"/catalog/service"}
            no_space={true}
          />
        )}
        {types["sales"] && (
          <ClothingIcon
            img={"/images/sales.jpg"}            
            link={"/catalog/sales"}
            no_space={true}
          />
        )}
        {types["customs"] && (
          <ClothingIcon
            img={"/images/customs.jpg"}                                 
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
