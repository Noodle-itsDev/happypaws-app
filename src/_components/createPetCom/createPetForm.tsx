"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import axios from 'axios';

interface CreateMascotaFormProps {
    onClose: () => void;
}

const CreateMascotaForm: React.FC<CreateMascotaFormProps> = ({ onClose }) => {
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
                onClose();
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
        <>
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
                        <TextField
                            required
                            label="Especie"
                            fullWidth
                            margin="normal"
                            value={especie}
                            onChange={(e) => setEspecie(e.target.value)}
                        />
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
                        <TextField
                            required
                            label="Género"
                            fullWidth
                            margin="normal"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Edad"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={edad}
                            onChange={(e) => setEdad(Number(e.target.value))}
                        />
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
                            required
                            label="Número de Chip"
                            fullWidth
                            margin="normal"
                            value={chipNumber}
                            onChange={(e) => setChipNumber(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            label="Estado"
                            fullWidth
                            margin="normal"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={vacunado}
                                    onChange={(e) => setVacunado(e.target.checked)}
                                />
                            }
                            label="Vacunado"
                        />
                    </Grid>
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
                </Grid>
            </form>
        </>
    );
};

export default CreateMascotaForm;
