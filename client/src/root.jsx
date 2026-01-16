import "./App.css";
import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState, createContext, useEffect } from "react";
import PasswordEntryDialog from "./components/PasswordEntryDialog/PasswordEntryDialog";
import { useNextGenRouting } from "./hooks/useNextGenRouting";
import { getRoutePrefix } from "guardian-common";
import Gpc81Navbar from "./components/Gpc81Navbar/Gpc81Navbar";
import { getMe } from "./lib/http";

export const UserContext = createContext({ role: "user" });
const CartContext = createContext({});

export default function Root() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const useRouting = useNextGenRouting() && window.location.pathname === "/";
  const [cart, set_cart] = useState(() => {
    // Rehydrate cart from sessionStorage
    if (sessionStorage.getItem("cart")) {
      return JSON.parse(sessionStorage.getItem("cart"));
    }
    return {};
  });
  const [user, setUser] = useState({ role: "user" });
  const [isModalOpen, setModalOpen] = useState(false);

  // Rehydrate user context on mount
  useEffect(() => {
    async function rehydrateUser() {
      try {
        const result = await getMe();
        if (result.success && result.success.data) {
          const role = result.success.data.role || "user";
          setUser({ role });
        }
      } catch (error) {
        console.error("Failed to rehydrate user context:", error);
        // Keep default role "user" on error
      }
    }

    rehydrateUser();
  }, []);

  return (
    <div className="app">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={navigation.state === "loading"}
      />
      <div
        className={`spinner ${navigation.state === "loading" ? "" : "hidden"}`}
      >
        <Box
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: `${navigation.state === "loading" ? "" : "none"}`,
          }}
        >
          <CircularProgress />
        </Box>
      </div>

      <CartContext.Provider>
        <UserContext.Provider value={user}>
          {useRouting && <Gpc81Navbar setModalOpen={setModalOpen} />}
          {!useRouting && <Navbar cart={cart} setCart={set_cart} />}
          <Outlet context={[cart, set_cart]} />
        </UserContext.Provider>
      </CartContext.Provider>

      {useRouting && (
        <div className="cursor-default">
          <div className="flex flex-col items-center mt-[80px] text-[24px] font-bold">
            <span>
              Guardian Products 5575 Spalding Drive, Peachtree Corners, GA 30092
            </span>
            <span>Phone 800 727-7222</span>
          </div>
        </div>
      )}
      {!useRouting && <Footer />}
      <PasswordEntryDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setModalOpen}
        onSubmit={async (password) => {
          // this password is used to determine which store the user is accessing, not the admin login password
          const prefix = getRoutePrefix(password);
          if (prefix) {
            const result = await getMe();
            if (result.success && result.success.data) {
              const role = result.success.data.role || "user";
              setUser({ role });
            }
            setModalOpen(false);
            navigate(prefix);
          }
        }}
      />
    </div>
  );
}
