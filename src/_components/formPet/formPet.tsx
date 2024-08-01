"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const CreateMascota: React.FC = () => {
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
        if (fechaDefuncion) {
            formData.append('fechaDefuncion', fechaDefuncion);
        }
        if (selectedImage) {
            formData.append('file', selectedImage);
        }

        try {
            const response = await axios.post('http://194.164.165.239:8080/api/mascota/create', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Mascota añadida correctamente');
                location.href = '/protectora/mascotas';
            }
        } catch (error) {
            console.error('Error al añadir mascota:', error);
            setError('Ocurrió un error al añadir la mascota');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Añadir Nueva Mascota
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Nombre"
                            fullWidth
                            margin="normal"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Especie</InputLabel>
                            <Select
                                value={especie}
                                onChange={(e) => setEspecie(e.target.value)}
                            >
                                <MenuItem value="Felinos">Felinos</MenuItem>
                                <MenuItem value="Caninos">Caninos</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Raza"
                            fullWidth
                            margin="normal"
                            value={raza}
                            onChange={(e) => setRaza(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Género</InputLabel>
                            <Select
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            >
                                <MenuItem value="macho">Macho</MenuItem>
                                <MenuItem value="hembra">Hembra</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Edad</InputLabel>
                            <Select
                                value={edad}
                                onChange={(e) => setEdad(Number(e.target.value))}
                            >
                                {Array.from({ length: 21 }, (_, i) => (
                                    <MenuItem key={i} value={i}>{i}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Descripción"
                            fullWidth
                            margin="normal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Número de Chip"
                            fullWidth
                            margin="normal"
                            value={chipNumber}
                            onChange={(e) => setChipNumber(e.target.value)}
                            inputProps={{ maxLength: 15 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <MenuItem value="Enfermo">Enfermo</MenuItem>
                                <MenuItem value="Fallecido">Fallecido</MenuItem>
                                <MenuItem value="Adoptado">Adoptado</MenuItem>
                                <MenuItem value="No adoptado">No adoptado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={vacunado}
                                    onChange={handleVacunadoChange}
                                />
                            }
                            label="Vacunado"
                        />
                    </Grid>
                    {vacunado && (
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Vacunas</InputLabel>
                                <Select
                                    multiple
                                    value={vacunas}
                                    onChange={(e) => setVacunas(e.target.value as string[])}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="Rabia">Rabia</MenuItem>
                                    <MenuItem value="Parvovirus">Parvovirus</MenuItem>
                                    <MenuItem value="Moquillo">Moquillo</MenuItem>
                                    <MenuItem value="Hepatitis">Hepatitis</MenuItem>
                                    {/* Agregar más vacunas según sea necesario */}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={esterilizacion}
                                    onChange={(e) => setEsterilizacion(e.target.checked)}
                                />
                            }
                            label="Esterilización"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={desparasitacionInterna}
                                    onChange={(e) => setDesparasitacionInterna(e.target.checked)}
                                />
                            }
                            label="Desparasitación Interna"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={desparasitacionExterna}
                                    onChange={(e) => setDesparasitacionExterna(e.target.checked)}
                                />
                            }
                            label="Desparasitación Externa"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Tratamientos"
                            fullWidth
                            margin="normal"
                            value={tratamientos}
                            onChange={(e) => setTratamientos(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Alergias"
                            fullWidth
                            margin="normal"
                            value={alergias}
                            onChange={(e) => setAlergias(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Socialización"
                            fullWidth
                            margin="normal"
                            value={socializacion}
                            onChange={(e) => setSocializacion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Información Comportamiento"
                            fullWidth
                            margin="normal"
                            value={informacionComportamiento}
                            onChange={(e) => setInformacionComportamiento(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Incidentes"
                            fullWidth
                            margin="normal"
                            value={incidentes}
                            onChange={(e) => setIncidentes(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Fecha de Defunción"
                            fullWidth
                            margin="normal"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={fechaDefuncion}
                            onChange={(e) => setFechaDefuncion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: 16 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={chip}
                                    onChange={handleChipChange}
                                />
                            }
                            label="Chip"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Cargando...' : 'Añadir Mascota'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateMascota;
