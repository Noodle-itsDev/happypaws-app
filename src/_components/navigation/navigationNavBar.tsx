"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { SvgIconComponent } from '@mui/icons-material';

interface SimpleBottomNavigationProps {
  labels: string[];
  icons: SvgIconComponent[];
}

export default function SimpleBottomNavigation({ labels, icons }: SimpleBottomNavigationProps) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100dvw', boxShadow: '0px 4px 5px gray' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', justifyContent: 'center' }} // Blanco con 80% de transparencia
      >
        {labels.map((label, index) => (
          <BottomNavigationAction key={index} label={label} icon={React.createElement(icons[index])} />
        ))}
      </BottomNavigation>
    </Box>
  );
}
