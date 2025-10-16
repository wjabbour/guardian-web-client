import styles from "./Landing.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { getWebCatalog, getWebConfigValue } from "guardian-common";

export default function Landing() {
  const catalog = getWebCatalog();
  const stores = getWebConfigValue("stores");
  const types = {};
  catalog.forEach((item) => {
    types[item.type] = 1;
  });
  const customsStorePickerEnabled = getWebConfigValue(
    "enable_customs_store_picker"
  );
  return (
    <div className={styles.landing}>
      <div className={styles.catalog}>
        {types["mens"] && (
          <ClothingIcon
            img={"/images/mens2.jpg"}
            link={"/catalog/mens"}
            no_space={true}
            label={false}
          />
        )}
        {types["womens"] && (
          <ClothingIcon
            img={"/images/ladies2.jpg"}
            link={"/catalog/womens"}
            no_space={true}
            label={false}
          />
        )}
        {types["tshirts"] && (
          <ClothingIcon
            img={"/images/tshirts1.jpg"}
            link={"/catalog/tshirts"}
            no_space={true}
            label={false}
          />
        )}
        {types["hat"] && (
          <ClothingIcon
            img={"/images/hats.jpg"}
            link={"/catalog/hat"}
            no_space={true}
            label={false}
          />
        )}
        {types["office"] && (
          <ClothingIcon
            img={"/images/office.jpg"}
            link={"/catalog/office"}
            no_space={true}
            label={false}
          />
        )}
        {types["service"] && (
          <ClothingIcon
            img={"/images/service2.jpg"}
            link={"/catalog/service"}
            no_space={true}
            label={false}
          />
        )}
        {types["customs"] && (
          <ClothingIcon
            img={"/images/custom2.jpg"}
            link={
              stores.length && customsStorePickerEnabled
                ? "/stores"
                : "/catalog/customs"
            }
            no_space={true}
            label={false}
          />
        )}
        {types["sales"] && (
          <ClothingIcon
            img={"/images/sales2.jpg"}
            link={"/catalog/sales"}
            no_space={true}
            label={false}
          />
        )}
        {types["detail"] && (
          <ClothingIcon
            img={"/images/detail.jpg"}
            link={"/catalog/detail"}
            no_space={true}
            label={false}
          />
        )}
        {types["bodyshop"] && (
          <ClothingIcon
            img={"/images/bodyshop.jpg"}
            link={"/catalog/bodyshop"}
            no_space={true}
            label={false}
          />
        )}
        {types["parts"] && (
          <ClothingIcon
            img={"/images/parts.jpg"}
            link={"/catalog/parts"}
            no_space={true}
            label={false}
          />
        )}
        {types["accessory"] && (
          <ClothingIcon
            img={"/images/accessories2.jpg"}
            link={"/catalog/accessory"}
            no_space={true}
            label={false}
          />
        )}
      </div>
    </div>
  );
}
