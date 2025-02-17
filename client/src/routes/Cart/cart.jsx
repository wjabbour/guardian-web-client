import styles from "./Cart.module.scss";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { calculate_item_count, calculate_item_price } from "../../lib/utils";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getConfigValue } from "../../lib/config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const apparel_types = ["mens", "womens"];
export default function Cart() {
  const navigate = useNavigate();
  const [cart, set_cart] = useOutletContext();
  const cart_keys = Object.keys(cart);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  }
  /*
    we enforce that tameron employees must order either 0 or 12 >= items of apparel
  */
  function checkout() {
    const MIN = 0;
    const MAX = 12;
    let apparel_count = 0;
    if (getConfigValue("minimum_apparel_order")) {
      console.log(cart);
      Object.values(cart).forEach((item) => {
        if (apparel_types.includes(item.type)) apparel_count += item.quantity;
      });
    }

    if (apparel_count > MIN && apparel_count < MAX) {
      setErrorSnackbarOpen(true);
      setErrorSnackbarText("Must order at least 12 apparel items");
    } else {
      navigate("/checkout");
    }
  }

  console.log(cart);

  return (
    <div className={styles.container}>
      <div
        className={styles.back__button}
        onClick={() => {
          navigate("/");
        }}
      >
        <SvgIcon fontSize="inherit">
          <ArrowBackIcon />
        </SvgIcon>
      </div>
      <div className={styles.card}>
        {Object.keys(cart).length === 0 && (
          <div className={styles.no__items}>
            You haven't added any items to your cart yet.
          </div>
        )}
        <div className={styles.scrollable}>
          {cart_keys.map((k) => {
            return (
              <div key={k} className={styles.line__item}>
                <div className={styles.information__panel}>
                  <div className={styles.name}>{cart[k].name}</div>
                  <div className={styles.price}>${cart[k].price} each</div>
                  <div className={styles.color__title}>
                    Color: {cart[k].color}
                  </div>
                  {cart[k].embroidery && (
                    <div className={styles.color__title}>
                      Embroidery: {cart[k].embroidery}
                    </div>
                  )}
                  {!["accessory", "customs"].includes(cart[k].type) && (
                    <div className={styles.color__title}>
                      Placement: {cart[k].placement}
                    </div>
                  )}
                  {!["customs"].includes(cart[k].type) && (
                    <div className={styles.size}>Size: {cart[k].size}</div>
                  )}
                  <div className={styles.quantity}>
                    Quantity: {cart[k].quantity}
                  </div>

                  <DeleteIcon
                    style={{ color: "#C70000" }}
                    onClick={() => {
                      delete cart[k];
                      sessionStorage.setItem("cart", JSON.stringify(cart));
                      set_cart({ ...cart });
                    }}
                  />
                </div>
                {cart[k].type !== "customs" &&
                  getConfigValue("render_logo_preview") && (
                    <div className={styles.image__container}>
                      <img
                        src={`/images/${cart[k].embroidery.toLowerCase()}.png`}
                      ></img>
                    </div>
                  )}
                <div className={styles.image__container}>
                  <img
                    className={`${
                      ["1240", "2240", "1640"].includes(cart[k].code)
                        ? styles.small
                        : ""
                    }`}
                    src={`/images/${cart[k].code}_${cart[k].color
                      .split(" ")
                      .join("_")
                      .toLowerCase()}.jpg`}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.subtotal__container}>
          <div className={styles.info}>
            <div className={styles.subtotal}>
              Subtotal ({calculate_item_count(cart)} items): $
              {calculate_item_price(cart)}
            </div>
            <div className={styles.checkout__container} onClick={checkout}>
              <p>Proceed to checkout</p>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">{errorSnackbarText}</Alert>
      </Snackbar>
    </div>
  );
}
