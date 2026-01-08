import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function OrderLineItem({
  item,
  order, // <--- New Prop
  isAdmin,
  onEditRequest,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Logic for the new column
  const isPaypal = order.paid === 1 && order.bypass === 0;

  const [formData, setFormData] = useState({
    po: item.po || "",
    customer_po: item.customer_po || "",
    est_ship_date: item.est_ship_date || "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditClick = () => {
    if (!isAdmin) {
      onEditRequest();
      return;
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      po: item.po || "",
      customer_po: item.customer_po || "",
      est_ship_date: item.est_ship_date || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ ...item, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save item:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderActionButtons = () => {
    if (isSaving) {
      return <CircularProgress size={24} color="primary" />;
    }

    if (isEditing) {
      return (
        <>
          <Tooltip title="Save Changes">
            <IconButton size="small" onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton size="small" onClick={handleCancel} color="error">
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </>
      );
    }

    return (
      <Tooltip title={isAdmin ? "Edit Item" : "Login to Edit"}>
        <IconButton size="small" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <TableRow sx={{ userSelect: "none" }}>
      <TableCell sx={{ width: "90px" }}>{renderActionButtons()}</TableCell>

      <TableCell>{item.code}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{`$${(item.price ?? 0).toFixed(2)}`}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.size}</TableCell>
      <TableCell>{item.color}</TableCell>
      <TableCell>{item.embroidery}</TableCell>

      {/* New "Used Paypal" Column */}
      <TableCell align="center">
        {isPaypal ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <CloseIcon color="error" fontSize="small" />
        )}
      </TableCell>

      {isEditing ? (
        <>
          <TableCell>
            <TextField
              size="small"
              variant="standard"
              disabled={isSaving}
              value={formData.customer_po}
              onChange={handleChange("customer_po")}
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              variant="standard"
              disabled={isSaving}
              value={formData.po}
              onChange={handleChange("po")}
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              variant="standard"
              disabled={isSaving}
              value={formData.est_ship_date}
              onChange={handleChange("est_ship_date")}
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{item.customer_po || "N/A"}</TableCell>
          <TableCell>{item.po || "N/A"}</TableCell>
          <TableCell>{item.est_ship_date || "N/A"}</TableCell>
        </>
      )}
    </TableRow>
  );
}
