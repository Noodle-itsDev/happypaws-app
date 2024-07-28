import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

// Define la interfaz de las props
interface PasswordToggleButtonProps {
  label: string; // Propiedad para el label
}

export const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({
  label,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        fullWidth
        required
        type={showPassword ? "text" : "password"}
        label={label}
        sx={{
          width: "350px",
          borderRadius: "30px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            "& fieldset": {
              border: "1px solid #fff", 
            },
            "&:hover fieldset": {
              borderColor: "#257bcd",
            },
          },
          "& .MuiInputBase-input": {
            color: "#000",
          },
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleClickShowPassword}
              edge="end"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
    </div>
  );
};
