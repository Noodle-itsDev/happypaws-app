import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface MultilineTextFieldsProps {
  placeholder: string;
  nameButton: string;
  idButton: string;
  width?: string;
  autoComplete?: boolean;
}

const MultilineTextFields: React.FC<MultilineTextFieldsProps> = ({
  placeholder,
  nameButton,
  idButton,
  width = "25ch",
  autoComplete = true,
}) => {
  return (
    <Box
      component="form"
      sx={{
        background: "",
        "& .MuiTextField-root": { m: 1, width },
      }}
      noValidate
      autoComplete={autoComplete ? "on" : "off"}
    >
      <div className="grid justify-center">
        <TextField
          id={idButton}
          label={nameButton}
          placeholder={placeholder}
          multiline
          required
          maxRows={1}
          sx={{
            borderRadius: "30px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              height:"55px",
              display:"flex",
              justifyContent:"center",
              "& fieldset": {
                borderColor: "#fff",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
            "&:hover .MuiOutlinedInput-root fieldset": {
              borderColor: "#257bcd", 
            },
            "&.Mui-focused .MuiOutlinedInput-root fieldset": {
              borderColor: "#fff",
            },
          }}
        />
      </div>
    </Box>
  );
};

export default MultilineTextFields;
