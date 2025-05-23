import styles from "./Catalog.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Catalog } from "../../lib/catalog";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoPreview from "./LogoPreview";
import { getDomainAwarePath } from "../../lib/utils";

export default function ClothingCatalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const [available_catalog, set_catalog] = useState([]);
  const embroideryType = location.pathname.split('catalog/')[1];
  useEffect(() => {
    let inventory = [];
    if (location.pathname.includes("/catalog/womens")) {
      inventory = Catalog().filter((item) => item.type === "womens");
    } else if (location.pathname.includes("/catalog/hats")) {
      inventory = Catalog().filter((item) => item.type === "hat");
    } else if (location.pathname.includes("/catalog/accessory")) {
      inventory = Catalog().filter((item) => item.type === "accessory");
    } else if (location.pathname.includes("/catalog/detail")) {
      inventory = Catalog().filter((item) => item.type === "detail");
    } else if (location.pathname.includes("/catalog/bodyshop")) {
      inventory = Catalog().filter((item) => item.type === "bodyshop");
    } else if (location.pathname.includes("/catalog/parts")) {
      inventory = Catalog().filter((item) => item.type === "parts");
    } else if (location.pathname.includes("/catalog/service")) {
      inventory = Catalog().filter((item) => item.type === "service");
    } else if (location.pathname.includes("/catalog/customs")) {
      inventory = Catalog().filter((item) => item.type === "customs");
    } else if (location.pathname.includes("/catalog/office")) {
      inventory = Catalog().filter((item) => item.type === "office");
    } else if (location.pathname.includes("/catalog/sales")) {
      inventory = Catalog().filter((item) => item.type === "sales");
    } else if (location.pathname.includes("/catalog/mens")) {
      inventory = Catalog().filter((item) => item.type === "mens");
    }

    set_catalog(inventory);
  }, []);

  return (
    <div className={styles.landing}>
      {location.pathname.includes("accessories") && (
        <div className={styles.text__wrapper}>
          <p>Must order at least 12 units</p>
        </div>
      )}
      <div className={styles.grid}>
        <div
          className={styles.back__button}
          onClick={() => {
            navigate(getDomainAwarePath("/"));
          }}
        >
          <SvgIcon fontSize="inherit">
            <ArrowBackIcon />
          </SvgIcon>
        </div>
        {available_catalog.map((item) => {
          return (
            <div
              onClick={() => {
                navigate(getDomainAwarePath(`/item/${item.code}`));
              }}
              key={item.name}
            >
              <ClothingIcon
                img={`/images/${item.code}.jpg`}
                label={item.name}
              />
            </div>
          );
        })}
      </div>
      <LogoPreview embroideryType={embroideryType} />
    </div>
  );
}
