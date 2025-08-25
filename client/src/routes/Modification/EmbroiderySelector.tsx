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
  firstEmbroidery,
  secondEmbroidery,
  firstPlacement,
  secondPlacement,
  handleFirstEmbroideryChange,
  handleSecondEmbroideryChange,
  handleFirstPlacementChange,
  handleSecondPlacementChange,
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
            // hack to replicate structure of native HTML event
            handleSecondEmbroideryChange({ target: { value: "" } });
          }}
          fontSize="inherit"
          className="relative top-1 cursor-pointer"
        >
          <DoDisturbOnIcon />
        </SvgIcon>
      </div>
    );
  };

  // are we modifying the first or second logo?
  const EmbroiderySelector = ({ embroideryPlace }) => {
    if (item.type === "customs" || embroideries.length === 0) {
      return <></>;
    }

    return (
      <div className="w-[250px]">
        <FormControl fullWidth>
          <InputLabel>Logo</InputLabel>
          <Select
            value={
              embroideryPlace === "first" ? firstEmbroidery : secondEmbroidery
            }
            label="embroidery"
            onChange={(e) => {
              if (embroideryPlace === "first") {
                handleFirstEmbroideryChange(e);
              } else {
                handleSecondEmbroideryChange(e);
              }
            }}
          >
            {embroideries}
          </Select>
        </FormControl>
      </div>
    );
  };

  const PlacementSelector = ({ embroideryPlace }) => {
    const hasCorrectType = ["womens", "mens"].includes(item.type);
    const hasPlacementOptions = logo_placements.length > 0;

    if (hasCorrectType && hasPlacementOptions) {
      const placements = logo_placements.map((l) => {
        return <MenuItem value={l}>{l}</MenuItem>;
      });

      return (
        <div className="w-[250px]">
          <FormControl fullWidth>
            <InputLabel>Logo Placement</InputLabel>
            <Select
              value={
                embroideryPlace === "first" ? firstPlacement : secondPlacement
              }
              label="placement"
              onChange={(e) => {
                if (embroideryPlace === "first") {
                  handleFirstPlacementChange(e);
                } else {
                  handleSecondPlacementChange(e);
                }
              }}
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
    <div className="mb-[30px] mt-[30px]">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col gap-2">
            <EmbroiderySelector embroideryPlace={"first"} />
            <PlacementSelector embroideryPlace={"first"} />
          </div>
          <div>
            <Thumbnail img={firstEmbroidery} />
          </div>
        </div>

        <SecondLogoAdd />
      </div>

      {secondLogo && (
        <div className="flex flex-col mt-[20px]">
          <div className="flex">
            <div className="flex flex-col gap-2">
              <EmbroiderySelector embroideryPlace={"second"} />
              <PlacementSelector embroideryPlace={"second"} />
            </div>
            <div>
              <Thumbnail img={secondEmbroidery} />
            </div>
          </div>

          <SecondLogoRemove />
        </div>
      )}
    </div>
  );
}
