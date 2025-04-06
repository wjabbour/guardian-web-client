import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { getConfigValue } from "../../lib/config";
import { getDomainAwarePath } from "../../lib/utils";

export default function Navbar(props) {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div
        className="absolute top-5 left-5 flex justify-center border-solid border-2 border-blue-700 rounded-[18px] w-[145px] cursor-pointer"
        onClick={() => navigate(getDomainAwarePath("/orders"))}
      >
        <div className={styles.cart}>View Orders</div>
      </div>
      <div
        className={`${styles.container} ${styles.cart__container}`}
        onClick={() => navigate(getDomainAwarePath("/cart"))}
      >
        <div className={styles.cart}>
          Cart ({Object.keys(props.cart).length})
        </div>
      </div>
      <div className={styles.guardian}>
        <img
          className={styles.logo}
          src={"/images/guardian.png"}
          onClick={() => navigate("/")}
        ></img>
      </div>
      <div className={styles.stivers}>
        <img
          className={styles.logo}
          src={`/images/${getConfigValue("company_logo")}`}
          onClick={() => navigate("/")}
        ></img>
      </div>
    </div>
  );
}
