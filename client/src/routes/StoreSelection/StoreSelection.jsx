import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDomainAwarePath } from "../../lib/utils";
import { getWebConfigValue } from "guardian-common";
import PasswordEntryDialog from "../../components/PasswordEntryDialog";

export default function StoreSelection() {
  const navigate = useNavigate();
  const stores = getWebConfigValue("stores");
  const [requiredPassword, setRequiredPassword] = useState(null);
  const [storeCode, setStoreCode] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <PasswordEntryDialog
        isModalOpen={isModalOpen}
        onPasswordChange={(password) => {
          if (password === requiredPassword) {
            navigate(getDomainAwarePath(`/catalog/${storeCode}/customs`));
          }
        }}
        setIsModalOpen={setModalOpen}
      />
      <div
        className="relative right-[50px] cursor-pointer text-[32px]"
        onClick={() => {
          navigate(getDomainAwarePath("/"));
        }}
      >
        <SvgIcon fontSize="inherit">
          <ArrowBackIcon />
        </SvgIcon>
      </div>
      <div className="flex flex-wrap justify-center gap-[5px] w-[800px] border-gray-200 border-solid border p-[15px]">
        {stores.map((store) => {
          return (
            <div
              onClick={() => {
                if (store.password) {
                  setModalOpen(true);
                  setRequiredPassword(store.password);
                  setStoreCode(store.code);
                } else {
                  navigate(
                    getDomainAwarePath(`/catalog/${store.code}/customs`)
                  );
                }
              }}
              className="cursor-pointer text-center font-bold w-[180px] p-[15px] m-1 border border-black rounded-md border-solid"
            >
              {store.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
