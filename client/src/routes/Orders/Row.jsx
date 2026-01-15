import { useState, Fragment } from "react";
import moment from "moment";
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
import { getStore } from "guardian-common";
import OrderLineItem from "./OrderLineItem";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";

export default function Row({
  order,
  editClick,
  isAdmin,
  handleResendEmail,
  onOrderDeleted,
}) {
  const [open, setOpen] = useState(false);
  const [orderItems, setOrderItems] = useState(order.order || []);
  const [isResending, setIsResending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Logic for the main row column
  const isPaypal = order.paid === 1 && order.bypass === 0;

  const handleItemSave = async (updatedItem, index) => {
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

  // execute this logic after successful deletion confirmation
  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    setIsDeleting(true);
    const result = await delete_order(order.email, order.created_at);
    if (result.success) {
      onOrderDeleted(
        order.email,
        order.created_at,
        "Order deleted successfully!",
        "success"
      );
    } else {
      onOrderDeleted(
        order.email,
        order.created_at,
        `${result.error.message}`,
        "error"
      );
    }
    setIsDeleting(false);
  };

  const formattedDate = moment(parseInt(order.created_at)).format(
    "MMMM DD, YYYY"
  );
  const storeName =
    getStore(order.company_name, order.store) ?? order.company_name;

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

        {/* NEW MAIN COLUMN HERE */}
        <TableCell align="center">{isPaypal ? "Yes" : "No"}</TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          {/* Note: colSpan increased to 7 to account for the new column in main row */}
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
              <Table
                size="small"
                aria-label="purchases"
                sx={{ marginBottom: 2 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Color</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Embroidery
                    </TableCell>
                    {/* Removed "Used Paypal" header from here */}
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Customer PO
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>PO</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Est. Ship Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item, index) => (
                    <OrderLineItem
                      key={`${item.code}-${index}`}
                      item={item}
                      // Removed `order` prop
                      isAdmin={isAdmin}
                      onEditRequest={editClick}
                      onSave={(updatedData) =>
                        handleItemSave(updatedData, index)
                      }
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
