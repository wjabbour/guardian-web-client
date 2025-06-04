import styles from "./Catalog.module.scss";
import ClothingIcon from "../../components/ClothingIcon/ClothingIcon";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoPreview from "./LogoPreview";
import { getDomainAwarePath } from "../../lib/utils";
import { getWebCatalog } from "guardian-common";

export default function ClothingCatalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [catalogType, setCatalogType] = useState("customs");
  const [catalog, setCatalog] = useState(
    getWebCatalog().filter((item) => item.type === catalogType)
  );

  useEffect(() => {
    if (location.pathname.includes("/mens")) {
      setCatalogType("mens");
    } else if (location.pathname.includes("/hats")) {
      setCatalogType("hat");
    } else if (location.pathname.includes("/accessory")) {
      setCatalogType("accessory");
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
  }, []);

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
        {catalog.map((item) => {
          if (
            item.type === "customs" &&
            !(item.supportedStores ?? []).includes(params.storeCode)
          ) {
            return null;
          }
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
      <LogoPreview embroideryType={catalogType} />
    </div>
  );
}
