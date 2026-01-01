import React, { useMemo } from "react";
import styles from "./Landing.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { getWebCatalog, getWebConfigValue } from "guardian-common";

interface CategoryConfig {
  id: string;
  img: string;
  defaultLink: string;
  label?: string;
}

const CATEGORIES: CategoryConfig[] = [
  { id: "mens", img: "/images/mens2.jpg", defaultLink: "/catalog/mens" },
  { id: "womens", img: "/images/ladies2.jpg", defaultLink: "/catalog/womens" },
  {
    id: "tshirts",
    img: "/images/tshirts1.jpg",
    defaultLink: "/catalog/tshirts",
  },
  { id: "hat", img: "/images/hats.jpg", defaultLink: "/catalog/hat" },
  { id: "office", img: "/images/office.jpg", defaultLink: "/catalog/office" },
  {
    id: "service",
    img: "/images/service2.jpg",
    defaultLink: "/catalog/service",
  },
  {
    id: "customs",
    img: "/images/custom2.jpg",
    defaultLink: "/catalog/customs",
  },
  { id: "sales", img: "/images/sales2.jpg", defaultLink: "/catalog/sales" },
  { id: "detail", img: "/images/detail.jpg", defaultLink: "/catalog/detail" },
  {
    id: "bodyshop",
    img: "/images/bodyshop.jpg",
    defaultLink: "/catalog/bodyshop",
  },
  { id: "parts", img: "/images/parts.jpg", defaultLink: "/catalog/parts" },
  {
    id: "accessory",
    img: "/images/accessories2.jpg",
    defaultLink: "/catalog/accessory",
  },
];

export default function Landing() {
  const catalog = getWebCatalog();
  const stores = getWebConfigValue("stores") || [];
  const customsStorePickerEnabled = getWebConfigValue(
    "enable_customs_store_picker"
  );

  const activeTypes = useMemo(() => {
    const types = new Set<string>();
    catalog.forEach((item) => types.add(item.type));
    return types;
  }, [catalog]);

  const getCategoryLink = (cat: CategoryConfig): string => {
    if (
      cat.id === "customs" &&
      stores.length > 0 &&
      customsStorePickerEnabled
    ) {
      return "/stores";
    }
    return cat.defaultLink;
  };

  return (
    <div className={styles.landing}>
      <div className={styles.catalog}>
        {CATEGORIES.map((cat) => {
          if (!activeTypes.has(cat.id)) return null;

          return (
            <ClothingIcon
              key={cat.id}
              img={cat.img}
              link={getCategoryLink(cat)}
              no_space={true}
              label={false}
            />
          );
        })}
      </div>
    </div>
  );
}
