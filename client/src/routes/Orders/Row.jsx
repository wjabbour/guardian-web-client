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

import Collapse from "@mui/material/Collapse";

export default function Row({ name, count, orders }) {
  const [open, setOpen] = useState(false);

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
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{count}</TableCell>
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
                        {row.created_at.toDateString()}
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
