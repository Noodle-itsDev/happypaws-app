"use client";

import axios from "axios";
import Styles from './eventsUsers.module.css';
import gsap from "gsap";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Button, Grid, TextField } from "@mui/material";

interface Usuario {
    idUsuario: string;
    nombre: string;
}

interface Mascota {
    id: string,
    nombre: string,
    edad: number
}

interface DataForModal {
    data1: Usuario[];
    data2: Mascota[];
}

const CalendarUser: React.FC = () => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);
    const [dataForModal, setDataForModal] = useState<DataForModal | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<{
        id: string;
        title: string;
        description: string;
        start: string;
        end: string;
        nombre: string;
        apellidos: string;
        telefono: string;
        email: string;
        estado: string;
    } | null>(null);

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');

        if (!userJson || !token) {
            setError('User or token not found in localStorage');
            location.href = "/signup";
            return;
        }

        const usuario = JSON.parse(userJson);

        if (usuario.protectoras.length != 0) {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            location.href = "/signup";
        }
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setError(null);
            setSuccess(null);

            const userJson = localStorage.getItem('user');
            const token = localStorage.getItem('authToken');

            if (!userJson || !token) {
                setError('User or token not found in localStorage');
                location.href = "/signup";
                return;
            }

            const usuario = JSON.parse(userJson);
            const usuarioId = usuario.idUsuario;

            if (usuario.protectoras.length != 0) {
                localStorage.removeItem('user');
                localStorage.removeItem('authToken');
                location.href = "/signup";
            }

            console.log(usuarioId);
            const response = await axios.get(`http://194.164.165.239:8080/api/eventos/usuario/${usuarioId}`, {
                //const response = await axios.get(`http://194.164.165.239:8080/api/eventos/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const activeEvents = response.data.filter((event: any) => event.estado !== "Inactivo");
            const transformedEvents = activeEvents.map((event: any) => ({
                id: event.eventoId,
                title: event.nombreEvento,
                description: event.descripcion,
                start: event.fechaInicio,
                end: event.fechaFin,
                extendedProps: {
                    inicio: event.fechaInicio,
                    final: event.fechaFin,
                    nombre: event.usuario.nombre,
                    apellidos: event.usuario.apellidos,
                    telefono: event.usuario.telefono,
                    email: event.usuario.email,
                    tipoEvento: event.tipoEvento,
                    estado: event.estado,
                }
            }));
            setEvents(transformedEvents);
        } catch (error: unknown) {
            handleError(error);
        }
    };

    const handleError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                setError(`Error response: ${error.response.statusText}`);
                console.error('Error response data:', error.response);
            } else if (error.request) {
                setError('No response received from the server');
                console.error('Error request data:', error.request);
            } else {
                setError(`Error message: ${error.message}`);
                console.error('Error message:', error.message);
            }
        } else {
            setError(`Error message: ${(error as Error).message}`);
            console.error('Unexpected error:', (error as Error).message);
        }
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            description: clickInfo.event.extendedProps.description as string,
            start: clickInfo.event.extendedProps.inicio as string,
            end: clickInfo.event.extendedProps.final as string,
            nombre: clickInfo.event.extendedProps.nombre,
            apellidos: clickInfo.event.extendedProps.apellidos,
            telefono: clickInfo.event.extendedProps.telefono,
            email: clickInfo.event.extendedProps.email,
            estado: clickInfo.event.extendedProps.estado,
        });
        setOpen(true);
    };

    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleClose();
        }
    };


    const handleClose = () => {
        setOpen(false);
        setSelectedEvent(null);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setSelectedMascota(null);
    };

    const handleDeshabilitarEvento = async () => {
        if (!selectedEvent) return;

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Token not found in localStorage');
                return;
            }

            await axios.put(`http://194.164.165.239:8080/api/eventos/disable/${selectedEvent.id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setSuccess('Event disabled successfully');
            setOpen(false);
            setSelectedEvent(null);
            fetchEvents();
        } catch (error) {
            handleError(error);
        }
    };

    const handleAddEvent = async (newEvent: EventInput) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Token not found in localStorage');
                return;
            }

            await axios.post(`http://194.164.165.239:8080/api/eventos`, newEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setSuccess('Event added successfully');
            setOpenAddModal(false);
            fetchEvents();
        } catch (error) {
            handleError(error);
        }
    };

    const renderEventContent = (eventInfo: any) => {
        let bgColor = "";
        switch (eventInfo.event['_def'].extendedProps.estado) {
            case "Pendiente":
                bgColor = "#757575";
                break;
            case "Asistido":
                bgColor = "#4cab24";
                break;
            case "No asistido":
                bgColor = "#181a17";
                break;
            case "Aceptado":
                bgColor = "#0356d3";
                break;
            case "Cancelado":
                bgColor = "#d51212";
                break;
        }
        return (
            <div style={{ margin: '0px', padding: '5px', backgroundColor: bgColor, borderRadius: '5px' }}>
                <b>{eventInfo.event.title}</b>
            </div>
        );
    };

    const handleAddButtonClick = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                setError('Token not found in localStorage');
                return;
            }

            const [response1, response2] = await Promise.all([
                axios.get('http://194.164.165.239:8080/api/user/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }),
                axios.get('http://194.164.165.239:8080/api/mascota/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
            ]);

            const data1: Usuario[] = response1.data;
            const data2: Mascota[] = response2.data;
            setUsuarios(data1);
            setMascotas(data2);
            const randomMascota = data2[Math.floor(Math.random() * data2.length)];
            setSelectedMascota(randomMascota);
            setOpenAddModal(true);

        } catch (error) {
            handleError(error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmitCrear = async (event: React.FormEvent) => {
        event.preventDefault();

        const startDateInput = (document.getElementById('fechaEvento') as HTMLInputElement).value;
        const mascotaId = selectedMascota?.id;
        const start = formatDate(startDateInput);
        const userJson = localStorage.getItem('user');

        if (!userJson) {
            setError('User or token not found in localStorage');
            location.href = "/signup";
            return;
        }
        const usuario = JSON.parse(userJson);
        const usuarioId = usuario.idUsuario;

        const newEvent = {
            nombreEvento: "Voluntariado",
            descripcion: "Evento para promover el bienestar animal.)",
            fechaInicio: start,
            fechaFin: start,
            finalizado: false,
            usuario: { idUsuario: Number(usuarioId) },
            mascota: { id: Number(mascotaId) },
            protectora: { idProtectora: 16 },
            estado: "Pendiente",
            tipoEvento: "Voluntariado",
        };

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Token not found in localStorage');
                return;
            }

            await axios.post(`http://194.164.165.239:8080/api/eventos/create`, newEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            setSuccess('Event added successfully');
            setOpenAddModal(false);
            fetchEvents();
        } catch (error) {
            handleError(error);
        }
    };

    const handleModificarEstado = async (event: React.FormEvent) => {
        event.preventDefault();
        const estado = (document.getElementById('estadosEvento') as HTMLSelectElement).value;
        const id = (document.getElementById('idEvento') as HTMLSelectElement).value;
        let estadoSend = 0;
        switch (estado) {
            case "Pendiente":
                estadoSend = 0;
                break;
            case "Aceptado":
                estadoSend = 1;
                break;
            case "Cancelado":
                estadoSend = 2;
                break;
            case "Asistido":
                estadoSend = 3;
                break;
            case "No asistido":
                estadoSend = 4;
                break;
        }

        try {

            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Token not found in localStorage');
                return;
            }

            const response = await axios.put(`http://194.164.165.239:8080/api/eventos/state/update/${id}/${estadoSend}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error al actualizar el estado del evento:', error.response?.data || error.message);
            } else {
                console.error('Ocurrió un error inesperado:', error);
            }
        }

        handleClose();
        fetchEvents();
    }
    useEffect(() => {
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
            <header style={{}}>
                <PrimarySearchAppBar accessHref={""} accessLabel={""} />
                <SimpleBottomNavigation labels={[]} icons={[]} />
            </header>
            <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
                <Grid style={{ backgroundColor: "#abddf13b", padding: "10px 40px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "40px", boxShadow: "0px 20px 20px 20px #00000029", marginTop: "8vh" }}>
                    <div style={{ maxWidth: '100vh', margin: '0 auto', marginTop: '15vh', width: '65vw' }}>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        {success && <div style={{ color: 'green' }}>{success}</div>}
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}

                            initialView="listMonth"
                            locale={esLocale}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            height={"70vh"}
                            customButtons={{
                                addButton: {
                                    text: 'Añadir Evento',
                                    click: handleAddButtonClick,
                                },
                            }}
                            headerToolbar={{
                                left: 'prev,today,next',
                                center: 'title',
                                right: 'addButton'
                            }}
                            //eventClick={handleEventClick}
                            eventContent={renderEventContent}
                            events={events} />

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            onClick={handleClickOutside}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: '#2a8361',
                                borderRadius: '10px',
                                boxShadow: 24,
                                p: 5,
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <span style={{ fontWeight: '600' }}>{selectedEvent?.title || 'No Title'}</span>
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <div>
                                        <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.nombre || ''} /></div>
                                    </div>
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <div>
                                        <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.apellidos || ''} /></div>
                                    </div>
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <div>
                                        <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.telefono || ''} /></div>
                                    </div>
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <div>
                                        <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.email || ''} /></div>
                                    </div>
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: "1.0rem" }}>
                                    <span style={{ fontWeight: '600' }}>Modificar estado</span>
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <input type="hidden" name="" id="idEvento" value={selectedEvent?.id} />
                                    <div>
                                        <select name="estadosEvento" id="estadosEvento" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }}>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Aceptado">Aceptado</option>
                                            <option value="Cancelado">Cancelado</option>
                                            <option value="Asistido">Asistido</option>
                                            <option value="No asistido">No asistido</option>
                                        </select>
                                    </div>
                                </Typography>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: '1rem' }}>
                                    <button onClick={handleDeshabilitarEvento} style={{ marginTop: '16px', borderRadius: '4px', padding: '0.6rem 1.3rem', backgroundColor: 'red' }}>Eliminar</button>
                                    <button onClick={handleModificarEstado} style={{ marginTop: '16px', borderRadius: '4px', padding: '0.6rem 1.3rem', backgroundColor: 'orange' }}>Modificar</button>
                                    <button onClick={handleClose} style={{ marginTop: '16px', borderRadius: '4px', padding: '0.6rem 1.3rem', backgroundColor: 'lightgrey' }}>Cerrar</button>
                                </div>
                            </Box>
                        </Modal>

                        <Modal
                            open={openAddModal}
                            onClose={handleCloseAddModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            onClick={handleClickOutside}
                            
                        >
                            <Box ref={modalRef} sx={{
                                displayPrint: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center",
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                alignItems: 'center',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: '#fda547',
                                borderRadius: '10px',
                                boxShadow: 24,
                                p: 5,
                                textAlign: "center"
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '2rem', fontFamily: "system-ui",  marginLeft: "auto", marginRight: "auto"}}>
                                    Crear evento
                                </Typography>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const newEvent = {
                                        title: formData.get('title'),
                                        description: formData.get('description'),
                                        start: formData.get('start'),
                                        end: formData.get('end'),
                                    };
                                    await handleAddEvent(newEvent as EventInput);
                                }}>
                                    <TextField
                                        fullWidth
                                        label="Fecha de Inicio"
                                        type="date"
                                        name="start"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        sx={{ marginBottom: '16px' }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mascota"
                                        name="mascotaEvento"
                                        value={`${selectedMascota?.nombre}, ${selectedMascota?.edad}`}
                                        InputProps={{ readOnly: true }}
                                        sx={{ marginBottom: '16px' }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ borderRadius: '4px', padding: '0.6rem 1.3rem', backgroundColor: 'lightgrey', display: "flex", justifyContent: "center", alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}
                                    >
                                        Crear
                                    </Button>
                                </form>
                            </Box>
                        </Modal>
                    </div>
                    <div>
                        <div style={{ textAlign: 'center', fontWeight: '600', fontSize: '20px', margin: '2rem 0 0.4rem 0' }}>Leyenda</div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: '0.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '100%', backgroundColor: '#757575' }}></div>
                                <div><span>Pendiente</span></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '100%', backgroundColor: '#0356d3' }}></div>
                                <div><span>Aceptado</span></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '100%', backgroundColor: '#d51212' }}></div>
                                <div><span>Cancelado</span></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '100%', backgroundColor: '#4cab24' }}></div>
                                <div><span>Asistido</span></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '100%', backgroundColor: '#181a17' }}></div>
                                <div><span>No asistido</span></div>
                            </div>
                        </div>
                    </div>
                </Grid>
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
                    className={`${Styles.floatingFlower}`}
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '10%',
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
                        left: '-6%',
                        width: '500px',
                        height: '500px',
                        backgroundImage: 'url(/img/florAzul.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7,
                        zIndex: -200
                    }}
                ></Box>
            </main>
        </>
    );
};

export default CalendarUser;
