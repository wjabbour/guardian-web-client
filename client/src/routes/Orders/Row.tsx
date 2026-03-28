import { useState, Fragment } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { update_historical_order, delete_order } from "../../lib/http";
import { getStore, Order, CartItem } from "guardian-common";
import OrderLineItem from "./OrderLineItem";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";

interface Props {
  order: Order;
  editClick: () => void;
  isAdmin: boolean;
  handleResendEmail: (email: string, created_at: string) => Promise<void>;
  onOrderDeleted: (email: string, created_at: string, message: string, severity: "success" | "error") => void;
}

export default function Row({ order, editClick, isAdmin, handleResendEmail, onOrderDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<CartItem[]>(order.order || []);
  const [isResending, setIsResending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const paypalTransactionId = order.transaction_id || "N/A";

  const handleItemSave = async (updatedItem: CartItem, index: number) => {
    const newItems = [...orderItems];
    newItems[index] = updatedItem;

    try {
      await update_historical_order(order.email, order.created_at, newItems);
      setOrderItems(newItems);
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const onResendClick = async () => {
    if (!isAdmin) {
      editClick();
      return;
    }

    setIsResending(true);
    await handleResendEmail(order.email, order.created_at);
    setIsResending(false);
  };

  const onDeleteClick = () => {
    if (!isAdmin) {
      editClick();
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    setIsDeleting(true);
    const result = await delete_order(order.email, order.created_at);
    if (result.success) {
      onOrderDeleted(order.email, order.created_at, "Order deleted successfully!", "success");
    } else {
      onOrderDeleted(order.email, order.created_at, `${result.error.message}`, "error");
    }
    setIsDeleting(false);
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(parseInt(order.created_at));
  const storeName = getStore(order.company_name, order.store) ?? order.company_name;

  return (
    <Fragment>
      <TableRow
        hover
        onClick={() => setOpen(!open)}
        sx={{
          "& > *": { borderBottom: "unset" },
          cursor: "pointer",
          userSelect: "none",
          outline: "none",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{order.customer_po || "N/A"}</TableCell>
        <TableCell align="center">{formattedDate}</TableCell>
        <TableCell align="center">{`${order.first_name} ${order.last_name}`}</TableCell>
        <TableCell align="center">{storeName}</TableCell>
        <TableCell align="center">{order.order_id || "N/A"}</TableCell>
        <TableCell align="center">{paypalTransactionId}</TableCell>
        <TableCell align="right">
          {isAdmin && (
            <>
              <Tooltip title="Resend order confirmation email">
                <span>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResendClick();
                    }}
                    disabled={isResending}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {isResending ? <CircularProgress size={24} /> : "Resend Email"}
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Delete order">
                <span>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClick();
                    }}
                    disabled={isDeleting}
                    sx={{ whiteSpace: "nowrap", ml: 1 }}
                  >
                    {isDeleting ? <CircularProgress size={24} /> : "Delete"}
                  </Button>
                </span>
              </Tooltip>
            </>
          )}
        </TableCell>
      </TableRow>

      <TableRow sx={{ backgroundColor: "#fdf1bb" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              margin={1}
              sx={{
                userSelect: "none",
                caretColor: "transparent",
                outline: "none",
                "&:focus": { outline: "none" },
                "& input": { caretColor: "auto" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases" sx={{ marginBottom: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Color</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Embroidery</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Customer PO</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>PO</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Est. Ship Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item, index) => (
                    <OrderLineItem
                      key={`${item.code}-${index}`}
                      item={item}
                      isAdmin={isAdmin}
                      onEditRequest={editClick}
                      onSave={(updatedData) => handleItemSave(updatedData, index)}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ConfirmationDialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure?"
        message="This action is permanent and cannot be undone."
      />
    </Fragment>
  );
}
