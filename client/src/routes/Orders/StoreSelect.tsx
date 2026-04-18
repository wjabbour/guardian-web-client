import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Props {
  stores: string[];
  onChange: (store: string | null) => void;
  placeholder?: string;
}

export default function StoreSelect({ stores, onChange, placeholder = "Filter by store" }: Props) {
  return (
    <Autocomplete
      options={stores}
      onChange={(_, value) => onChange(value)}
      sx={{ width: 280 }}
      renderInput={(params) => (
        <TextField {...params} size="small" placeholder={placeholder} />
      )}
    />
  );
}
