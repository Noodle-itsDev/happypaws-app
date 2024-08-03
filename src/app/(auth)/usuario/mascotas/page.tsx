"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Grid, CircularProgress, Typography, Box, TablePagination } from "@mui/material";

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
    const [rowsPerPage, setRowsPerPage] = useState<number>(6);
    const [page, setPage] = useState<number>(0);

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

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredMascotas = mascotas.filter(mascota => {
        if (filters.especie && mascota.especie !== filters.especie) {
            return false;
        }
        if (filters.edad && mascota.edad <= filters.edad) {
            return false;
        }
        // Apply other filters as needed
        return true;
    });

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentItems = filteredMascotas.slice(startIndex, endIndex);
    const pageCount = Math.ceil(filteredMascotas.length / rowsPerPage);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <header>
                <PrimarySearchAppBar accessHref={''} accessLabel={''}/>
                <SimpleBottomNavigation labels={[]} icons={[]} />
            </header>
            <main>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={3}>
                        <FilterAccordion filters={filters} setFilters={setFilters} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box>
                            <Grid container columnSpacing={0} rowSpacing={2} columnGap={-5}>
                                {currentItems.map((mascota) => (
                                    <Grid item xs={12} sm={6} md={3} key={mascota.id}>
                                        <ImgMediaCard
                                            title={mascota.nombre}
                                            description={mascota.descripcion}
                                            imageSrc={mascota.imagen}
                                            edad={mascota.edad}
                                            shareButtonLabel="Share"
                                            learnMoreButtonLabel="Learn More" 
                                            especie={''}                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Box mt={2} display="flex" justifyContent="center">
                                <TablePagination
                                    component="div"
                                    count={filteredMascotas.length}
                                    page={page}
                                    onPageChange={handlePageChange}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    rowsPerPageOptions={[6, 12, 32]}
                                    labelRowsPerPage="Cantidad de Cards"
                                />
                            </Box>
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
