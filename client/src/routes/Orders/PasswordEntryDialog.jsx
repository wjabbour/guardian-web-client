import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const ADMIN_PASSWORD = "Louis123";

export default function PasswordEntryDialog({
  isModalOpen,
  setIsModalOpen,
  setIsAdmin,
}) {
  const [password, setPassword] = useState("");

  function handleClose() {
    setIsModalOpen(false);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsModalOpen(false);
    }
  }, [password]);

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Enter admin password</DialogTitle>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
      >
        <TextField value={password} onChange={handlePassword}></TextField>
      </Box>
    </Dialog>
  );
}
