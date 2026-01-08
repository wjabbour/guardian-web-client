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
import { update_historical_order } from "../../lib/http";
import { getStore } from "guardian-common";
import OrderLineItem from "./OrderLineItem";

export default function Row({ order, editClick, isAdmin }) {
  const [open, setOpen] = useState(false);
  const [orderItems, setOrderItems] = useState(order.order || []);

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
          outline: "none", // Prevent focus outline
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
      </TableRow>

      <TableRow sx={{ backgroundColor: "#fdf1bb" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              margin={1}
              sx={{
                userSelect: "none",
                caretColor: "transparent", // Hides cursor on container
                outline: "none", // Hides focus ring
                "&:focus": { outline: "none" },
                "& input": { caretColor: "auto" }, // Restores cursor for inputs
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

                    {/* New Header */}
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Used Paypal
                    </TableCell>

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
                      order={order} // Passing the full order object
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
