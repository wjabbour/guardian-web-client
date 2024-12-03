import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, Fragment } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { SvgIcon } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import { update_historical_order } from "../../lib/http";

export default function Row({ order, editClick, isAdmin }) {
  const cart = [];
  order.order.forEach((order) => {
    cart.push({ ...order });
  });

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [po, setPo] = useState("N/A");
  const [customer_po, set_customer_po] = useState("N/A");
  const [est_ship_date, set_est_ship_date] = useState("N/A");
  const [last_clicked_idx, set_last_clicked_idx] = useState(null);

  function handleEstShipDate(e) {
    set_est_ship_date(e.target.value);
  }

  function handlePo(e) {
    setPo(e.target.value);
  }

  function handleCustomerPo(e) {
    set_customer_po(e.target.value);
  }

  async function handleEditClick(e, i) {
    // confirming the edit
    // set the fields first before popping password modal so that values can be passed to textfield on next render
    if (edit) {
      order.order[i].po = po;
      order.order[i].customer_po = customer_po;
      order.order[i].est_ship_date = est_ship_date;
      await update_historical_order(order.email, order.created_at, order.order);
    }
    set_last_clicked_idx(i);
    setPo(cart[i].po);
    set_est_ship_date(cart[i].est_ship_date);
    set_customer_po(cart[i].customer_po);
    editClick();
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
    if (!isAdmin) return;
  }

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{order.email}</TableCell>
        <TableCell align="center">{order.first_name}</TableCell>
        <TableCell align="center">{order.last_name}</TableCell>
        <TableCell align="center">
          {moment(parseInt(order.created_at)).format("MMMM DD, YYYY")}
        </TableCell>
        <TableCell align="center">{`${cart[0].quantity} x ${cart[0].color} ${cart[0].code}`}</TableCell>
        <TableCell align="center">{cart.length}</TableCell>
        <TableCell align="center">{order.store}</TableCell>
        <TableCell align="center">{order.transaction_id || "N/A"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table style={{ marginBottom: "35px" }}>
                <TableHead>
                  <TableCell />
                  <TableCell style={{ fontWeight: "bold" }}>Code</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Color</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Embroidery
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Size</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Customer PO
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>PO</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Est. Ship Date
                  </TableCell>
                </TableHead>
                <TableBody>
                  {cart.map((row, i) => (
                    <TableRow>
                      <TableCell>
                        <SvgIcon
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleEditClick(e, i)}
                        >
                          <EditIcon />
                        </SvgIcon>
                      </TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.color}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.embroidery}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      {edit && isAdmin && last_clicked_idx === i && (
                        <Fragment>
                          <TableCell>
                            <TextField
                              value={customer_po}
                              onChange={handleCustomerPo}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={po}
                              onChange={handlePo}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={est_ship_date}
                              onChange={handleEstShipDate}
                            ></TextField>
                          </TableCell>
                        </Fragment>
                      )}

                      {(!edit || i !== last_clicked_idx) && (
                        <Fragment>
                          <TableCell>{row.customer_po || "N/A"}</TableCell>
                          <TableCell>{row.po || "N/A"}</TableCell>
                          <TableCell>{row.est_ship_date || "N/A"}</TableCell>
                        </Fragment>
                      )}
                    </TableRow>
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
