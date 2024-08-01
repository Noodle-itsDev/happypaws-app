"use client";

import { useState, useEffect } from 'react';
import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import { useRouter } from 'next/router';
import axios from 'axios';
import ImgMediaCard from '@/_components/cardAnimales/cardAnimales';
import FilterAccordion from '@/_components/filterAccordion/filterAccordion';

interface Mascota {
    imagen: string;
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    genero: string;
    edad: string;
    descripcion: string;
}

const PetsView: React.FC = () => {
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        especie: '',
        edad: '',
        soloVoluntarios: false,
        soloAdopciones: false,
    });

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    location.href = "/signup";
                    return;
                }

                const res = await axios.get<Mascota[]>('http://194.164.165.239:8080/api/mascota/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.status === 200) {
                    setMascotas(res.data);
                } else {
                    localStorage.removeItem('authToken');
                    location.href = "/signup";
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <header>
                <PrimarySearchAppBar accessHref={""} accessLabel={""} />
                <SimpleBottomNavigation labels={{
                    textoUno: "",
                    textoDos: "",
                    textoTres: "",
                    textoCuatro: "",
                    textoCinco: "",
                    textoSeis: ""
                }} />
            </header>
            <main>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <FilterAccordion filters={filters} setFilters={setFilters} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box>
                            <Grid container spacing={2}>
                                {mascotas.filter(mascota => {
                                    if (filters.especie && mascota.especie !== filters.especie) {
                                        return false;
                                    }
                                    if (filters.edad && mascota.edad <= filters.edad) {
                                        return false;
                                    }
                                    // Apply other filters as needed
                                    return true;
                                }).map((mascota) => (
                                    <Grid item xs={12} sm={6} md={4} key={mascota.id}>
                                        <ImgMediaCard
                                            title={mascota.nombre}
                                            description={mascota.descripcion}
                                            imageSrc={mascota.imagen}
                                            raza={mascota.raza}
                                            genero={mascota.genero}
                                            edad={mascota.edad}
                                            shareButtonLabel="Share"
                                            learnMoreButtonLabel="Learn More"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </main>
            <footer>
                <Footer color={"orange"} />
            </footer>
        </>
    );
};

export default PetsView;
