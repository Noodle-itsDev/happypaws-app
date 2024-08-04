"use client";

import Head from 'next/head';
import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Container, Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Styles from './about.module.css';
import HeaderBar from '@/_components/headerBarPublic/headerBarPublic/headerBar';
import FooterPublic from '@/_components/FooterPublic/footerPublic';

// Registro del plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
    { name: "Johana Almeida", role: "CEO", image: "/img/john.jpg" },
    { name: "Borja Orts López", role: "CEO", image: "/img/jane.jpg" },
    { name: "Alejandro Agustech", image: "/img/john.jpg" },
    { name: "Jennifer Diaz", image: "/img/jane.jpg" },
];

const AboutPage: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useEffect(() => {
        // Ajusta la altura del encabezado
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
    
        // Animaciones para elementos de scroll
        gsap.utils.toArray('.animate-scroll').forEach((section: unknown) => {
            const element = section as HTMLElement; // Type assertion here
    
            gsap.fromTo(element, // Use the element with proper type
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: true,
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    
        gsap.to('.floating-circle', {
            y: 20,
            rotation: 360,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    
        gsap.to('.floating-flower', {
            y: 10,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    
    }, []);
    

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
                />
            </Head>
            <header 
                ref={headerRef} 
                style={{ position: "fixed", top: 0, width: '100%', height: '11vh', zIndex: 1200 }}
            >
                <HeaderBar></HeaderBar>
            </header>
            <main style={{ padding: '100px', overflow: 'hidden', marginTop: headerHeight }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {/* Introducción */}
                    <Typography
                        variant="h3"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b" }}
                        className="intro-text animate-scroll"
                    >
                        Sobre Nosotros
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        style={{ color: "#104b4b", marginBottom: '2rem' }}
                        className="intro-text animate-scroll"
                    >
                        En nuestra empresa, nos dedicamos a gestionar voluntariados para el cuidado de mascotas, facilitar la adopción de animales y promover las donaciones para mejorar sus vidas. 
                        Estamos especialmente comprometidos con incentivar la adopción de mascotas mayores de 5 años, dándoles una segunda oportunidad para encontrar un hogar amoroso.
                    </Typography>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b", marginTop: '4rem' }}
                        className="intro-text animate-scroll"
                    >
                        Misión y Visión
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" className="grid-section animate-scroll">
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Typography variant="h5" gutterBottom>
                                    Misión
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Nuestra misión es proporcionar cuidados excepcionales a los animales, promover su adopción y asegurar que cada mascota tenga una vida digna y feliz a través de programas de voluntariado y donaciones.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Typography variant="h5" gutterBottom>
                                    Visión
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Aspiramos a ser líderes en el bienestar animal, creando comunidades conscientes y solidarias que apoyen la adopción y cuidado de mascotas, especialmente las mayores de 5 años.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b", marginTop: '4rem' }}
                        className="intro-text animate-scroll"
                    >
                        Nuestros Valores
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" className="grid-section animate-scroll">
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Typography variant="h5" gutterBottom>
                                    Compasión
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Nos dedicamos a tratar a cada animal con el máximo cuidado y cariño, ofreciendo una mano amiga en momentos de necesidad.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Typography variant="h5" gutterBottom>
                                    Integridad
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Operamos con transparencia y honestidad, asegurando que nuestras prácticas sean siempre éticas y responsables.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Typography variant="h5" gutterBottom>
                                    Comunidad
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Fomentamos un sentido de comunidad y colaboración entre voluntarios, adoptantes y donantes para maximizar nuestro impacto.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Typography variant="h5" gutterBottom>
                                    Innovación
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Buscamos continuamente nuevas formas de mejorar nuestro trabajo y encontrar soluciones creativas para el bienestar de los animales.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b", marginTop: '4rem' }}
                        className="intro-text animate-scroll"
                    >
                        Nuestra Historia
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        style={{ color: "#104b4b", marginBottom: '2rem' }}
                        className="intro-text animate-scroll"
                    >
                        Fundada en 2010, nuestra empresa comenzó como un pequeño grupo de entusiastas del bienestar animal. Desde entonces, hemos crecido y expandido nuestras operaciones para ayudar a miles de mascotas a encontrar hogares amorosos y mejorar sus vidas a través de nuestros programas de voluntariado y donaciones.
                    </Typography>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b", marginTop: '4rem' }}
                        className="intro-text animate-scroll"
                    >
                        Nuestro Impacto
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        style={{ color: "#104b4b", marginBottom: '2rem' }}
                        className="intro-text animate-scroll"
                    >
                        A través de nuestros esfuerzos, hemos logrado mejorar la vida de más de 10,000 animales, facilitando su adopción y promoviendo la educación sobre el cuidado y bienestar de las mascotas. Estamos orgullosos de nuestro impacto y continuaremos trabajando para hacer una diferencia aún mayor.
                    </Typography>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#ffa500", marginTop: '4rem' }}
                        className="intro-text animate-scroll"
                    >
                        Conoce a Nuestro Equipo
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" className="grid-section animate-scroll">
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }} className="team-member animate-scroll">
                                    <Avatar
                                        alt={member.name}
                                        src={member.image}
                                        sx={{ width: 100, height: 100, margin: 'auto' }}
                                    />
                                    <Typography variant="h6" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {member.role}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Box
                    className="floating-circle"
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        bottom: '10%',
                        right: '10%',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#104b4b',
                        opacity: 1
                    }}
                ></Box>
                <Box
                    className="floating-circle"
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        top: '-5%',
                        left: '-10%',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        backgroundColor: '#ffa500',
                        opacity: 0.6
                    }}
                ></Box>
                <Box
                    className="floating-circle"
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        top: '90%',
                        right: '-15%',
                        width: '520px',
                        height: '520px',
                        borderRadius: '50%',
                        backgroundColor: '#bfe2c1',
                        opacity: 0.6
                    }}
                ></Box>
                <Box
                    className="floating-flower"
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        bottom: '20%',
                        left: '10%',
                        width: '80px',
                        height: '80px',
                        backgroundImage: 'url(/img/florAzul.png)', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7
                    }}
                ></Box>
                <Box
                    className="floating-flower"
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        top: '30%',
                        right: '-6%',
                        width: '500px',
                        height: '500px',
                        backgroundImage: 'url(/img/florAzul.png)', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7
                    }}
                ></Box>
            </main>
            <FooterPublic></FooterPublic>
        </>
    );
};

export default AboutPage;
