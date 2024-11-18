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

export default function Row({ orders }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [po, setPo] = useState(orders[0].po || "N/A");
  const [est_ship_date, set_est_ship_date] = useState(
    orders[0].est_ship_date || "N/A"
  );

  function handleEstShipDate(e) {
    set_est_ship_date(e.target.value);
  }

  function handlePo(e) {
    setPo(e.target.value);
  }

  async function updateHistoricalOrder() {
    if (edit) {
      await update_historical_order(
        orders[0].email,
        orders[0].created_at,
        po,
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
        {edit && (
          <>
            <TableCell align="center">
              <Box>
                <TextField value={po} onChange={handlePo}></TextField>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box>
                <TextField
                  value={est_ship_date}
                  onChange={handleEstShipDate}
                ></TextField>
              </Box>
            </TableCell>
          </>
        )}
        {!edit && (
          <>
            <TableCell align="center">{po}</TableCell>
            <TableCell align="center">
              {est_ship_date}
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: "none" }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{ marginLeft: "10%" }}>
              <Table>
                <TableHead>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Code</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Embroidery</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Store</TableCell>
                  <TableCell align="right">Transaction ID</TableCell>
                </TableHead>
                <TableBody>
                  {orders.map((row, i) => (
                    <TableRow>
                      <TableCell scope="row">{row.email}</TableCell>
                      <TableCell
                        align="right"
                        width="10px"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {moment(row.created_at).format('MMMM DD, YYYY')}
                      </TableCell>
                      <TableCell align="right">{row.first_name}</TableCell>
                      <TableCell align="right">{row.last_name}</TableCell>
                      <TableCell align="right">{row.code}</TableCell>
                      <TableCell align="right">{row.color}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.embroidery}</TableCell>
                      <TableCell align="right">{row.size}</TableCell>
                      <TableCell align="right">{row.store}</TableCell>
                      <TableCell align="right">{row.transaction_id}</TableCell>
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
