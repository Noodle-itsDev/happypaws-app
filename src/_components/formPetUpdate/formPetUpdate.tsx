"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel, InputAdornment, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

const UpdateMascota: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [genero, setGenero] = useState('');
    const [edad, setEdad] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [chip, setChip] = useState<boolean>(false);
    const [chipNumber, setChipNumber] = useState<string>('');
    const [estado, setEstado] = useState('');
    const [vacunado, setVacunado] = useState<boolean>(false);
    const [vacunas, setVacunas] = useState<string[]>([]);
    const [esterilizacion, setEsterilizacion] = useState<boolean>(false);
    const [desparasitacionInterna, setDesparasitacionInterna] = useState<boolean>(false);
    const [desparasitacionExterna, setDesparasitacionExterna] = useState<boolean>(false);
    const [tratamientos, setTratamientos] = useState('');
    const [alergias, setAlergias] = useState('');
    const [socializacion, setSocializacion] = useState('');
    const [informacionComportamiento, setInformacionComportamiento] = useState('');
    const [incidentes, setIncidentes] = useState('');
    const [fechaDefuncion, setFechaDefuncion] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [mascotas, setMascotas] = useState<{ id: string; nombre: string; edad: number }[]>([]);
    const [selectedMascota, setSelectedMascota] = useState<string>('');

    useEffect(() => {
        const fetchMascotas = async () => {
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                alert('No estás autenticado. Por favor, inicia sesión.');
                return;
            }

            try {
                const response = await axios.get('http://194.164.165.239:8080/api/mascota/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setMascotas(response.data); // Guarda los datos en el estado
            } catch (error) {
                console.error('Error al obtener mascotas:', error);
                setError('Ocurrió un error al obtener las mascotas');
            }
        };

        fetchMascotas();
    }, []);

    const fetchMascotaData = async (id: string) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            return;
        }

        try {
            const response = await axios.get(`http://194.164.165.239:8080/api/mascota/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const mascota = response.data;
            setNombre(mascota.nombre);
            setEspecie(mascota.especie);
            setRaza(mascota.raza);
            setGenero(mascota.genero);
            setEdad(mascota.edad);
            setDescription(mascota.description);
            setChip(mascota.chip);
            setChipNumber(mascota.numeroChip);
            setEstado(mascota.estado);
            setVacunado(mascota.vacunado);
            setVacunas(mascota.vacunas ? mascota.vacunas.split(',') : []);
            setEsterilizacion(mascota.esterilizacion);
            setDesparasitacionInterna(mascota.desparasitacionInterna);
            setDesparasitacionExterna(mascota.desparasitacionExterna);
            setTratamientos(mascota.tratamientos);
            setAlergias(mascota.alergias);
            setSocializacion(mascota.socializacion);
            setInformacionComportamiento(mascota.informacionComportamiento);
            setIncidentes(mascota.incidentes);
            setFechaDefuncion(mascota.fechaDefuncion);
        } catch (error) {
            console.error('Error al obtener datos de la mascota:', error);
            setError('Ocurrió un error al obtener los datos de la mascota');
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
    };

    const handleChipChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChip(event.target.checked);
    };

    const handleVacunadoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVacunado(event.target.checked);
        if (!event.target.checked) {
            setVacunas([]);
        }
    };

    const handleEstadoChange = (event: SelectChangeEvent<string>) => {
        setEstado(event.target.value as string);
        if (event.target.value !== 'Fallecido') {
            setFechaDefuncion('');
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('especie', especie);
        formData.append('raza', raza);
        formData.append('genero', genero);
        formData.append('edad', edad.toString());
        formData.append('description', description);
        formData.append('chip', chip.toString());
        formData.append('numeroChip', chipNumber);
        formData.append('estado', estado);
        formData.append('vacunado', vacunado.toString());
        if (vacunado) {
            formData.append('vacunas', vacunas.join(','));
        }
        formData.append('esterilizacion', esterilizacion.toString());
        formData.append('desparasitacionInterna', desparasitacionInterna.toString());
        formData.append('desparasitacionExterna', desparasitacionExterna.toString());
        formData.append('tratamientos', tratamientos);
        formData.append('alergias', alergias);
        formData.append('socializacion', socializacion);
        formData.append('informacionComportamiento', informacionComportamiento);
        formData.append('incidentes', incidentes);
        if (estado === 'Fallecido') {
            formData.append('fechaDefuncion', fechaDefuncion);
        }
        if (selectedImage) {
            formData.append('file', selectedImage);
        }

        try {
            const response = await axios.put('http://194.164.165.239:8080/api/mascota/update', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Mascota actualizada correctamente');
                location.reload();
            }
        } catch (error) {
            console.error('Error al actualizar mascota:', error);
            setError('Ocurrió un error al actualizar la mascota');
        } finally {
            setLoading(false);
        }
    };

    const handleMascotaSelect = (event: SelectChangeEvent<string>) => {
        const selectedId = event.target.value;
        setSelectedMascota(selectedId);
        fetchMascotaData(selectedId);
    };

    return (
        <Container
            sx={{
                width: '100%',
                maxWidth: '600px',
                height: '80vh',
                overflowY: 'auto',
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Actualizar Mascota
            </Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Mascota</InputLabel>
                            <Select
                                value={selectedMascota}
                                onChange={handleMascotaSelect}
                                label="Mascota"
                            >
                                {mascotas.map(mascota => (
                                    <MenuItem key={mascota.id} value={mascota.id}>
                                        {mascota.nombre} ({mascota.edad} años)
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Especie"
                            value={especie}
                            onChange={(e) => setEspecie(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Raza"
                            value={raza}
                            onChange={(e) => setRaza(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Género"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Edad"
                            value={edad}
                            onChange={(e) => setEdad(parseInt(e.target.value))}
                            fullWidth
                            margin="normal"
                            required
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={chip} onChange={handleChipChange} />}
                            label="¿Tiene chip?"
                        />
                        {chip && (
                            <TextField
                                label="Número de Chip"
                                value={chipNumber}
                                onChange={(e) => setChipNumber(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={estado}
                                onChange={handleEstadoChange}
                                label="Estado"
                            >
                                <MenuItem value="Vivo">Vivo</MenuItem>
                                <MenuItem value="Fallecido">Fallecido</MenuItem>
                                <MenuItem value="Perdido">Perdido</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {estado === 'Fallecido' && (
                        <Grid item xs={12}>
                            <TextField
                                label="Fecha de Defunción"
                                value={fechaDefuncion}
                                onChange={(e) => setFechaDefuncion(e.target.value)}
                                fullWidth
                                margin="normal"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={vacunado} onChange={handleVacunadoChange} />}
                            label="¿Está vacunado?"
                        />
                        {vacunado && (
                            <TextField
                                label="Vacunas"
                                value={vacunas.join(', ')}
                                onChange={(e) => setVacunas(e.target.value.split(',').map(vacuna => vacuna.trim()))}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={esterilizacion} onChange={(e) => setEsterilizacion(e.target.checked)} />}
                            label="¿Está esterilizado?"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={desparasitacionInterna} onChange={(e) => setDesparasitacionInterna(e.target.checked)} />}
                            label="¿Tiene desparasitación interna?"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={desparasitacionExterna} onChange={(e) => setDesparasitacionExterna(e.target.checked)} />}
                            label="¿Tiene desparasitación externa?"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Tratamientos"
                            value={tratamientos}
                            onChange={(e) => setTratamientos(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Alergias"
                            value={alergias}
                            onChange={(e) => setAlergias(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Socialización"
                            value={socializacion}
                            onChange={(e) => setSocializacion(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Información del Comportamiento"
                            value={informacionComportamiento}
                            onChange={(e) => setInformacionComportamiento(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Incidentes"
                            value={incidentes}
                            onChange={(e) => setIncidentes(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 3, alignSelf: 'flex-end' }}
                >
                    {loading ? 'Actualizando...' : 'Actualizar Mascota'}
                </Button>
            </form>
        </Container>
    );
};

export default UpdateMascota;
