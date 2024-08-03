"use client";

import { useState, useEffect } from 'react';
import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Grid, CircularProgress, Typography, Box, TablePagination, Accordion, AccordionSummary, AccordionDetails, Button, Modal, Container } from "@mui/material";
import axios from 'axios';
import ImgMediaCard from '@/_components/cardAnimales/cardAnimales';
import FilterAccordion from '@/_components/filterAccordion/filterAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateMascota from '@/_components/formPet/formPet';
import updateMascota from '@/_components/formPetUpdate/formPetUpdate';
import UpdateMascota from '@/_components/formPetUpdate/formPetUpdate';

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
        if (filters.edad && mascota.edad !== filters.edad) {
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
                <PrimarySearchAppBar accessHref={''} accessLabel={''} />
                <SimpleBottomNavigation labels={[]} icons={[]}/>
            </header>
            <main>
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
                                        <Button variant="contained" color="secondary" sx={{ mb: 1, width: '100%' }} onClick={() =>setOpenUpdate(true)}>
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
                                        <ImgMediaCard
                                            title={mascota.nombre}
                                            description={mascota.descripcion}
                                            imageSrc={mascota.imagen}
                                            especie={mascota.especie}
                                            edad={mascota.edad}
                                            shareButtonLabel="Share"
                                            learnMoreButtonLabel="Learn More" 
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
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </main>

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
                        bottom: '10%',
                        right: '10%',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#104b4b',
                        opacity: 1,
                        zIndex: -200
                    }}
                ></Box>
                <Box
                    className="floating-circle"
                    sx={{
                        position: 'absolute',
                        top: '-5%',
                        left: '-10%',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        backgroundColor: '#fda547',
                        opacity: 0.6,
                        zIndex: -200
                    }}
                ></Box>
                <Box
                    className="floating-circle"
                    sx={{
                        position: 'absolute',
                        top: '90%',
                        right: '-15%',
                        width: '520px',
                        height: '520px',
                        borderRadius: '50%',
                        backgroundColor: '#94cf98',
                        opacity: 0.6,
                        zIndex: -200
                    }}
                ></Box>
                <Box
                    className="floating-flower"
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '10%',
                        width: '80px',
                        height: '80px',
                        backgroundImage: 'url(/img/florAzul.png)', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7,
                        zIndex: -200
                    }}
                ></Box>
                <Box
                    className="floating-flower"
                    sx={{
                        position: 'absolute',
                        top: '30%',
                        right: '-6%',
                        width: '500px',
                        height: '500px',
                        backgroundImage: 'url(/img/florAzul.png)', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7,
                        zIndex: -200
                    }}
                ></Box>

        </>
    );
};

export default PetsView;
