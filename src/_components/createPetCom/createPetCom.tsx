"use client";

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CreateMascotaForm from './createPetForm';

const CreateMascotaModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{ backgroundColor: '#114c4c', color: 'white', '&:hover': { backgroundColor: '#0a3d3d' } }}
                onClick={handleClickOpen}
            >
                Añadir Mascota
            </Button>
            <Dialog
                open={open}
                onClose={handleClose} // Este manejador cierra el modal al hacer clic fuera de él
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        backgroundColor: '#ffffff',
                        boxShadow: 24,
                        padding: 2,
                    },
                }}
            >
                <DialogTitle>Añadir Nueva Mascota</DialogTitle>
                <DialogContent>
                    <CreateMascotaForm onClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{ backgroundColor: '#ffffff', color: '#114c4c', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateMascotaModal;
