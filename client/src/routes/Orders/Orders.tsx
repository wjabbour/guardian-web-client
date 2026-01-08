import { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./Orders.module.scss";
import * as http from "../../lib/http";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Typography,
  AlertColor,
} from "@mui/material";
import Row from "./Row";
import PasswordEntryDialog from "../../components/PasswordEntryDialog";
import StoreSelect from "./StoreSelect";
import { getStore, getStoreCode } from "guardian-common";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export default function OrdersTable() {
  // --- State Management ---
  const [orders, setOrders] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // UI State
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: "", severity: "info" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    let isMounted = true;

    http.retrieve_orders().then((res) => {
      if (!isMounted) return;
      setIsLoading(false);

      if (!res.success) {
        setSnackbar({ open: true, message: res.error?.message || "Failed to load orders", severity: "error" });
        return;
      }

      const rawOrders = res.success.data.orders;

      // Filter unpaid and sort by date descending
      const processedOrders = rawOrders
        .filter((order) => order.paid !== 0)
        .sort((a, b) => b.created_at - a.created_at);

      setOrders(processedOrders);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // --- Derived State (Performance) ---
  const storeOptions = useMemo(() => {
    return [
      ...new Set(orders.map((o) => getStore(o.company_name ?? "", o.store))),
    ];
  }, [orders]);

  const displayedOrders = useMemo(() => {
    if (!selectedStore) return orders;
    if (orders.length === 0) return [];

    const code = getStoreCode(orders[0].company_name, selectedStore);
    return orders.filter((i) => i.store === code);
  }, [orders, selectedStore]);

  // --- Handlers ---
  const handleEditClick = useCallback(() => {
    if (!isAdmin) {
      setIsModalOpen(true);
    }
  }, [isAdmin]);

  const handleResendEmail = useCallback(async (email, created_at) => {
    const result = await http.resend_order_email(email, created_at);
    if (result.success) {
      setSnackbar({
        open: true,
        message: "Order email has been resent successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: `Failed to resend email: ${result.error.message}`,
        severity: "error",
      });
    }
    return result.success;
  }, []);

  const handleFilterChange = (store) => {
    setSelectedStore(store || null);
  };

  const handlePasswordChange = (password) => {
    // SECURITY NOTE: This validation should ideally happen on the server.
    if (password === "Louis123") {
      setIsAdmin(true);
      setIsModalOpen(false);
    } else {
      setSnackbar({
        open: true,
        message: "Incorrect password",
        severity: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <StoreSelect stores={storeOptions} onChange={handleFilterChange} />

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                PO
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Order Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Order Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Store
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Paid w/ Paypal
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order, index) => (
                <Row
                  // Using ID if available, falling back to index to prevent render bugs
                  key={order.id || index}
                  order={order}
                  editClick={handleEditClick}
                  isAdmin={isAdmin}
                  handleResendEmail={handleResendEmail}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" py={2}>
                    No orders found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <PasswordEntryDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
}
