"use client";
import axios from 'axios';
import gsap from 'gsap/src';
import { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography, Box, TablePagination } from "@mui/material";
import ImgMediaCard from '@/_components/cardAnimales/cardAnimales';
import FilterAccordion from '@/_components/filterAccordion/filterAccordion';
import ChatAssistant from '@/_components/iaCom/iaCom';
import HeaderBar from '@/_components/headerBarPrivateUsuario/headerBar';
import FooterPrivate from '@/_components/FooterPrivate/footerPublic';
import ImgMediaCardShelter from '@/_components/cardAnimalesProtectora/cardAnimales';

interface Mascota {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    genero: string;
    edad: number;
    chip: boolean;
    numeroChip: string;
    estado: string;
    vacunado: boolean;
    esterilizacion: boolean;
    desparasitacionInterna: boolean;
    desparasitacionExterna: boolean;
    tratamientos: string;
    alergias: string;
    socializacion: string;
    informacionComportamiento: string;
    incidentes: string;
    fecha_defuncion: Date;
    imagen: string;
}

const PetsView: React.FC = () => {

    /** SEGURIDAD */
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const usuarioJSON = localStorage.getItem("user");

        if (!token || !usuarioJSON) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            location.href = "/logout";
            return;
        }

        const usuario = JSON.parse(usuarioJSON);

        if (usuario.protectoras.length != 0) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            location.href = "/logout";
        }
    }, [])
    /** FIN SEGURIDAD */

    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        especie: '',
        edad: 0,
        soloVoluntarios: false,
        soloAdopciones: false,
    });
    const [rowsPerPage, setRowsPerPage] = useState<number>(6);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const userJson = localStorage.getItem('user');

                if (!token) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    location.href = "/logout";
                }

                if (!userJson) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    location.href = "/logout";
                    return;
                }

                const usuario = JSON.parse(userJson);

                if (usuario.protectoras.length != 0) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    location.href = "/logout";
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
        if (filters.edad && mascota.edad < filters.edad) {
            return false;
        }
        // if (filters.soloVoluntarios && mascota.soloVoluntarios !== filters.soloVoluntarios) {
        //     return false;
        // }
        // if (filters.soloAdopciones && mascota.soloAdopciones !== filters.soloAdopciones) {
        //     return false;
        // }
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
                <HeaderBar></HeaderBar>
            </header>
            <main style={{ minHeight: "100vh" }}>
                <Grid container spacing={6} padding={8}>
                    <Grid item xs={12} md={3}>
                        <FilterAccordion filters={filters} setFilters={setFilters} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box>
                            <Grid container columnSpacing={0} rowSpacing={2} columnGap={-5}>
                                {currentItems.map((mascota) => (
                                    <Grid item xs={12} sm={6} md={3} key={mascota.id}>
                                        <ImgMediaCardShelter
                                            id={mascota.id}
                                            alergias={mascota.alergias}
                                            incidentes={mascota.incidentes}
                                            chip={mascota.chip}
                                            desparasitacionExterna={mascota.desparasitacionExterna}
                                            desparasitacionInterna={mascota.desparasitacionInterna}
                                            edad={mascota.edad}
                                            especie={mascota.especie}
                                            esterilizacion={mascota.esterilizacion}
                                            fecha_defuncion={mascota.fecha_defuncion}
                                            genero={mascota.genero}
                                            informacionComportamiento={mascota.informacionComportamiento}
                                            nombre={mascota.nombre}
                                            numeroChip={mascota.numeroChip}
                                            raza={mascota.raza}
                                            socializacion={mascota.socializacion}
                                            tratamientos={mascota.tratamientos}
                                            vacunado={mascota.vacunado}
                                            imagen={mascota.imagen}
                                            shareButtonLabel={''}
                                            learnMoreButtonLabel={''}
                                            estado={mascota.estado}
                                        />
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

                <Box>
                    <ChatAssistant />
                </Box>

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

            <footer>
                <FooterPrivate></FooterPrivate>
            </footer>
        </>
    );
};

export default PetsView;
