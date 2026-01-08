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
} from "@mui/material";
import Row from "./Row";
import PasswordEntryDialog from "../../components/PasswordEntryDialog";
import StoreSelect from "./StoreSelect";
import { getStore, getStoreCode } from "guardian-common";

// 1. Define Types for better safety
interface Order {
  id: string | number; // Assuming an ID exists
  created_at: number; // or string, depending on backend
  paid: number;
  company_name: string;
  store: string;
  [key: string]: any; // Catch-all for other props passed to Row
}

interface ApiResponse {
  success?: {
    data: {
      orders: Order[];
    };
  };
  error?: {
    message: string;
  };
}

export default function OrdersTable() {
  // 2. State Management
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // UI State
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Data Fetching
  useEffect(() => {
    let isMounted = true;

    http.retrieve_orders().then((res: ApiResponse) => {
      if (!isMounted) return;
      setIsLoading(false);

      if (!res.success) {
        setErrorSnackbarText(res.error?.message || "Failed to load orders");
        setErrorSnackbarOpen(true);
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

  // 4. Derived State (Performance Optimization)
  // Calculate options only when orders change, not on every render
  const storeOptions = useMemo(() => {
    return [
      ...new Set(orders.map((o) => getStore(o.company_name ?? "", o.store))),
    ];
  }, [orders]);

  // Filter logic handled via useMemo rather than duplicated state
  const displayedOrders = useMemo(() => {
    if (!selectedStore) return orders;

    // Guard clause in case orders are empty
    if (orders.length === 0) return [];

    const code = getStoreCode(orders[0].company_name, selectedStore);
    return orders.filter((i) => i.store === code);
  }, [orders, selectedStore]);

  // 5. Handlers
  const handleEditClick = useCallback(() => {
    if (!isAdmin) {
      setIsModalOpen(true);
    }
  }, [isAdmin]);

  const handleFilterChange = (store: string) => {
    setSelectedStore(store || null);
  };

  const handlePasswordChange = (password: string) => {
    // SECURITY WARNING: This is still client-side validation.
    // Ideally, this should verify against an API endpoint.
    if (password === "Louis123") {
      setIsAdmin(true);
      setIsModalOpen(false);
    } else {
      setErrorSnackbarText("Incorrect password");
      setErrorSnackbarOpen(true);
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
              <TableCell align="center">PO</TableCell>
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Order Name</TableCell>
              <TableCell align="center">Store</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order, index) => (
                <Row
                  // 6. Critical: Add a unique Key
                  key={order.id || index}
                  order={order}
                  editClick={handleEditClick}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setErrorSnackbarOpen(false)}>
          {errorSnackbarText}
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
