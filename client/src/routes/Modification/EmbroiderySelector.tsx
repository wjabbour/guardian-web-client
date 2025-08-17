import Thumbnail from "./Thumbnail";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getWebConfigValue } from "guardian-common";

export default function EmbroiderySelector({
  item,
  embroideries,
  embroidery,
  placement,
  handleChange,
  handlePlacementChange,
}) {
  const logo_placements = getWebConfigValue("logo_placements") as string[];

  const embroiderySelector = () => {
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

  const placementSelector = () => {
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
      <div className="w-[250px] flex flex-col gap-[5px]">
        {embroiderySelector()}
        {placementSelector()}
      </div>
      <div>
        <Thumbnail img={embroidery} />
      </div>
    </div>
  );
}
