import { useEffect, useState, useMemo, useCallback, useContext } from "react";
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
  TextField,
} from "@mui/material";
import Row from "./Row";
import PasswordEntryDialog from "../../components/PasswordEntryDialog/PasswordEntryDialog";
import StoreSelect from "./StoreSelect";
import { getStore, getStoreCode } from "guardian-common";
import { UserContext } from "../../root";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export default function OrdersTable() {
  // Get user context to check admin role
  const userContext = useContext(UserContext);
  const isAdmin = userContext?.role === "admin";

  // --- State Management ---
  const [orders, setOrders] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // UI State
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    let isMounted = true;

    http.retrieve_orders().then((res) => {
      if (!isMounted) return;
      setIsLoading(false);

      if (!res.success) {
        setSnackbar({
          open: true,
          message: res.error?.message || "Failed to load orders",
          severity: "error",
        });
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
      ...new Set(
        orders.map((o) => getStore(o.company_name ?? "", o.store)).filter(Boolean)
      ),
    ] as string[];
  }, [orders]);

  const displayedOrders = useMemo(() => {
    let filtered = orders;

    if (selectedStore && orders.length > 0) {
      const code = getStoreCode(orders[0].company_name, selectedStore);
      filtered = filtered.filter((i) => i.store === code);
    }

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      filtered = filtered.filter((o) =>
        `${o.first_name} ${o.last_name}`.toLowerCase().includes(q) ||
        (o.store ?? "").toLowerCase().includes(q) ||
        (o.order_id ?? "").toLowerCase().includes(q) ||
        (o.transaction_id ?? "").toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [orders, selectedStore, searchText]);

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

  const handleOrderDeleted = useCallback(
    (email, createdAt, message, severity) => {
      setOrders((prevOrders) =>
        prevOrders.filter(
          (o) => !(o.email === email && o.created_at === createdAt)
        )
      );
      setSnackbar({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const handlePasswordChange = async (password) => {
    const result = await http.login(password);
    if (result.success) {
      // Refresh the page to update user context with new role
      window.location.reload();
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
    <div>
      <div className="ml-4 flex gap-4 items-center">
        <StoreSelect stores={storeOptions} onChange={handleFilterChange} />
        <TextField
          size="small"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 380 }}
        />
      </div>

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
                Order ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                PayPal Transaction ID
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
                  onOrderDeleted={handleOrderDeleted}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
        onSubmit={handlePasswordChange}
      />
    </div>
  );
}
