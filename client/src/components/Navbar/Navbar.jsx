import { useNavigate } from "react-router-dom";
import { getWebConfigValue } from "guardian-common";
import { getDomainAwarePath } from "../../lib/utils";
import CartDrawer from "../CartDrawer";

export default function Navbar({ cart, setCart }) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* View Orders */}
        <div
          className="flex items-center justify-center h-[35px] w-[145px] rounded-[25px] border-2 border-solid border-[#3434f3] cursor-pointer px-[5px]"
          onClick={() => navigate(getDomainAwarePath("/orders"))}
        >
          <div className="text-[20px] font-bold text-[#3434f3]">View Orders</div>
        </div>

        {/* Guardian Logo */}
        <img
          className="h-[80px] cursor-pointer mr-[150px]"
          src="/images/guardian.png"
          onClick={() => navigate(getDomainAwarePath("/"))}
          alt="Guardian Logo"
        />

        {/* Company Logo */}
        <img
          className="h-[90px] cursor-pointer ml-[150px]"
          src={`/images/${getWebConfigValue("company_logo")}`}
          onClick={() => navigate(getDomainAwarePath("/"))}
          alt="Company Logo"
        />

        {/* Cart */}
        <CartDrawer cart={cart} setCart={setCart} />
      </div>
    </header>
  );
}
