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
import PasswordEntryDialog from "../../components/PasswordEntryDialog";
import { getDomainAwarePath } from "../../lib/utils";

export default function BasicTable() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function editClick() {
    if (!isAdmin) {
      setIsModalOpen(true);
    }
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  }

  function rows() {
    return orders.map((order) => {
      return <Row order={order} editClick={editClick} isAdmin={isAdmin} />;
    });
  }

  useEffect(() => {
    http.retrieve_orders().then((res) => {
      if (!res.success) {
        setErrorSnackbarText(res.error.message);
        setErrorSnackbarOpen(true);
        return;
      }

      const orders = res.success.data.orders;
      orders.sort((a, b) => {
        return b.created_at - a.created_at;
      });

      const paidOrders = orders.filter((order) => order.paid !== 0);
      setOrders(paidOrders);
    });
  }, []);

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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Order Name</TableCell>
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
      <PasswordEntryDialog
        isAdmin={isAdmin}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onPasswordChange={(password) => {
          if (password === "Louis123") {
            setIsAdmin(true);
            setIsModalOpen(false);
          }
        }}
      />
    </div>
  );
}
