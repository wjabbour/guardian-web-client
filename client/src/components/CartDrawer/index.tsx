import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { ColorOption, SizeOption } from "../../lib/constants";
import { getDomainAwarePath } from "../../lib/utils";
import { CartItem } from "guardian-common";
import PasswordEntryDialog from "../PasswordEntryDialog/PasswordEntryDialog";
import { login } from "../../lib/http";

interface Cart {
  [key: string]: CartItem;
}

interface Props {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

export default function CartDrawer({ cart, setCart }: Props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // Calculate total items for the badge count
  const cartItemCount: number = Object.values(cart || {}).reduce(
    (acc: number, item: any) => acc + (Number(item.quantity) || 0),
    0
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const handleDelete = (key: string) => {
    // Create a shallow copy to avoid mutating state directly
    const newCart = { ...cart };
    delete newCart[key];

    // Update Storage and State
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleAdminLoginClick = () => {
    setIsAdminDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAdminDialogOpen(false);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const response = await login(password);

      if (response.success) {
        // Refresh the page to update user context with new role
        window.location.reload();
      } else {
        setSnackbarMessage("Invalid password");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error validating password:", error);
      setSnackbarMessage("Error validating password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      {/* 1. THE TRIGGER BUTTON */}
      <IconButton onClick={toggleDrawer(true)} aria-label="cart">
        <Badge badgeContent={cartItemCount} color="error">
          <ShoppingCartIcon className="text-gray-700" fontSize="medium" />
        </Badge>
      </IconButton>

      {/* 2. THE SLIDE-OUT DRAWER */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className="w-[340px] h-full flex flex-col p-4 bg-white"
          role="presentation"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-2">
            <p className="text-xl font-bold text-gray-800">Your Cart</p>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 overflow-y-auto">
            {Object.keys(cart).length === 0 ? (
              <div className="mt-10 text-center text-gray-500">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              Object.keys(cart).map((k) => {
                const item = cart[k];
                const isDefaultSize = item.size === SizeOption.DEFAULT; // Adjust based on your actual SizeOption import

                const formatter = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                });

                const priceDisplay = formatter.format(item.price);

                return (
                  <div
                    key={k}
                    className="relative flex p-3 mb-2 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                  >
                    {/* Delete Action */}
                    <div className="absolute top-2 right-2 cursor-pointer">
                      <DeleteIcon
                        fontSize="small"
                        style={{ color: "#C70000" }}
                        onClick={() => handleDelete(k)}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col text-sm pr-6">
                      <p className="font-bold text-lg mb-1">{item.name}</p>

                      <p className="text-gray-600 mb-2">{priceDisplay} each</p>

                      <div className="text-gray-700 space-y-1">
                        {item.color && item.color !== ColorOption.DEFAULT && (
                          <p>
                            <span className="font-semibold">Color:</span>{" "}
                            {item.color}
                          </p>
                        )}

                        {item.embroidery && (
                          <p>
                            <span className="font-semibold">Embroidery:</span>{" "}
                            {item.embroidery}
                            {item.secondEmbroidery
                              ? ` / ${item.secondEmbroidery}`
                              : ""}
                          </p>
                        )}

                        {item.placement && (
                          <p>
                            <span className="font-semibold">Placement:</span>{" "}
                            {item.placement}
                            {item.secondPlacement
                              ? ` / ${item.secondPlacement}`
                              : ""}
                          </p>
                        )}

                        {!isDefaultSize && (
                          <p>
                            <span className="font-semibold">Size:</span>{" "}
                            {item.size}
                          </p>
                        )}

                        <p className="mt-2 pt-2 border-t border-gray-300">
                          <span className="font-semibold">Quantity:</span>{" "}
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Optional Footer (Checkout Button placeholder) */}
          {Object.keys(cart).length > 0 && (
            <div className="pt-4 border-t-2 border-gray-200">
              <button
                onClick={() => {
                  navigate(getDomainAwarePath("/checkout"));
                  setIsOpen(false);
                }}
                className="w-full bg-black text-white py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition"
              >
                Checkout
              </button>
            </div>
          )}

          <div className="flex justify-center pt-4 border-t-2 border-gray-200">
            <Tooltip title="Admin Login">
              <IconButton
                onClick={handleAdminLoginClick}
                aria-label="admin-login"
                className="mr-1"
              >
                <PersonIcon className="text-gray-700" fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Drawer>
      <PasswordEntryDialog
        isModalOpen={isAdminDialogOpen}
        setIsModalOpen={handleDialogClose}
        onSubmit={handlePasswordSubmit}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
