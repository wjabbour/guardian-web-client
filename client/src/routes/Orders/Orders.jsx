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

export default function BasicTable() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");

  const seen = {};

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
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
        if (!order.bypass && !order.transaction_id) return;
        order.order.forEach((o) => {
          const date = new Date(parseInt(order.created_at));
          date.setSeconds(0);
          date.setHours(0);
          date.setMinutes(0);
          date.setMilliseconds(0);
          orders.push({
            email: order.email,
            first_name: order.first_name,
            last_name: order.last_name,
            code: o.code,
            color: o.color,
            quantity: o.quantity,
            embroidery: o.embroidery,
            size: o.size,
            store: order.store,
            transaction_id: order.transaction_id || "N/A",
            created_at: date,
          });
        });
      });

      orders.sort((a, b) => {
        const result = b.created_at.getTime() - a.created_at.getTime();
        if (result) return result;
        if (b.last_name.toUpperCase() < a.last_name.toUpperCase()) {
          return 1;
        } else if (b.last_name.toUpperCase() > a.last_name.toUpperCase()) {
          return -1;
        } else {
          return 0;
        }
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
              <TableCell>Email</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Embroidery</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Store</TableCell>
              <TableCell align="right">Transaction ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  td: {
                    borderTop: () => {
                      if (seen[row.created_at.toDateString()]) {
                        return 0;
                      } else {
                        seen[row.created_at.toDateString()] = 1;
                        return 2;
                      }
                    },
                  },
                }}
              >
                <TableCell scope="row">{row.email}</TableCell>
                <TableCell
                  align="right"
                  width="10px"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {row.created_at.toDateString()}
                </TableCell>
                <TableCell align="right">{row.first_name}</TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.embroidery}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.store}</TableCell>
                <TableCell align="right">{row.transaction_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
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
