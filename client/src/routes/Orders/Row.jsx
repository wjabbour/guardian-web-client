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

export default function Row({ orders, editClick, isAdmin }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [po, setPo] = useState(orders[0].po || "N/A");
  const [customer_po, set_customer_po] = useState(
    orders[0].customer_po || "N/A"
  );
  const [est_ship_date, set_est_ship_date] = useState(
    orders[0].est_ship_date || "N/A"
  );

  function handleEstShipDate(e) {
    set_est_ship_date(e.target.value);
  }

  function handlePo(e) {
    setPo(e.target.value);
  }

  function handleCustomerPo(e) {
    set_customer_po(e.target.value);
  }

  async function updateHistoricalOrder() {
    editClick();
    if (!isAdmin) {
      return;
    }
    if (edit) {
      await update_historical_order(
        orders[0].email,
        orders[0].created_at,
        po,
        customer_po,
        est_ship_date
      );
      setEdit(false);
    } else {
      setEdit(true);
    }
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
        <TableCell>
          <SvgIcon
            style={{ cursor: "pointer" }}
            onClick={updateHistoricalOrder}
          >
            <EditIcon />
          </SvgIcon>
        </TableCell>
        <TableCell align="center">{orders[0].first_name}</TableCell>
        <TableCell align="center">{orders[0].last_name}</TableCell>
        <TableCell align="center">
          {moment(orders[0].created_at).format("MMMM DD, YYYY")}
        </TableCell>
        <TableCell align="center">{orders.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table style={{ marginBottom: "35px" }}>
                <TableHead>
                  <TableCell style={{fontWeight: 'bold'}}>Email</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Date</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>First Name</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Last Name</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Code</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Color</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Quantity</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Embroidery</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Size</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Store</TableCell>
                  <TableCell style={{fontWeight: 'bold'}}>Transaction ID</TableCell>
                </TableHead>
                <TableBody>
                  {orders.map((row, i) => (
                    <TableRow>
                      <TableCell scope="row">{row.email}</TableCell>
                      <TableCell width="10px" sx={{ whiteSpace: "nowrap" }}>
                        {moment(row.created_at).format("MMMM DD, YYYY")}
                      </TableCell>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.color}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.embroidery}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.store}</TableCell>
                      <TableCell>{row.transaction_id}</TableCell>
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
