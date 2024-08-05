"use client";

import * as React from 'react';
import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import Styles from './donaciones.module.css';
import { gsap } from 'gsap';
import SimpleBottomNavigation from '@/_components/navigation/navigationNavBar';
import PrimarySearchAppBar from '@/_components/header/headerGradient';
import { SelectChangeEvent } from '@mui/material/Select';
import HeaderBar from '@/_components/headerBarPublic/headerBarPublic/headerBar';
import FooterPublic from '@/_components/FooterPublic/footerPublic';

interface Errors {
    email?: string;
    donationType?: string;
    otherDetails?: string;
    comments?: string;
}

// Conjunto de palabras clave opcionales
const relevantKeywords = new Set([
    'protectora', 'comida', 'pienso'
]);

const isCommentRelevant = (text: string) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.some(word => relevantKeywords.has(word));
};

export default function ContainedButtons() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [donationType, setDonationType] = useState<string>('');
    const [otherDetails, setOtherDetails] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        const totalDuration = 6;
        const baseDuration = totalDuration / 6;


        gsap.fromTo(
            `.${Styles.contentContainer}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration, ease: "power3.out" }
        );

        gsap.fromTo(
            `.${Styles.titleFont}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration, ease: "power3.out", delay: baseDuration * 0.5 }
        );

        gsap.fromTo(
            `.${Styles.divider}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration, ease: "power3.out", delay: baseDuration * 1.0 }
        );

        gsap.fromTo(
            `.${Styles.descriptionContainer}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration, ease: "power3.out", delay: baseDuration * 1.5 }
        );

        gsap.fromTo(
            `.${Styles.buttonDonate}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration, ease: "power3.out", delay: baseDuration * 2.0 }
        );

        gsap.fromTo(
            `.${Styles.buttonContribute}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration, ease: "power3.out", delay: baseDuration * 2.5 }
        );

        // Animación de fade-in para las imágenes al final
        gsap.fromTo(
            `.${Styles.backgroundImage}`,
            { opacity: 0 },
            { opacity: 1, duration: baseDuration * 2, ease: "power3.out", delay: totalDuration - baseDuration * 2 }
        );
    }, []);

    useEffect(() => {
        if (openModal) {

            gsap.fromTo(
                '.MuiDialog-root',
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power3.out" }
            );


            gsap.fromTo(
                '.MuiDialogTitle-root',
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.2 }
            );

            gsap.fromTo(
                '.MuiDialogContent-root > *',
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.1, delay: 0.4 }
            );

            gsap.fromTo(
                '.MuiDialogActions-root',
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.6 }
            );
        }
    }, [openModal]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    const handleChangeDonationType = (event: SelectChangeEvent<string>) => setDonationType(event.target.value);

    const handleChangeOtherDetails = (event: ChangeEvent<HTMLInputElement>) => setOtherDetails(event.target.value);

    const handleChangeComments = (event: ChangeEvent<HTMLInputElement>) => {
        const newComments = event.target.value;
        setComments(newComments);
        if (!isCommentRelevant(newComments)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                comments: 'El comentario debe estar relacionado con temas de protectora, comida o pienso.'
            }));
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                comments: ''
            }));
        }
    };

    const handleSubmit = async () => {
        const wordCount = comments.trim().split(/\s+/).length;
        const newErrors: Errors = {};

        if (!email) newErrors.email = "El correo electrónico es requerido.";
        if (!donationType) newErrors.donationType = "Debe seleccionar un tipo de donación.";
        if (donationType === 'otros' && !otherDetails) newErrors.otherDetails = "Debe especificar otros detalles.";
        if (wordCount < 20) newErrors.comments = "El comentario debe tener al menos 20 palabras.";
        if (!isCommentRelevant(comments)) newErrors.comments = "El comentario debe estar relacionado con temas de protectora, comida o pienso.";

        if (Object.keys(newErrors).length === 0) {


            try {
                const response = await axios.post('http://194.164.165.239:8080/api/another/donation', {
                    email: email,
                    mensaje: comments,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    console.log('Datos enviados correctamente');
                    setEmail('');
                    setDonationType('');
                    setOtherDetails('');
                    setComments('');
                    handleCloseModal();
                } else {
                    console.error('Error en el envío de datos');
                }
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            <header>
                <HeaderBar></HeaderBar>
            </header>
            <main style={{
                width: '100vw',

            }}>
                <Box
                    className={`${Styles.backgroundContainer}`}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: 'url(/img/image.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100vw',
                        height: '140vh',
                        position: 'relative',
                        overflow: 'hidden',
                        fontFamily: `'Raleway', sans-serif`,
                    }}
                >
                    <Grid container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        className={`${Styles.contentContainer}`}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                className={`${Styles.titleFont}`}
                                marginBottom={"7vh"}
                            >
                                Donación
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <hr className={`${Styles.divider}`} />
                        </Grid>
                        <Grid item xs={12} container spacing={2} alignItems="center" justifyContent="center" borderBottom={"1px solid white"} style={{ backgroundColor: "#ffffff6b", borderRadius: "30px" }}>
                            <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
                                <Box
                                    className={`${Styles.descriptionContainer}`}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        backgroundColor: "transparent",
                                        boxShadow: "none"
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        className={`${Styles.textFont}`}
                                    >
                                        Las donaciones son esenciales para las protectoras de animales, ya que permiten brindar atención médica, refugio y encontrar hogares amorosos para los animales rescatados. Cada contribución ayuda a salvar vidas y mejorar el bienestar de los animales sin hogar.
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid className={`${Styles.rotate}`} item xs={12} md={6} container justifyContent="center" marginBottom={"20px"}>
                                <Box sx= {{}}>
                                    <Button
                                        variant="contained"
                                        href="https://buy.stripe.com/test_4gw5kY4ez7dF252aEG"
                                        className={`${Styles.pulse}`}
                                        sx={{ borderRadius: "50%", minWidth: "200px", minHeight: "200px" }}
                                    >
                                        Donar
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={2} alignItems="center" marginTop={"4vh"} marginBottom={"20px"} style={{ backgroundColor: "#ffffff6b", borderRadius: "30px", }}>
                            <Grid item xs={12} md={6} container justifyContent="center" className={`${Styles.rotateLeft}`} marginTop={"20px"}>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenModal}
                                    className={`${Styles.buttonContribute}`}
                                    sx={{
                                        backgroundColor: "transparent",
                                        boxShadow: "none"
                                    }}
                                >
                                    Aportar
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6} container alignItems="center" justifyContent="flex-start">
                                <Box
                                    className={`${Styles.descriptionContainer}`}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        className={`${Styles.textFont}`}
                                    >
                                        Donar comida, mantas y juguetes a las protectoras de animales es una forma efectiva de apoyar su labor. Estos suministros básicos aseguran que los animales rescatados tengan sus necesidades cubiertas mientras esperan ser adoptados.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Dialog
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enviar Información</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={handleChangeEmail}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <FormControl fullWidth margin="normal" error={!!errors.donationType}>
                            <InputLabel id="donation-type-label">Tipo de Donación</InputLabel>
                            <Select
                                labelId="donation-type-label"
                                id="donation-type"
                                value={donationType}
                                onChange={handleChangeDonationType}
                                label="Tipo de Donación"
                            >
                                <MenuItem value="comida">Donar comida</MenuItem>
                                <MenuItem value="utensilios">Donar utensilios</MenuItem>
                                <MenuItem value="juguetes">Donar juguetes</MenuItem>
                                <MenuItem value="otros">Otros</MenuItem>
                            </Select>
                            {errors.donationType && (
                                <FormHelperText>{errors.donationType}</FormHelperText>
                            )}
                        </FormControl>
                        {donationType === 'otros' && (
                            <TextField
                                required
                                margin="normal"
                                id="other-details"
                                label="Especificar"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={otherDetails}
                                onChange={handleChangeOtherDetails}
                                error={!!errors.otherDetails}
                                helperText={errors.otherDetails}
                            />
                        )}
                        <TextField
                            margin="normal"
                            id="comments"
                            label="Comentarios"
                            type="text"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={comments}
                            onChange={handleChangeComments}
                            error={!!errors.comments}
                            helperText={errors.comments}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Enviar
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
            <footer>
                <FooterPublic></FooterPublic>
            </footer>
        </>
    );
}
