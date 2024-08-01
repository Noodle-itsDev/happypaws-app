"use client";

import axios from "axios";
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { EventClickArg, EventInput, DateSelectArg, EventChangeArg } from '@fullcalendar/core/index.js';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<{
        id: string;
        title: string;
        description: string;
        start: string;
        end: string;
    } | null>(null);

    useEffect(() => {
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
                return;
            }

            const usuario = JSON.parse(userJson);
            const usuarioId = usuario.idUsuario;
            console.log(userJson, token, usuarioId);
            const response = await axios.get(`http://194.164.165.239:8080/api/eventos/usuario/${usuarioId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const transformedEvents = response.data.map((event: any) => ({
                id: event.eventoId,
                title: event.nombreEvento,
                description: event.descripcion,
                start: event.fechaInicio,
                end: event.fechaFin,
                extendedProps: {
                    inicio: event.fechaInicio,
                    final: event.fechaFin,
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
        });
        setOpen(true);
    };

    const handleEventChange = async (changeInfo: EventChangeArg) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Token not found in localStorage');
                return;
            }

            const updatedEvent = {
                eventoId: changeInfo.event.id,
                nombreEvento: changeInfo.event.title,
                descripcion: changeInfo.event.extendedProps.description,
                fechaInicio: changeInfo.event.start?.toISOString(),
                fechaFin: changeInfo.event.end?.toISOString(),
            };

            await axios.put(`http://194.164.165.239:8080/api/eventos/${changeInfo.event.id}`, updatedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            setSuccess('Event updated successfully');
            fetchEvents(); // Refresh events after update
        } catch (error) {
            handleError(error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div style={{ maxWidth: '90vh', margin: '0 auto' }}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridWeek"
                locale={esLocale}
                editable={true}
                droppable={true}
                selectable={true}
                aspectRatio={1.5}
                height={"80vh"}
                headerToolbar={{
                    left: 'prev,today,next',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek',
                }}
                eventClick={handleEventClick}
                eventChange={handleEventChange}
                events={events}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    bgcolor: '#3bb688ba',
                    border: '2px solid #000',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <span style={{ fontWeight: '600' }}>{selectedEvent?.title || 'No Title'}</span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyItems: 'center', alignItems: 'center' }}>
                            <div><label htmlFor="">Evento</label></div>
                            <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.description} /></div>
                        </div>
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyItems: 'center', alignItems: 'center' }}>
                            <div><label htmlFor="">Inicio</label></div>
                            <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.start || ''} /></div>
                        </div>
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyItems: 'center', alignItems: 'center' }}>
                            <div><label htmlFor="">Fin</label></div>
                            <div><input type="text" style={{ padding: '0.3rem 2rem', borderRadius: '2px', backgroundColor: 'lightgrey' }} readOnly value={selectedEvent?.end || ''} /></div>
                        </div>
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: '3rem' }}>
                        <button onClick={handleClose} style={{ marginTop: '16px', borderRadius: '4px', padding: '0.6rem 1.3rem', backgroundColor: 'red' }}>Eliminar</button>
                        <button onClick={handleClose} style={{ marginTop: '16px', borderRadius: '4px', padding: '0.6rem 1.3rem', backgroundColor: 'lightgrey' }}>Cerrar</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Calendar;