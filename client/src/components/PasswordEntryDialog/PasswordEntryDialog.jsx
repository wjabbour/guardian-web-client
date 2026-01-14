import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

export default function PasswordEntryDialog({
  isModalOpen,
  setIsModalOpen,
  onPasswordChange,
}) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      setPassword("");
    }
  }, [isModalOpen]);

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleSubmit() {
    onPasswordChange(password);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Enter Admin Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // allow submitting by pressing Enter
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
