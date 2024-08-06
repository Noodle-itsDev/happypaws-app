"use client";

import Head from 'next/head';
import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { Button, Container, Grid, Paper, TextField, Typography, Modal, Box } from "@mui/material";
import Styles from './contact.module.css'; // Asegúrate de que este archivo CSS esté bien configurado.
import React, { FormEvent, useEffect, useState } from "react";
import gsap from 'gsap';
import HeaderBar from '@/_components/headerBarPublic/headerBarPublic/headerBar';
import FooterPublic from '@/_components/FooterPublic/footerPublic';
import axios from 'axios';
import ChatAssistant from '@/_components/iaCom/iaCom';

const ContactPage: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);

    function handleOpenModal() {
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevent the default form submission behavior

        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const correo = (document.getElementById('email') as HTMLInputElement).value;
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
        const mensaje = (document.getElementById('mensaje') as HTMLInputElement).value;

        const data = {
            nombre,
            correo,
            telefono,
            mensaje
        };

        axios.post('http://194.164.165.239:8080/api/another/send/contact', data)
            .then(response => {
                handleOpenModal();
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
            });
    }

    useEffect(() => {
        gsap.fromTo('header',
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        gsap.fromTo('.antonFont',
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo('form',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power3.out' }
        );
        gsap.fromTo('iframe',
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1, delay: 1.5, ease: 'power3.out' }
        );

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

        
        gsap.to('.floating-circle:nth-of-type(2)', {
            x: 100,
            y: 20,
            rotation: -360,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.floating-flower:nth-of-type(2)', {
            x: -80,
            y: 10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

     
        gsap.to('.floating-flower:nth-of-type(3)', {
            x: 150,
            y: -20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.floating-flower:nth-of-type(4)', {
            x: -150,
            y: 30,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.floating-flower:nth-of-type(5)', {
            x: 100,
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
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
            <header style={{ position: "fixed", top: 0, width: '100%', height: '11vh', zIndex: 1200 }}>
                <HeaderBar></HeaderBar>
            </header>
            <main style={{ marginTop: '11vh', padding: '40px', height: "auto", overflow: 'hidden' }}>
                <Container maxWidth="md" sx={{
                    py: 4, borderRadius: "30px", boxShadow: "0px 10px 20px 10px #0000002b",
                }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        align="center"
                        style={{ color: "#104b4b" }}
                        className={`${Styles.antonFont}`}
                    >
                        Contacto
                    </Typography>

                    <Grid container spacing={4}>
                        {/* Formulario de contacto */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h5" gutterBottom fontFamily={'system-ui'}>
                                    Envíanos un mensaje
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id='nombre'
                                                label="Nombre"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id='email'
                                                label="Correo electrónico"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                type="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id='telefono'
                                                label="Teléfono"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                type="tel"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id='mensaje'
                                                label="Mensaje"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" fullWidth style={{ backgroundColor: "#104b4b" }} onClick={handleSubmit}>
                                                Enviar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h5" gutterBottom fontFamily={'system-ui'}>
                                    Información de Contacto
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }} fontFamily={'system-ui'}>
                                    <Phone sx={{ verticalAlign: 'middle', mr: 1 }} /> 977 75 55 23
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }} fontFamily={'system-ui'}>
                                    <Email sx={{ verticalAlign: 'middle', mr: 1 }} /> protectoratest@gmail.com
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }} fontFamily={'system-ui'}>
                                    <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} /> Carrer de l'Estudi, 12, 43201 Reus, Tarragona, España
                                </Typography>
                                <Typography variant="body1" fontFamily={'system-ui'}>
                                    Horarios de Atención: Lunes a Viernes, 9:00 AM - 6:00 PM
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom align="center" fontFamily={'system-ui'} mb={5}>
                                Encuéntranos en el Mapa
                            </Typography>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5156.444759832947!2d1.1273621825256344!3d41.14182021584191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a150ce5f4c869d%3A0xd52ed2992a707eb9!2sTecnoredessa%20Centro%20de%20Empresas!5e1!3m2!1ses!2ses!4v1722635631559!5m2!1ses!2ses"
                                width="100%"
                                height="400"
                                style={{ border: 0, marginBottom: "10vh" }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </Grid>
                    </Grid>
                </Container>

                {/* Modal de Confirmación */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            boxShadow: 24,
                            p: 4,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h2">
                            ¡Mensaje Enviado!
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
                        </Typography>
                        <Button
                            onClick={handleCloseModal}
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: "#104b4b"}}
                        >
                            Cerrar
                        </Button>
                    </Box>
                </Modal>

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
            <footer style={{ textAlign: "center", position: "relative", zIndex: "10" }}>
                <FooterPublic></FooterPublic>
            </footer>
        </>
    );
}

export default ContactPage;
