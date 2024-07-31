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
  disabled?: boolean;
  type?: 'text' | 'password'; 
}

const BasicTextFields: React.FC<BasicTextFieldsProps> = ({
  id = 'filled-basic',
  placeholder = 'Filled',
  backgroundColor = 'white',
  width = '18vw',
  height = 'auto',
  borderColor = 'gray',
  textColor = 'black',
  disabled = false,
    type = 'text'
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width, height },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
        
        required
        id={id}
        label={placeholder}
        variant="filled"
        disabled={disabled}
        type={type} 
        sx={{
          backgroundColor: backgroundColor,
          borderTopLeftRadius: "10px",
          '& .MuiOutlinedInput-root': {
            borderTopLeftRadius: "10px",
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
