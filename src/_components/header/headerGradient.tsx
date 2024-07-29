"use client";

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button'; // Importamos Button
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '../../app/globals.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface PrimarySearchAppBarProps {
  backgroundGradient?: string;
}

export default function PrimarySearchAppBar({ backgroundGradient }: PrimarySearchAppBarProps) {
  const handleProtectoraAccess = () => {
    // Aquí puedes añadir la lógica para el acceso de protectoras
    console.log('Acceso para protectoras');
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            color="inherit" 
            onClick={handleProtectoraAccess}
            sx={{ 
              display: { xs: 'none', md: 'block' },
              zIndex: 9999
            }}
          >
            Acceso Protectoras
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}