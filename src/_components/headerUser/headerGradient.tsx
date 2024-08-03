"use client";

import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../../app/globals.css';

interface PrimarySearchAppBarProps {
  backgroundGradient?: string;
  accessHref?: string;
  accessLabel?: string;
  userType: 'public' | 'user' | 'protector';
}

export default function PrimarySearchAppBarUser({
  backgroundGradient,
  accessHref = '/profile',
  accessLabel = 'Mi Perfil',
  userType
}: PrimarySearchAppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    if (accessHref) {
      window.location.href = accessHref;
    } else {
      console.log('Redirigiendo a la página de perfil');
    }
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100dvw' }}>
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
          {userType !== 'public' && (
            <Button
              color="inherit"
              onClick={handleMenu}
              sx={{
                display: { xs: 'none', md: 'block' },
                zIndex: 9999
              }}
            >
              <AccountCircle sx={{ mr: 1 }} />
              {accessLabel}
            </Button>
          )}
          {userType !== 'public' && (
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{ mt: '45px', position: 'absolute', zIndex: 9999 }}
            >
              <MenuItem onClick={handleProfile}>Mi Perfil</MenuItem>
              {userType === 'user' && <MenuItem onClick={() => console.log('Cerrar sesión')}>Cerrar sesión</MenuItem>}
              {userType === 'protector' && <MenuItem onClick={() => console.log('Gestión de protectora')}>Gestión de protectora</MenuItem>}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
