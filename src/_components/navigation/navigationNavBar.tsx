"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface SimpleBottomNavigationProps {
  labels: {
    textoUno: string;
    textoDos: string;
    textoTres: string;
    textoCuatro: string;
    textoCinco: string;
    textoSeis: string;
  };
}

export default function SimpleBottomNavigation({ labels }: SimpleBottomNavigationProps) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100vw', boxShadow: '0px 4px 5px gray'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', justifyContent: 'center' }} // Blanco con 80% de transparencia
      >
        <BottomNavigationAction label={labels.textoUno} icon={<RestoreIcon />} />
        <BottomNavigationAction label={labels.textoDos} icon={<FavoriteIcon />} />
        <BottomNavigationAction label={labels.textoTres} icon={<LocationOnIcon />} />
        <BottomNavigationAction label={labels.textoCuatro} icon={<RestoreIcon />} />
        <BottomNavigationAction label={labels.textoCinco} icon={<FavoriteIcon />} />
        <BottomNavigationAction label={labels.textoSeis} icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
/*    
    textoUno: string,
    textoDos: string,
    textoTres: string,
    textoCuatro: string,
    textoCinco: string,
    textoSeis: string,
    */
