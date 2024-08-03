"use client";

import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import Styles from './donaciones.module.css';
import { gsap } from 'gsap';
import SimpleBottomNavigation from '@/_components/navigation/navigationNavBar';
import PrimarySearchAppBar from '@/_components/header/headerGradient';

export default function ContainedButtons() {
    useEffect(() => {
        gsap.fromTo(
            `.${Styles.contentContainer}`,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(
            `.${Styles.buttonDonate}`,
            { scale: 0.8 },
            { scale: 1, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" }
        );

        gsap.fromTo(
            `.${Styles.buttonContribute}`,
            { scale: 0.8 },
            { scale: 1, duration: 1, repeat: -1, yoyo: true, delay: 0.5, ease: "power1.inOut" }
        );
    }, []);

    return (
        <>
            <header>
                <PrimarySearchAppBar accessHref={''} accessLabel={''}/>
                <SimpleBottomNavigation labels={[]} icons={[]}></SimpleBottomNavigation>
            </header>
            <main>
                <Box className={`${Styles.backgroundContainer}`}>
                    <Grid container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        className={`${Styles.contentContainer}`}>
                        <Grid item xs={12}>
                            <Typography variant="h4" className={`${Styles.titleFont}`}>Sobre Happy Paws</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <hr className={`${Styles.divider}`} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={`${Styles.descriptionContainer}`}>
                                <Typography variant="h4" className={`${Styles.textFont}`}>
                                    Las donaciones son esenciales para las protectoras de animales, ya que permiten brindar atención médica, refugio y encontrar hogares amorosos para los animales rescatados. Cada contribución ayuda a salvar vidas y mejorar el bienestar de los animales sin hogar.
                                </Typography>
                                <Button variant="contained" href="https://buy.stripe.com/test_4gw5kY4ez7dF252aEG" className={`${Styles.buttonDonate}`}>
                                        Donar
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={`${Styles.buttonContainer}`}>
                                <Stack direction="column" spacing={2} justifyContent="center">
                                <Typography variant="body1" className={`${Styles.textFont}`}>
                                    Donar comida, mantas y juguetes a las protectoras de animales es una forma efectiva de apoyar su labor. Estos suministros básicos aseguran que los animales rescatados tengan sus necesidades cubiertas mientras esperan ser adoptados.
                                </Typography>
                                    <Button variant="contained" href="https://your-adoption-link.com" className={`${Styles.buttonContribute}`}>
                                        Aportar
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </main>
            <footer>
            </footer>
        </>
    );
}
