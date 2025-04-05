import "../App.css";
import { Outlet, useNavigation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { getConfigValue } from "../lib/config";

export default function Root() {
  const navigation = useNavigation();
  const shouldUseLandingV2 = getConfigValue("use_landing_v2") ?? false;
  const [cart, set_cart] = useState(rehydrate());
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
      {shouldUseLandingV2 && (
        <div>
          <div className="flex items-center justify-center bg-[#0324fc] h-[70px] border-solid border-b-2 border-black">
            <p className="text-white text-4xl drop-shadow-lg">
              Contact us at 800-727-7222 or email us at support@gpcorp.com
            </p>
          </div>
          <div className="relative h-[150px] border-solid border-b-2 border-black">
            <img
              src="/images/guardian_nav.jpg"
              className="w-full h-full"
            ></img>
            <div className="absolute right-5 top-10 h-[75px] w-[225px] bg-[#0324fc] flex items-center justify-center text-5xl text-white drop-shadow-lg">
              LOGIN
            </div>
          </div>
        </div>
      )}
      {!shouldUseLandingV2 && <Navbar cart={cart} />}

      <Outlet context={[cart, set_cart]} />
      <Footer />
    </div>
  );
}
