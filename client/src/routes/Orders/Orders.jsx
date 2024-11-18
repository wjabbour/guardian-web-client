import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as http from "../../lib/http";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Row from "./Row";
import moment from "moment";

export default function BasicTable() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  }

  function rows() {
    return orders.map((order) => {
      return <Row orders={order} />;
    });
  }

  useEffect(() => {
    http.retrieve_orders().then((res) => {
      if (!res.success) {
        setErrorSnackbarText(res.error.message);
        setErrorSnackbarOpen(true);
        return;
      }

      const orders = [];

      res.success.data.orders.forEach((order) => {
        const cart = [];
        if (!order.bypass && !order.transaction_id) return;
        order.order.forEach((o) => {
          cart.push({
            email: order.email,
            first_name: order.first_name,
            last_name: order.last_name,
            po: order.po,
            est_ship_date: order.est_ship_date,
            code: o.code,
            color: o.color,
            quantity: o.quantity,
            embroidery: o.embroidery,
            size: o.size,
            store: order.store,
            transaction_id: order.transaction_id || "N/A",
            created_at: parseInt(order.created_at),
          });
        });

        orders.push(cart);
      });

      orders.sort((a, b) => {
        return moment(b[0].created_at).isBefore(moment(a[0].created_at));
      });

      setOrders(orders);
    });
  }, []);
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Items Purchased</TableCell>
              <TableCell align="center">PO</TableCell>
              <TableCell align="center">Est Ship Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows()}</TableBody>
        </Table>
      </TableContainer>
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
