import * as React from 'react';
import Button from '@mui/material/Button';

interface ContainedButtonsProps {}

export const ContainedButtons: React.FC<ContainedButtonsProps> = () => {
  return (
    <Button
      sx={{
        backgroundColor: "#ea580c",
        width: "350px",
        borderRadius: "10px", 
        color: "#fff",
        '&:hover': {
          backgroundColor: "#e3d5aa"
        },
      }}
      variant="contained"
    >
      Enviar
    </Button>
  );
}
