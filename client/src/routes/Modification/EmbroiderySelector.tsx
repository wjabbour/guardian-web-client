import Thumbnail from "./Thumbnail";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { SvgIcon } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { CatalogItem } from "guardian-common";

// --- EXTRACTED COMPONENTS (Defined Outside) ---

interface LogoSelectProps {
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: string[];
  label?: string;
}

const LogoSelect = ({ value, onChange, options, label = "Logo" }: LogoSelectProps) => {
  return (
    <div className="w-[250px]">
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value || ""} // Ensure controlled input doesn't warn
          label={label}
          onChange={onChange}
        >
          {options.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

interface PlacementSelectProps {
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: string[];
}

const PlacementSelect = ({ value, onChange, options }: PlacementSelectProps) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="w-[250px]">
      <FormControl fullWidth>
        <InputLabel>Logo Placement</InputLabel>
        <Select value={value || ""} label="Logo Placement" onChange={onChange}>
          {options.map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

// --- MAIN COMPONENT ---

interface Props {
  item: CatalogItem;
  placements: string[];
  embroideries: string[];
  firstEmbroidery: string;
  secondEmbroidery: string | null;
  firstPlacement: string;
  secondPlacement: string;
  handleFirstEmbroideryChange: (value: string) => void;
  handleSecondEmbroideryChange: (value: string | null) => void;
  handleFirstPlacementChange: (value: string) => void;
  handleSecondPlacementChange: (value: string) => void;
}

export default function EmbroiderySelector({
  item,
  placements,
  embroideries,
  firstEmbroidery,
  secondEmbroidery,
  firstPlacement,
  secondPlacement,
  handleFirstEmbroideryChange,
  handleSecondEmbroideryChange,
  handleFirstPlacementChange,
  handleSecondPlacementChange,
}: Props) {
  const [secondLogo, setSecondLogo] = useState(false);

  // 1. SIMPLE VARIATIONS CASE
  if (item.variations) {
    return (
      <div className="mb-[30px] mt-[15px]">
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col gap-2">
              <LogoSelect
                value={firstEmbroidery}
                onChange={(e) => handleFirstEmbroideryChange(e.target.value)}
                options={item.variations}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. NO EMBROIDERIES CASE
  if (!embroideries || embroideries.length === 0) {
    return null;
  }

  // 3. STANDARD CASE
  return (
    <div className="mb-[30px] mt-[15px]">
      <div className="flex flex-col">
        {/* --- FIRST LOGO ROW --- */}
        <div className="flex">
          <div className="flex flex-col gap-2">
            <LogoSelect
              value={firstEmbroidery}
              onChange={(e) => handleFirstEmbroideryChange(e.target.value)}
              options={embroideries}
            />
            <PlacementSelect
              value={firstPlacement}
              onChange={(e) => handleFirstPlacementChange(e.target.value)}
              options={placements}
            />
          </div>
          <div>
            <Thumbnail img={firstEmbroidery} />
          </div>
        </div>

        {/* --- ADD SECOND LOGO TOGGLE --- */}
        {placements.length > 1 && !secondLogo && (
          <div className="flex gap-2">
            <p className="font-bold text-[14px]">Want to add a second logo?</p>
            <SvgIcon
              onClick={() => {
                handleSecondEmbroideryChange("");
                setSecondLogo(true);
              }}
              fontSize="inherit"
              className="relative top-1 cursor-pointer"
            >
              <AddCircleIcon />
            </SvgIcon>
          </div>
        )}
      </div>

      {/* --- SECOND LOGO ROW --- */}
      {secondLogo && (
        <div className="flex flex-col mt-[20px]">
          <div className="flex">
            <div className="flex flex-col gap-2">
              <LogoSelect
                value={secondEmbroidery}
                onChange={(e) => handleSecondEmbroideryChange(e.target.value)}
                options={embroideries}
              />
              <PlacementSelect
                value={secondPlacement}
                onChange={(e) => handleSecondPlacementChange(e.target.value)}
                options={placements}
              />
            </div>
            <div>
              <Thumbnail img={secondEmbroidery} />
            </div>
          </div>

          <div className="flex gap-2">
            <p className="font-bold text-[14px]">Only want one logo?</p>
            <SvgIcon
              onClick={() => {
                setSecondLogo(false);
                handleSecondEmbroideryChange(null);
              }}
              fontSize="inherit"
              className="relative top-1 cursor-pointer"
            >
              <DoDisturbOnIcon />
            </SvgIcon>
          </div>
        </div>
      )}
    </div>
  );
}
