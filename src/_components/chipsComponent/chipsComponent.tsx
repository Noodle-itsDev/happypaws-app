import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Chip, Typography } from '@mui/material';

// Define la interfaz para los eventos
interface Event {
    id: number;
    nombreEvento: string;
    date: string;
    estado: string;
    tipoEvento: string;
}

const EventChips: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const usuarioJSON = localStorage.getItem("user");

                if (!usuarioJSON) {
                    location.href = "/signup";
                    return;
                }
                
                const usuario = JSON.parse(usuarioJSON);
                const usuarioId = usuario.idUsuario;

                const response = await axios.get(`http://194.164.165.239:8080/api/eventos/usuario/${usuarioId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const validEvents = events.filter(event => event.estado === "Asistido");

    console.log(events, validEvents);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                border: '1px solid rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                p: 1,
                borderRadius: 1,
                minHeight: '120px',
                maxHeight: '120px',
                overflowY: 'auto',
            }}
        >
            {loading ? (
                <Typography variant="body2" sx={{ color: '#104b4b', fontFamily: 'system-ui' }}>
                    Cargando eventos...
                </Typography>
            ) : validEvents.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#104b4b', fontFamily: 'system-ui' }}>
                    No hay eventos válidos registrados.
                </Typography>
            ) : (
                <Chip
                    label={`${validEvents.length} Veces asistido`}
                    color="primary"
                    sx={{ margin: '2px' }}
                />

            )}            
        </Box>
    );
};

export default EventChips;
