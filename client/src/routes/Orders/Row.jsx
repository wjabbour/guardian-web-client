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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { update_historical_order } from "../../lib/http";
import { getStore } from "guardian-common";
import OrderLineItem from "./OrderLineItem";

export default function Row({ order, editClick, isAdmin }) {
  const [open, setOpen] = useState(false);
  const [orderItems, setOrderItems] = useState(order.order || []);

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
    </Fragment>
  );
}
