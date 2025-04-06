import "../App.css";
import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useState, createContext } from "react";
import PasswordEntryDialog from "../components/PasswordEntryDialog";
import { useNextGenRouting } from "../hooks/useNextGenRouting";

export const UserContext = createContext({ isLoggedIn: false });
const CartContext = createContext({});

export default function Root() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const useRouting =
    useNextGenRouting() &&
    ["localhost", "gpc81"].includes(window.location.hostname) &&
    window.location.pathname === "/";
  const [cart, set_cart] = useState(rehydrate());
  const [user, setUser] = useState({ isLoggedIn: false });
  const [isModalOpen, setModalOpen] = useState(false);
  function rehydrate() {
    if (sessionStorage.getItem("cart")) {
      return JSON.parse(sessionStorage.getItem("cart"));
    }
    return {};
  }

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
        <UserContext.Provider user={user}>
          {useRouting && (
            <div>
              <div className="flex items-center justify-center bg-[#0324fc] h-[70px] cursor-default">
                <p className="text-white text-4xl drop-shadow-lg">
                  Contact us at 800-727-7222 or email us at support@gpcorp.com
                </p>
              </div>
              <div className="relative h-[190px]">
                <img
                  src="/images/guardian_nav.jpg"
                  className="w-full h-full"
                ></img>
                <div
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className="absolute right-10 top-12 h-[70px] w-[220px] bg-[#0324fc] flex items-center justify-center text-5xl text-white drop-shadow-lg cursor-pointer"
                >
                  LOGIN
                </div>
              </div>
            </div>
          )}
          {!useRouting && <Navbar cart={cart} />}
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
        onPasswordChange={(password, setPassword) => {
          if (password === "HennessY") {
            setUser({ isLoggedIn: true });
            setModalOpen(false);
            navigate("/hennessy");
            setPassword("");
          }
        }}
      />
    </div>
  );
}
