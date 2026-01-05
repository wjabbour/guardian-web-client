import styles from "./Catalog.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import LogoPreview from "./LogoPreview";
import { getWebCatalog, getWebConfigValue } from "guardian-common";

export default function ClothingCatalog() {
  const location = useLocation();
  const params = useParams();
  const stores = getWebConfigValue("stores");
  const [catalogType, setCatalogType] = useState("mens");
  const [catalog, setCatalog] = useState(
    getWebCatalog().filter((item) => item.type === catalogType)
  );
  const customsStorePickerEnabled = getWebConfigValue(
    "enable_customs_store_picker"
  );

  useEffect(() => {
    if (location.pathname.includes("/mens")) {
      setCatalogType("mens");
    } else if (location.pathname.includes("/hat")) {
      setCatalogType("hat");
    } else if (location.pathname.includes("/accessory")) {
      setCatalogType("accessory");
    } else if (location.pathname.includes("/tshirts")) {
      setCatalogType("tshirts");
    } else if (location.pathname.includes("/detail")) {
      setCatalogType("detail");
    } else if (location.pathname.includes("/bodyshop")) {
      setCatalogType("bodyshop");
    } else if (location.pathname.includes("/parts")) {
      setCatalogType("parts");
    } else if (location.pathname.includes("/service")) {
      setCatalogType("service");
    } else if (location.pathname.includes("/customs")) {
      setCatalogType("customs");
    } else if (location.pathname.includes("/office")) {
      setCatalogType("office");
    } else if (location.pathname.includes("/sales")) {
      setCatalogType("sales");
    } else if (location.pathname.includes("/womens")) {
      setCatalogType("womens");
    }
  }, [location.pathname]);

  useEffect(() => {
    const newCatalog = getWebCatalog().filter(
      (item) => item.type === catalogType
    );

    setCatalog(newCatalog);
  }, [catalogType]);

  return (
    <div className={styles.landing}>
      {location.pathname.includes("accessories") && (
        <div className={styles.text__wrapper}>
          <p>Must order at least 12 units</p>
        </div>
      )}
      <div className={styles.grid}>
        {catalog.map((item) => {
          // dont filter out customs items if there are no stores for this company (some companies have no stores for some reason)
          if (
            stores.length &&
            item.type === "customs" &&
            customsStorePickerEnabled && // there will be no store pathParam to filter by in this case
            !(item.supportedStores ?? []).includes(params.storeCode)
          ) {
            return null;
          }
          return (
            <ClothingIcon
              link={`/item/${item.code}`}
              img={`/images/${item.code}.jpg`}
              label={item.name}
            />
          );
        })}
      </div>
      <LogoPreview catalogType={catalogType} />
    </div>
  );
}
