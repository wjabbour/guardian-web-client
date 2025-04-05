import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const ADMIN_PASSWORD = "Louis123";

export default function PasswordEntryDialog({
  isModalOpen,
  setIsModalOpen,
  onPasswordChange,
}) {
  const [password, setPassword] = useState("");

  function handleClose() {
    setIsModalOpen(false);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    onPasswordChange(password);
  }, [password]);

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Enter password</DialogTitle>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <TextField value={password} onChange={handlePassword}></TextField>
      </Box>
    </Dialog>
  );
}
