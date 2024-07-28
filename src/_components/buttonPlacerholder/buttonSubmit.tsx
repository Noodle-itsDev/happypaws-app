import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface ContainedButtonsProps {
  id?: string;
  backgroundColor?: string;
  color?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  label?: string; // Texto del botón
}

const ContainedButtons: React.FC<ContainedButtonsProps> = ({
  id,
  backgroundColor = 'primary', // Color de fondo predeterminado
  color = 'white',
  width = 'auto',
  height = 'auto',
  borderRadius = '4px', // Valor predeterminado
  label = 'Contained'
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        id={id} // Asignar el id
        variant="contained"
        sx={{
          backgroundColor: backgroundColor,
          color: color,
          width: width,
          height: height,
          borderRadius: borderRadius,
          '&:hover': {
            backgroundColor: backgroundColor, // Color de fondo al pasar el ratón
          }
        }}
      >
        {label}
      </Button>
    </Stack>
  );
}

export default ContainedButtons;
