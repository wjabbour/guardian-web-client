import { useNavigate } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDomainAwarePath } from "../../lib/utils";
import { getWebConfigValue, getStoreCode } from "guardian-common";

export default function StoreSelection() {
  const navigate = useNavigate();
  const stores = getWebConfigValue("stores");
  const storeOptions = Object.keys(stores);
  return (
    <div className="flex justify-center">
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
        {storeOptions.map((store) => {
          return (
            <div
              onClick={() => {
                const company = getWebConfigValue("title");
                const storeCode = getStoreCode(company, store);
                navigate(getDomainAwarePath(`/catalog/${storeCode}/customs`))
              }}
              className="cursor-pointer text-center font-bold h-[80px] w-[180px] p-[15px] m-1 border border-black rounded-md border-solid"
            >
              {store.split(',')[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
