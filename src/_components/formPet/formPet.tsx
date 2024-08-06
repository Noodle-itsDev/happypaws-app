"use client";

import React, { useState, ChangeEvent, FormEvent, ReactNode } from 'react';
import { Container, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel, InputAdornment, SelectChangeEvent } from '@mui/material';
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
                Añadir Nueva Mascota
            </Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Nombre"
                            fullWidth
                            margin="normal"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            variant="outlined"
                            size="medium"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Especie</InputLabel>
                            <Select
                                value={especie}
                                onChange={(e: SelectChangeEvent<string>) => setEspecie(e.target.value)}
                                label="Especie"
                                size="medium"
                            >
                                <MenuItem value="Felino">Felino</MenuItem>
                                <MenuItem value="Canino">Canino</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Raza"
                            fullWidth
                            margin="normal"
                            value={raza}
                            onChange={(e) => setRaza(e.target.value)}
                            variant="outlined"
                            size="medium"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Género</InputLabel>
                            <Select
                                value={genero}
                                onChange={(e: SelectChangeEvent<string>) => setGenero(e.target.value)}
                                label="Género"
                                size="medium"
                            >
                                <MenuItem value="macho">Macho</MenuItem>
                                <MenuItem value="hembra">Hembra</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Edad</InputLabel>
                            <Select
                                value={edad}
                                onChange={(e: SelectChangeEvent<number>) => setEdad(Number(e.target.value))}
                                label="Edad"
                                size="medium"
                            >
                                {Array.from({ length: 21 }, (_, i) => (
                                    <MenuItem key={i} value={i}>{i}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Descripción"
                            fullWidth
                            margin="normal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={chip}
                                    onChange={handleChipChange}
                                    color="primary"
                                />
                            }
                            label="Chip"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    {chip && (
                        <Grid item xs={12}>
                            <TextField
                                label="Número de Chip"
                                fullWidth
                                margin="normal"
                                value={chipNumber}
                                onChange={(e) => setChipNumber(e.target.value)}
                                variant="outlined"
                                size="medium"
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                }}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={estado}
                                onChange={handleEstadoChange}
                                label="Estado"
                                size="medium"
                            >
                                <MenuItem value="Enfermo">Enfermo</MenuItem>
                                <MenuItem value="Fallecido">Fallecido</MenuItem>
                                <MenuItem value="Adoptado">Adoptado</MenuItem>
                                <MenuItem value="No adoptado">No adoptado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {estado === 'Fallecido' && (
                        <Grid item xs={12}>
                            <TextField
                                label="Fecha de Defunción"
                                fullWidth
                                margin="normal"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={fechaDefuncion}
                                onChange={(e) => setFechaDefuncion(e.target.value)}
                                variant="outlined"
                                size="medium"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            Imagen de la mascota
                        </Typography>
                        <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ width: '100%', marginBottom: 16 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={vacunado}
                                    onChange={handleVacunadoChange}
                                    color="primary"
                                />
                            }
                            label="Vacunado"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    {vacunado && (
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <InputLabel>Vacunas</InputLabel>
                                <Select
                                    multiple
                                    value={vacunas}
                                    onChange={(e: SelectChangeEvent<string[]>) => setVacunas(e.target.value as string[])}
                                    renderValue={(selected) => selected.join(', ')}
                                    label="Vacunas"
                                    size="medium"
                                >
                                    <MenuItem value="Rabia">Rabia</MenuItem>
                                    <MenuItem value="Parvovirus">Parvovirus</MenuItem>
                                    <MenuItem value="Moquillo">Moquillo</MenuItem>
                                    <MenuItem value="Hepatitis">Hepatitis</MenuItem>
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
                                    color="primary"
                                />
                            }
                            label="Esterilización"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={desparasitacionInterna}
                                    onChange={(e) => setDesparasitacionInterna(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Desparasitación Interna"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={desparasitacionExterna}
                                    onChange={(e) => setDesparasitacionExterna(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Desparasitación Externa"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Tratamientos"
                            fullWidth
                            margin="normal"
                            value={tratamientos}
                            onChange={(e) => setTratamientos(e.target.value)}
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Alergias"
                            fullWidth
                            margin="normal"
                            value={alergias}
                            onChange={(e) => setAlergias(e.target.value)}
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Socialización"
                            fullWidth
                            margin="normal"
                            value={socializacion}
                            onChange={(e) => setSocializacion(e.target.value)}
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Información Comportamiento"
                            fullWidth
                            margin="normal"
                            value={informacionComportamiento}
                            onChange={(e) => setInformacionComportamiento(e.target.value)}
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Incidentes"
                            fullWidth
                            margin="normal"
                            value={incidentes}
                            onChange={(e) => setIncidentes(e.target.value)}
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Añadir Mascota'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateMascota;
