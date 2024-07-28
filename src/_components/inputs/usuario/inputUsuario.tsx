import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface BasicTextFieldsProps {
  id: string;
  placeholder: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  borderColor?: string;
  textColor?: string;
}

const BasicTextFields: React.FC<BasicTextFieldsProps> = ({
  id = 'filled-basic',
  placeholder = 'Filled',
  backgroundColor = 'white',
  width = '25ch',
  height = 'auto',
  borderColor = 'gray',
  textColor = 'black',
 
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width, height },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={id}
        label={placeholder}
        variant="filled"
        sx={{
          backgroundColor: backgroundColor,
          borderTopLeftRadius: "10px", // Aplicar border-radius
          '& .MuiOutlinedInput-root': {
            borderTopLeftRadius: "10px", // Aplicar border-radius en el root
            '& fieldset': {
              borderColor: borderColor,
            },
            '&:hover fieldset': {
              borderColor: borderColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: borderColor,
            },
          },
          '& .MuiInputLabel-root': {
            color: textColor,
          },
          '& .MuiInputBase-input': {
            color: textColor,
          },
        }}
      />
    </Box>
  );
}

export default BasicTextFields;
