import { useNavigate } from "react-router-dom";
import { getWebConfigValue } from "guardian-common";
import { getDomainAwarePath } from "../../lib/utils";
import CartDrawer from "../CartDrawer";

export default function Navbar({ cart, setCart }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[150px]">
      {/* Orders Container */}
      <div
        className="absolute top-[35px] left-[1%] flex justify-center items-center h-[35px] w-[145px] rounded-[25px] border-2 border-solid border-[#3434f3] cursor-pointer px-[5px]"
        onClick={() => navigate(getDomainAwarePath("/orders"))}
      >
        <div className="text-[20px] font-bold text-[#3434f3]">View Orders</div>
      </div>

      {/* Cart Container */}
      <div className="absolute top-[35px] right-[1%]">
        <CartDrawer cart={cart} setCart={setCart} />
      </div>

      {/* Guardian Logo */}
      <div className="absolute top-[25px] left-[15%] cursor-pointer">
        <img
          className="h-[100px]"
          src={"/images/guardian.png"}
          onClick={() => navigate(getDomainAwarePath("/"))}
          alt="Guardian Logo"
        />
      </div>

      {/* Company Logo */}
      <div className="absolute top-[25px] right-[15%] cursor-pointer">
        <img
          className="h-[120px]"
          src={`/images/${getWebConfigValue("company_logo")}`}
          onClick={() => navigate(getDomainAwarePath("/"))}
          alt="Company Logo"
        />
      </div>
    </div>
  );
}
