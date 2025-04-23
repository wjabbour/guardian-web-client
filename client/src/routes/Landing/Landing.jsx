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
            img={"/images/mens1.jpg"}            
            link={"/catalog/mens"}
            no_space={true}
          />
        )}
        {types["womens"] && (
          <ClothingIcon
            img={"/images/ladies1.jpg"}            
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
        {types["customs"] && (
          <ClothingIcon
            img={"/images/customs.jpg"}                                 
            link={"/catalog/customs"}
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
        {types["detail"] && (
          <ClothingIcon
            img={"/images/detail.jpg"}            
            link={"/catalog/detail"}
            no_space={true}
          />
        )}
        {types["bodyshop"] && (
          <ClothingIcon
            img={"/images/bodyshop.jpg"}            
            link={"/catalog/bodyshop"}
            no_space={true}
          />
        )}
        {types["parts"] && (
          <ClothingIcon
            img={"/images/parts.jpg"}            
            link={"/catalog/parts"}
            no_space={true}
          />
        )}
        {types["accessory"] && (
          <ClothingIcon
            img={"/images/accessories.jpg"}            
            link={"/catalog/accessory"}
            no_space={false}
          />
        )}        
      </div>
    </div>
  );
}
