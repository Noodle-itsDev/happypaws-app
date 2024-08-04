"use client";

import React, { useEffect } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { gsap } from 'gsap';

const FooterPrivate = () => {
  useEffect(() => {
    gsap.fromTo(
      ".footer-link",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: 'auto', // Cambiado a auto para que se ajuste al contenido
        backgroundImage: 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(66,215,168,1) 50%, rgba(126,217,87,1) 100%)',
        padding: { xs: '24px 16px', sm: '32px 16px', md: '48px 16px' }, // Ajustes de padding según el tamaño de la pantalla
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Imagen encima del texto */}
        <Box
          sx={{
            mb: 4, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src='/img/whiteAPaws.png'
            alt="Logo"
            style={{ width: '50px', height: 'auto' }} // Adjust size as needed
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontSize: { xs: '24px', sm: '30px', md: '30px' }, // Ajustar tamaño de fuente responsivo
            mb: 4, // Increase margin bottom for spacing
          }}
        >
          Happy Paws
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Link
            href="/"
            variant="body2"
            className="footer-link"
            sx={{
              color: 'white',
              fontSize: { xs: '20px', sm: '30px', md: '25px' }, // Ajustar tamaño de fuente responsivo
              mx: 2,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Home
          </Link>
          <Link
            href="/sobre/nosotros"
            variant="body2"
            className="footer-link"
            sx={{
              color: 'white',
              fontSize: { xs: '20px', sm: '30px', md: '25px' }, // Ajustar tamaño de fuente responsivo
              mx: 2,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contact"
            variant="body2"
            className="footer-link"
            sx={{
              color: 'white',
              fontSize: { xs: '20px', sm: '30px', md: '25px' }, // Ajustar tamaño de fuente responsivo
              mx: 2,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Contacto
          </Link>
        </Box>
        <Box
          sx={{
            height: '2px',
            width: '100%',
            backgroundColor: 'white',
            mb: 2,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'white',
            fontSize: { xs: '16px', sm: '20px', md: '20px' }, // Ajustar tamaño de fuente responsivo
          }}
        >
          {'© '}
          {new Date().getFullYear()}
          {' Protectora. Todos los derechos reservados.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterPrivate;
