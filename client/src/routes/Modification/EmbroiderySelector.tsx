import Thumbnail from "./Thumbnail";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getWebConfigValue } from "guardian-common";
import { useState } from "react";
import { SvgIcon } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

export default function EmbroiderySelector({
  item,
  embroideries,
  embroidery,
  placement,
  handleChange,
  handlePlacementChange,
}) {
  const logo_placements = getWebConfigValue("logo_placements") as string[];
  const [secondLogo, setSecondLogo] = useState(false);

  const SecondLogoAdd = () => {
    if (secondLogo) {
      return null;
    }
    return (
      <div className="flex gap-2">
        <p className="font-bold text-[14px]">Want to add a second logo?</p>
        <SvgIcon
          onClick={() => {
            setSecondLogo(true);
          }}
          fontSize="inherit"
          className="relative top-1 cursor-pointer"
        >
          <AddCircleIcon />
        </SvgIcon>
      </div>
    );
  };

  const SecondLogoRemove = () => {
    if (!secondLogo) {
      return null;
    }
    return (
      <div className="flex gap-2">
        <p className="font-bold text-[14px]">Only want one logo?</p>
        <SvgIcon
          onClick={() => {
            setSecondLogo(false);
          }}
          fontSize="inherit"
          className="relative top-1 cursor-pointer"
        >
          <DoDisturbOnIcon />
        </SvgIcon>
      </div>
    );
  };

  const EmbroiderySelector = () => {
    if (item.type === "customs" || embroideries.length === 0) {
      return <></>;
    }

    return (
      <div>
        <FormControl fullWidth>
          <InputLabel>Logo</InputLabel>
          <Select value={embroidery} label="embroidery" onChange={handleChange}>
            {embroideries}
          </Select>
        </FormControl>
      </div>
    );
  };

  const PlacementSelector = () => {
    const hasCorrectType = ["womens", "mens"].includes(item.type);
    const hasPlacementOptions = logo_placements.length > 0;

    if (hasCorrectType && hasPlacementOptions) {
      const placements = logo_placements.map((l) => {
        return <MenuItem value={l}>{l}</MenuItem>;
      });

      return (
        <div>
          <FormControl fullWidth>
            <InputLabel>Logo Placement</InputLabel>
            <Select
              value={placement}
              label="placement"
              onChange={handlePlacementChange}
            >
              {placements}
            </Select>
          </FormControl>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className="flex mb-[30px] mt-[30px]">
      <div className="w-[250px] flex flex-col gap-[10px]">
        <EmbroiderySelector />
        <PlacementSelector />
        <SecondLogoAdd />
        {secondLogo && (
          <>
            <EmbroiderySelector />
            <PlacementSelector />
            <SecondLogoRemove />
          </>
        )}
      </div>
      <div>
        <Thumbnail img={embroidery} />
      </div>
    </div>
  );
}
