import styles from "./Checkout.module.scss";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getConfigValue } from "../../lib/config";
import {
  calculate_item_count,
  calculate_item_price,
  getDomainAwarePath,
} from "../../lib/utils";
import * as http from "../../lib/http";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";

export default function Checkout() {
  const paypalRef = useRef(null);
  const navigate = useNavigate();
  const [script_loaded, set_script_loaded] = useState(false);
  const [cart, set_cart] = useOutletContext();
  const [store, set_store] = useState("");
  const first_name_ref = useRef(null);
  const last_name_ref = useRef(null);
  const email_ref = useRef(null);
  const store_ref = useRef(null);
  const customer_po_ref = useRef(null);
  const [, set_first_name] = useState("");
  const [, set_last_name] = useState("");
  const [, set_email] = useState("");
  const [, set_code] = useState("");
  const [, set_customer_po] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [bypass_paypal, set_bypass_paypal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const isPayPalSupported = getConfigValue("paypal_not_supported") !== true;

  useEffect(() => {
    if (window.paypal && !script_loaded) {
      renderButtons();
      set_script_loaded(true);
    }
  }, []);

  function build_request_body() {
    const first_name = first_name_ref.current.value;
    const last_name = last_name_ref.current.value;
    const email = email_ref.current.value;
    const store = store_ref.current.value;
    const customer_po = customer_po_ref.current.value;

    return { first_name, last_name, store, email, cart, customer_po };
  }

  const bypassPaypalCheckout = async () => {
    const req_body = build_request_body();
    req_body["bypassPaypal"] = true;
    setLoading(true);
    const response = await http.create_order(req_body);
    if (response.error) {
      setErrorSnackbarText(response.error.message);
      setErrorSnackbarOpen(true);
      setLoading(false);
      return "";
    } else {
      setSnackbarText("Order placed successfully");
      setSnackbarOpen(true);
      first_name_ref.current.value = "";
      last_name_ref.current.value = "";
      email_ref.current.value = "";
      store_ref.current.value = "";
      customer_po_ref.current.value = "";
      navigate(getDomainAwarePath("/success"), {
        state: {
          cart: { ...cart },
        },
      });
      set_cart({});
    }

    setLoading(false);
  };

  const renderButtons = () => {
    window.paypal
      .Buttons({
        createOrder: async function () {
          const response = await http.create_order(build_request_body());
          if (response.error) {
            setErrorSnackbarText(response.error.message);
            setErrorSnackbarOpen(true);
            return "";
          } else {
            sessionStorage.setItem(
              "order_id",
              response.success?.data?.order_id
            );
            return response.success?.data?.order_id;
          }
        },
        onError: function () {
          setErrorSnackbarText("Encountered error during checkout");
          setErrorSnackbarOpen(true);
        },
        onApprove: async function () {
          const response = await http.capture_order(
            sessionStorage.getItem("order_id")
          );
          if (response.error) {
            setErrorSnackbarText(response.error.message);
            setErrorSnackbarOpen(true);
            return "";
          } else {
            setSnackbarText("Order placed successfully");
            setSnackbarOpen(true);
            first_name_ref.current.value = "";
            last_name_ref.current.value = "";
            email_ref.current.value = "";
            store_ref.current.value = "";
            customer_po_ref.current.value = "";

            navigate(getDomainAwarePath("/success"), {
              state: {
                cart: { ...cart },
              },
            });
            set_cart({});
          }
        },
        style: {
          shape: "rect",
          color: "gold",
          layout: "vertical",
          tagline: false,
        },
        onError: (error) => {
          console.warn(error);
        },
      })
      .render(paypalRef.current);
  };

  const handle_first_name = (event) => {
    set_first_name(event.target.value);
  };

  const handle_last_name = (event) => {
    set_last_name(event.target.value);
  };

  const handle_email = (event) => {
    set_email(event.target.value);
  };

  const handle_code = (event) => {
    set_code(event.target.value.toUpperCase());
    if (
      getConfigValue("bypass_codes").includes(event.target.value.toUpperCase())
    ) {
      set_bypass_paypal(true);
    }
  };

  const handle_store = (event) => {
    set_store(event.target.value);
  };

  const handle_customer_po = (event) => {
    set_customer_po(event.target.value);
  };

  function handleSnackbarClose() {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  }

  return (
    <div className={styles.container}>
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
      <div className={styles.card}>
        <TextField
          inputRef={first_name_ref}
          className={styles.text__field}
          onChange={handle_first_name}
          id=""
          label="First Name"
          variant="filled"
        />
        <TextField
          inputRef={last_name_ref}
          className={styles.text__field}
          onChange={handle_last_name}
          id=""
          label="Last Name"
          variant="filled"
        />
        <TextField
          inputRef={email_ref}
          className={styles.text__field}
          onChange={handle_email}
          id=""
          label="Email"
          variant="filled"
        />
        <TextField
          inputRef={customer_po_ref}
          className={styles.text__field}
          onChange={handle_customer_po}
          id=""
          label="Customer PO"
          variant="filled"
        />
        <FormControl
          inputRef={store_ref}
          id={styles.move}
          className={styles.text__field}
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel>Store</InputLabel>
          <Select inputRef={store_ref} value={store} onChange={handle_store}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getConfigValue("stores").map((store) => {
              return <MenuItem value={store}>{store}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          className={styles.text__field}
          onChange={handle_code}
          label="Code"
          variant="filled"
        />
        <div className={styles.subtotal__container}>
          <div className={styles.subtotal}>
            Subtotal ({calculate_item_count(cart)} items): $
            {calculate_item_price(cart)}
          </div>
          <div className={(bypass_paypal || !isPayPalSupported) ? "hidden" : ""}>
            <div className={styles.checkout__container} ref={paypalRef}></div>
            <div className="absolute top-2 left-[310px]">
              <Tooltip
                title={
                  <Typography variant="h6" gutterBottom>
                    1. Please disable Adblock or manualy allow the PayPal window
                    to open.
                    <br></br>
                    <br></br>
                    2. Please do not refresh this page as you are entering your
                    payment info.
                  </Typography>
                }
              >
                <IconButton>
                  <InfoOutlinedIcon></InfoOutlinedIcon>
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div
            className={`${styles.bypass__paypal__checkout} ${
              !(bypass_paypal || !isPayPalSupported) ? styles.hidden : styles.visible
            }`}
          >
            <LoadingButton
              loading={isLoading}
              onClick={bypassPaypalCheckout}
              variant="contained"
              disabled={!bypass_paypal}
            >
              Checkout
            </LoadingButton>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        message={snackbarText}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
