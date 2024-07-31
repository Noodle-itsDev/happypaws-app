import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  bgColor: string;
  opacity: number;
  fontColor: string;
  buttonId: string;
  label: string;
  width: number;
  height: number;
  onClick: () => void; // Añadir la propiedad onClick
}

const CustomButton: React.FC<CustomButtonProps> = ({
  bgColor,
  opacity,
  fontColor,
  buttonId,
  label,
  width,
  height,
  onClick, // Añadir onClick aquí
}) => {
  return (
    <Button
      id={buttonId}
      variant="contained"
      style={{
        fontSize: "20px",
        backgroundColor: bgColor,
        opacity: opacity,
        color: fontColor,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick} // Usar onClick aquí
    >
      {label}
    </Button>
  );
};

export default CustomButton;
