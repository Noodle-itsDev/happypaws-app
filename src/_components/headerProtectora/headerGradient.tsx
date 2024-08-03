"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; // Importamos Button
import MenuIcon from '@mui/icons-material/Menu';
import '../../app/globals.css';

interface PrimarySearchAppBarProps {
  backgroundGradient?: string;
  accessHref: string; 
  accessLabel: string; 
}

export default function PrimarySearchAppBar({
  backgroundGradient,
  accessHref,
  accessLabel = 'Acceso', 
}: PrimarySearchAppBarProps) {
  const handleProtectoraAccess = () => {
    if (accessHref) {
      window.location.href = accessHref; 
    } else {
      console.log('Acceso para protectoras');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100dvw" }}>
      <AppBar position="static" sx={{ background: backgroundGradient || 'default', zIndex: 9999 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="/img/whiteAPaws.png"
            alt="Logo"
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              height: '30px', 
              width: '30px',
              zIndex: 9999
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            color="inherit" 
            onClick={handleProtectoraAccess}
            sx={{ 
              display: { xs: 'none', md: 'block' },
              zIndex: 9999
            }}
          >
            {accessLabel}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
