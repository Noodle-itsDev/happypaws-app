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
    { name: "Johana Almeida",  image: "/img/johana.png" },
    { name: "Borja Orts López",  image: "/img/Borja.png" },
    { name: "Alejandro Agustech", image: "/img/Alejandro.png" },
    { name: "Jennifer Diaz", image: "/img/Jennifer.png" },
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
            const element = section as HTMLElement;

            gsap.fromTo(element,
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
            <main style={{ padding: '100px', overflow: 'hidden', marginTop: "10vh" }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {/* Introducción */}
                    <Typography
                        variant="h3"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b", fontFamily: "system-ui", fontWeight: "bolder" }}
                        className="intro-text animate-scroll"
                    >
                        Sobre Nosotros
                    </Typography>

                    <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "#104b4b", marginBottom: '2rem', padding: "30px", boxShadow: "0px 5px 10px 5px #0000002b", borderRadius: "10px" }}
                        className="intro-text animate-scroll"
                    >
                        En nuestra empresa, nos dedicamos a gestionar voluntariados para el cuidado de mascotas, facilitar la adopción de animales y promover las donaciones para mejorar sus vidas.
                        Estamos especialmente comprometidos con incentivar la adopción de mascotas mayores de 5 años, dándoles una segunda oportunidad para encontrar un hogar amoroso.
                    </Typography>


                    <Grid container spacing={4} justifyContent="center" className="grid-section animate-scroll" >
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, textAlign: 'center', justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "10px", boxShadow: "0px 5px 10px 5px #0000002b" }}>
                                <Box sx={{ marginBottom: "1rem" }}>
                                    <img src="/img/cuidador.png" alt="Cuidador" style={{ width: "200px" }} />
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{ fontFamily: "system-ui", fontWeight: 800, color: "#104b4b" }}>
                                    Misión
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b" }}>
                                    Nuestra misión es proporcionar cuidados excepcionales a los animales, promover su adopción y asegurar que cada mascota tenga una vida digna y feliz a través de programas de voluntariado y donaciones.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, textAlign: 'center', justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "10px", boxShadow: "0px 5px 10px 5px #0000002b" }}>
                                <Box sx={{ marginBottom: "1rem" }}>
                                    <img src="/img/pasion.png" alt="Cuidador" style={{ width: "200px" }} />
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{ fontFamily: "system-ui", fontWeight: 800, color: "#104b4b" }}>
                                    Visión
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b" }}>
                                    Aspiramos a tener un gran impacto en el bienestar animal y social, creando comunidades conscientes y solidarias que apoyen la adopción y cuidado de mascotas, sin que tengan en cuenta su raza, género o edad.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b", marginTop: '4rem', fontFamily: "system-ui", fontWeight: "bolder", marginBottom: '4rem' }}
                        className="intro-text animate-scroll"
                    >
                        Nuestros Valores
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" className="grid-section animate-scroll">
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1', color: "#104b4b", fontFamily: "system-ui" }}>
                                <Box>
                                    <img src="/img/compasion.png" alt="Compasión" />
                                </Box>
                                <Typography variant="h5" gutterBottom sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b" }}>
                                    Compasión
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Nos dedicamos a tratar a cada animal con el máximo cuidado y cariño, ofreciendo una mano amiga en momentos de necesidad.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Box>
                                    <img src="/img/integridad.png" alt="Integridad" />
                                </Box>
                                <Typography variant="h5" gutterBottom sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b" }}>
                                    Integridad
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Operamos con transparencia y honestidad, asegurando que nuestras prácticas sean siempre éticas y responsables.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Box>
                                    <img src="/img/comunidad.png" alt="Comunidad" />
                                </Box>
                                <Typography variant="h5" gutterBottom sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b" }}>
                                    Comunidad
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Fomentamos un sentido de comunidad y colaboración entre voluntarios, adoptantes y donantes para maximizar nuestro impacto.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }}>
                                <Box>
                                    <img src="/img/creatividad.png" alt="Creatividad" />
                                </Box>
                                <Typography variant="h5" gutterBottom sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b" }}>
                                    Innovación
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Buscamos continuamente nuevas formas de mejorar nuestro trabajo y encontrar soluciones creativas para el bienestar de los animales.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Container>
                        <Typography
                            variant="h4"
                            gutterBottom
                            align="center"
                            style={{ color: "#ff9e00", marginTop: '8rem', marginBottom: "4vh", fontWeight: "bolder", fontFamily: "system-ui" }}
                            className="intro-text animate-scroll"
                        >
                            ¿Cómo surgió Happy Paws?
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", padding: "30px", boxShadow: "0px 5px 5px 5px #0000002b", borderRadius: "10px" }}>
                            <Typography
                                variant="h6"
                                align="center"
                                style={{ color: "#104b4b", marginBottom: '2rem', textAlign: "left", fontFamily: "system-ui", fontWeight: "bold" }}
                                className="intro-text animate-scroll"
                            >
                                Nuestra historia comenzó este año cuando nuestro equipo al ir a algunas protectoras a realizar adopciones. Fuimos conscientes entonces del grave problema que había a la hora de encontrar voluntarios en las protectoras y de la cantidad de mascotas mayores de cinco años que se encontraban sin un hogar. Decidimos tomar acción sobre ello para poder gestionar los voluntariados, adopciones y donaciones, haciendo así más fácil el trabajo para las protectoras y poder hacer resonar su voz además de brindar un medio más fácil para aquellas mascotas que aún no han encontrado a su media naranja.
                            </Typography>
                            <Box sx={{ display: "flex", position: "absolute", left: { md: "4%", lg: "3%" }, top: { md: "280%", lg: "245%" } }}>
                                <img src="/img/naranja.png" alt="Orange" style={{ transform: "rotate(-40deg)", width: "200px" }} />
                            </Box>
                        </Box>
                    </Container>

                    <Typography
                        variant="h4"
                        align="center"
                        style={{ color: "#104b4b", marginTop: '8rem', marginBottom: "4vh", fontFamily: "fantasy" }}
                        className="intro-text animate-scroll"
                    >
                        A través de nuestros esfuerzos, queremos lograr la estabilidad y alegría de las mascotas, facilitando su adopción y promoviendo la educación sobre el cuidado y bienestar de las mascotas. Estamos orgullosos de nuestro impacto y continuaremos trabajando para hacer una diferencia aún mayor.
                    </Typography>

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{ color: "#ffa500", marginTop: '4rem' }}
                        className="intro-text animate-scroll"
                        sx={{fontFamily: "system-ui", fontWeight: "bolder"}}
                    >
                        Conoce a Nuestro Equipo
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" className="grid-section animate-scroll" >
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#bfe2c1' }} className="team-member animate-scroll">
                                    <Avatar
                                        alt={member.name}
                                        src={member.image}
                                        sx={{ width: 200, height: 200, margin: 'auto' }}
                                    />
                                    <Typography variant="h6" gutterBottom sx={{fontFamily: "system-ui", marginTop: "20px", color: "#104b4b", fontWeight: "bold"}}>
                                        {member.name}
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
                        backgroundColor: '#ffb552',
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
                        backgroundColor: '#fda547',
                        opacity: 1
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
                        backgroundColor: '#94cf98',
                        opacity: 1
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
                        opacity: 1
                    }}
                ></Box>
                <Box
                    className="floating-flower"
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        top: '16%',
                        right: '-6%',
                        width: '500px',
                        height: '500px',
                        backgroundImage: 'url(/img/florAzul.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 1
                    }}
                ></Box>
            </main>
            <FooterPublic></FooterPublic>
        </>
    );
};

export default AboutPage;
