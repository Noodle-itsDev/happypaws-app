"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";  // Importa axios para las solicitudes HTTP
import Styles from './profileShelter.module.css';
import { Card, CardContent, Typography, Grid, Box, TextField, IconButton, Chip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import UploadImg from "@/_components/uploadImg/uploadImg";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import PrimarySearchAppBarUser from "@/_components/headerUser/headerGradient";
import EventChipList from "@/_components/eventChipCom/eventChipCom";
import { gsap } from "gsap";
import NotificationCardShelter from "@/_components/cardNotificationShelter/cardNotificationShelter";
import EventChips from "@/_components/chipsComponent/chipsComponent";
import HeaderBar from "@/_components/headerBarPrivateProtectora/headerBarPrivateProtectora/headerBar";
import FooterPrivate from "@/_components/FooterPrivate/footerPublic";

interface UserData {
    nombre: string;
    apellidos: string;
    dni: string;
    email: string;
    extension: number;
    telefono: number;
    provincia: string;
    poblacion: string;
    ciudad: string;
    calle: string;
    numero: string;
    codigoPostal: number;
    username: string,
}

interface Volunteer {
    date: string;
    activity: string;
}

interface AdoptedPet {
    name: string;
    species: string;
    adoptionDate: string;
}

interface Donation {
    amount: number;
    date: string;
}

interface Event {
    id: number;
    name: string;
}

interface Evento {
    nombreUsuario: string;
    nombreMascota: string;
    tipoEvento: string;
    nombreEvento: string;
    fechaInicio: string;
    estado: string;
}
interface NotificationCardProps {
    events: Evento;
}
const UserProfile: React.FC = () => {

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

    const [eventos, setEventos] = useState<Evento[]>([]);

     const [userData, setUserData] = useState<UserData>({
        nombre: "",
        apellidos: "",
        dni: "",
        email: "",
        extension: 0,
        telefono: 0,
        provincia: "",
        poblacion: "",
        ciudad: "",
        calle: "",
        numero: "",
        codigoPostal: 0,
        username: "",
    });

    const [donations, setDonations] = useState<Donation[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const toggleEdit = async () => {
        if (isEditable) {
            try {
                const token = localStorage.getItem("authToken");
                const usuarioJSON = localStorage.getItem("user");

                if (!token || !usuarioJSON) {
                    console.error('Token or user not found in localStorage');
                    return;
                }

                const usuario = JSON.parse(usuarioJSON);
                console.log(userData, usuario);
                const response = await axios.put(`http://194.164.165.239:8080/api/user/edit/${usuario.idUsuario}`, userData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });

                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                location.href = "/signup";

            } catch (error) {
                console.error("Error updating user data", error);

            }
        }
        setIsEditable(!isEditable);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const usuarioJSON = localStorage.getItem("user");

                if (!usuarioJSON) {
                    setError('User or token not found in localStorage');
                    location.href = "/signup";
                    return;
                }

                const usuario = JSON.parse(usuarioJSON);
                console.log(usuario.email);

                setUserData({

                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    dni: usuario.dni,
                    email: usuario.email,
                    extension: usuario.extension,
                    telefono: usuario.telefono,
                    provincia: usuario.provincia,
                    poblacion: usuario.poblacion,
                    ciudad: usuario.ciudad,
                    calle: usuario.calle,
                    numero: usuario.numero,
                    codigoPostal: usuario.codigoPostal,
                    username: usuario.username,
                })

                const usuarioId = usuario.idUsuario;

                const response = await axios.get(`http://194.164.165.239:8080/api/eventos/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });


                const eventosData = response.data.map((evento: any) => ({
                    idUsuario: evento.usuario.idUsuario,
                    nombreUsuario: evento.usuario.nombre,
                    idMascota: evento.mascota.id,
                    nombreMascota: evento.mascota.nombre,
                    tipoEvento: evento.tipoEvento,
                    nombreEvento: evento.nombreEvento,
                    fechaInicio: evento.fechaInicio,
                    fechaFin: evento.fechaFin,
                    estado: evento.estado
                }));

                setEventos(eventosData);

            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, []);


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

    const hasCancelledEvents = eventos.some(event => event.estado === "Cancelado");


    return (
        <>
            <header style={{ position: "fixed", top: 0, zIndex: 9999 }}>
                <HeaderBar></HeaderBar>
            </header>
            <main
                style={{
                    width: "100vw",
                    height: "calc(100vh + 100vh)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: '0 20px',
                    marginTop: "20vh",
                    marginBottom: "8%",
                }}
            >
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: '30px',
                        backgroundColor: '#fffff6d',
                        padding: 2,
                        boxShadow: "0px 10px 20px #000000ba",
                        width: '100%',
                        maxWidth: '1200px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card
                            ref={cardRef}
                            sx={{
                                boxShadow: "0px 10px 20px #000000ba",
                                width: '100%',
                                borderRadius: 4,
                                backgroundColor: "#fffff6d",
                                transition: 'transform 0.3s ease',
                                position: 'relative',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                }
                            }}
                        >
                            <IconButton
                                onClick={toggleEdit}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    color: '#104b4b',
                                    '&:hover': {
                                        color: '#1f6f6f',
                                    }
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <CardContent>
                                <Grid container spacing={3} direction="column">
                                    <Grid item xs={12}>
                                        <UploadImg id={""} />
                                        <Typography variant="h6" sx={{ color: "#104b4b", mb: 2, fontFamily: 'system-ui' }}>
                                            Datos Personales
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            label="Protectora"
                                            name="Protectora"
                                            value={userData.nombre}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            hidden
                                            fullWidth
                                            label="Apellidos"
                                            name="apellidos"
                                            value={userData.apellidos}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            hidden
                                            fullWidth
                                            label="dni"
                                            name="dni"
                                            value={userData.dni}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Extensión telefónica"
                                            name="extension"
                                            value={userData.extension}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Teléfono"
                                            name="telefono"
                                            value={userData.telefono}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Provincia"
                                            name="provincia"
                                            value={userData.provincia}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Poblacion"
                                            name="poblacion"
                                            value={userData.poblacion}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Ciudad"
                                            name="ciudad"
                                            value={userData.ciudad}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Calle"
                                            name="calle"
                                            value={userData.calle}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Número"
                                            name="numero"
                                            value={userData.numero}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Código postal"
                                            name="codigoPostal"
                                            value={userData.codigoPostal}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Usuario"
                                            name="username"
                                            value={userData.username}
                                            onChange={handleChange}
                                            sx={{
                                                ...textFieldStyle,
                                                backgroundColor: !isEditable ? '#f0f0f0' : 'transparent',
                                            }}
                                            margin="normal"
                                            InputProps={{ readOnly: !isEditable }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" sx={{ color: "#104b4b", mb: 2, fontFamily: 'system-ui' }}>
                                            Últimos Voluntariados
                                        </Typography>
                                        <EventChips />
                                        {/* <Typography variant="h5" sx={{ color: "#104b4b", mt: 3, mb: 2, fontFamily: 'system-ui' }}>
                                            Mascotas Adoptadas
                                        </Typography>
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
                                            {adoptedPets.length === 0 ? (
                                                <Typography variant="body2" sx={{ color: '#104b4b', fontFamily: 'system-ui' }}>
                                                    No hay mascotas adoptadas registradas.
                                                </Typography>
                                            ) : (
                                                adoptedPets.map((pet, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={`${pet.name} (${pet.species}) - ${pet.adoptionDate}`}
                                                        color="secondary"
                                                        sx={{ margin: '2px' }}
                                                    />
                                                ))
                                            )}
                                        </Box> */}
                                        <Typography variant="h5" sx={{ color: "#104b4b", mt: 3, mb: 2, fontFamily: 'system-ui' }}>
                                            Donaciones Realizadas
                                        </Typography>
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
                                            {donations.length === 0 ? (
                                                <Typography variant="body2" sx={{ color: '#104b4b', fontFamily: 'system-ui' }}>
                                                    No hay donaciones registradas.
                                                </Typography>
                                            ) : (
                                                donations.map((donation, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={`$${donation.amount} - ${donation.date}`}
                                                        color="success"
                                                        sx={{ margin: '2px' }}
                                                    />
                                                ))
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                                <EventChipList events={events} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={9} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                width: '100%',
                                maxHeight: '171vh',
                                backgroundColor: '#eeeeee',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '20px',
                                overflowY: 'auto',
                            }}
                        >
                            <div style={{ width: '100%', height: '100%' }}>
                                <NotificationCardShelter events={eventos} />
                            </div>
                        </Box>
                    </Grid>
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
            </main>
            <footer>
                <FooterPrivate></FooterPrivate>
            </footer>
        </>
    );
};

const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#104b4b" },
        "&:hover fieldset": { borderColor: "#104b4b" },
    },
    "& .MuiInputLabel-root": { color: "#104b4b" },
    "& .MuiInputBase-input": { color: "#104b4b" },
};

export default UserProfile;
function setError(arg0: string) {
    throw new Error("Function not implemented.");
}

