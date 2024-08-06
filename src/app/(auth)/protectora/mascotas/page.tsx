"use client";

import React, { lazy, Suspense } from 'react';
import { useState, useEffect } from 'react';
import './petsProtectora.module.css';
import { Grid, CircularProgress, Typography, Box, TablePagination, Accordion, AccordionSummary, AccordionDetails, Button, Modal, Container } from "@mui/material";
import axios from 'axios';
import ImgMediaCard from '@/_components/cardAnimalesProtectora/cardAnimales';
import FilterAccordion from '@/_components/filterAccordion/filterAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateMascota from '@/_components/formPet/formPet';
import UpdateMascota from '@/_components/formPetUpdate/formPetUpdate';
import HeaderBar from '@/_components/headerBarPrivateProtectora/headerBarPrivateProtectora/headerBar';
import FooterPrivate from '@/_components/FooterPrivate/footerPublic';
import ImgMediaCardShelter from '@/_components/cardAnimales/cardAnimales';
import ChatAssistant from '@/_components/iaCom/iaCom';

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

        if (usuario.protectoras.length == 0) {
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
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);

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
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res)
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
                <HeaderBar></HeaderBar>
            </header>
            <main style={{ overflow: "hidden",minHeight: "100vh",height: "auto" }}>
                <Grid container spacing={6} padding={10}>
                    <Grid item xs={12} md={3}>
                        <Box mb={2}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">Gestionar Mascotas</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <Typography variant="body1" gutterBottom>
                                            Aquí puedes gestionar todas las mascotas. Selecciona una de las opciones para continuar.
                                        </Typography>
                                        <Button variant="contained" color="primary" sx={{ mb: 1, width: '100%' }} onClick={() => setOpenModal(true)}>
                                            Añadir Nueva Mascota
                                        </Button>
                                        <Button variant="contained" color="secondary" sx={{ mb: 1, width: '100%' }} onClick={() => setOpenUpdate(true)}>
                                            Editar Mascotas Existentes
                                        </Button>
                                        <Button variant="contained" color="info" sx={{ mb: 1, width: '100%' }}>
                                            Eliminar Mascotas
                                        </Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <FilterAccordion filters={filters} setFilters={setFilters} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box>
                            <Grid container columnSpacing={0} rowSpacing={2} columnGap={-5}>
                                {currentItems.map((mascota) => (
                                    <Grid item xs={12} sm={6} md={3} key={mascota.id}>
                                        <ImgMediaCardShelter
                                            nombre={mascota.nombre}
                                            informacionComportamiento={mascota.informacionComportamiento}
                                            imagen={mascota.imagen}
                                            especie={mascota.especie}
                                            edad={mascota.edad}
                                            socializacion={mascota.socializacion}
                                            shareButtonLabel="Share"
                                            learnMoreButtonLabel="Learn More" id={0} 
                                            raza={mascota.raza} 
                                            genero={mascota.genero} 
                                            chip={mascota.chip} 
                                            numeroChip={mascota.numeroChip} 
                                            estado={mascota.estado} 
                                            vacunado={mascota.vacunado} 
                                            esterilizacion={mascota.esterilizacion} 
                                            desparasitacionInterna={mascota.desparasitacionInterna} 
                                            desparasitacionExterna={mascota.desparasitacionExterna} 
                                            tratamientos={mascota.tratamientos} 
                                            alergias={mascota.alergias} 
                                            incidentes={mascota.incidentes}
                                            fecha_defuncion={mascota.fecha_defuncion}                                        />
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
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Container maxWidth="sm" sx={{ bgcolor: 'background.paper', p: 4, mt: 8, borderRadius: 2 }}>
                        <CreateMascota />
                    </Container>
                </Modal>


                <Modal
                    open={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Container maxWidth="sm" sx={{ bgcolor: 'background.paper', p: 4, mt: 8, borderRadius: 2 }}>
                        <UpdateMascota />
                    </Container>
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
                <ChatAssistant/>
            </main>


            <footer>
                <FooterPrivate></FooterPrivate>
            </footer>
        </>

    );
};

export default PetsView;
