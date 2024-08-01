"use client";

import React, { useState, useEffect, useRef } from "react";
import Styles from './users.module.css';
import { Card, CardContent, Typography, Grid, Box, TextField, Button, Chip} from "@mui/material";
import UploadImg from "@/_components/uploadImg/uploadImg";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import EventChipList from "@/_components/eventChipCom/eventChipCom";
import Footer from "@/_components/footerCom/footer";
import { gsap } from "gsap";

interface UserData {
    name: string;
    email: string;
    phone: string;
    address: string;
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

const UserProfile: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
    });

    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [adoptedPets, setAdoptedPets] = useState<AdoptedPet[]>([]);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isEditable, setIsEditable] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    useEffect(() => {
        const cardElement = cardRef.current;
        if (cardElement) {
            const animation = gsap.fromTo(
                cardElement,
                { y: 0 },
                {
                    y: 40,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    duration: 2,
                    paused: true, 
                }
            );

            const handleMouseEnter = () => {
                animation.pause();
            };
            const handleMouseLeave = () => {
                animation.play();
            };


            cardElement.addEventListener("mouseenter", handleMouseEnter);
            cardElement.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                cardElement.removeEventListener("mouseenter", handleMouseEnter);
                cardElement.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    return (
        <>
            <header style={{ position: "fixed", top: 0, zIndex: 9999 }}>
                <PrimarySearchAppBar accessHref={""} accessLabel={""} backgroundGradient="linear-gradient(90deg, rgba(0,151,178,1) 0%, rgba(126,217,87,1) 100%)" />
                <SimpleBottomNavigation
                    labels={{
                        textoUno: "",
                        textoDos: "",
                        textoTres: "",
                        textoCuatro: "",
                        textoCinco: "",
                        textoSeis: "",
                    }}
                ></SimpleBottomNavigation>
            </header>
            <main
                style={{
                    width: "100vw",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: '0 20px',
                    marginTop: "20vh",
                    marginBottom: "8%",
                }}
            >
                <Card
                    ref={cardRef}
                    sx={{
                        boxShadow: "0px 10px 20px #000000ba",
                        maxWidth: 800,
                        width: '100%',
                        margin: "auto",
                        bgcolor: "#36b38ab5",
                        borderRadius: 4,
                        backgroundColor: "#306159",
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        }
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ color: "white", textAlign: "center" }}
                        >
                            Nombre de usuario
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <UploadImg id={""} />
                                <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                                    Datos Personales
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    margin="normal"
                                    InputProps={{ readOnly: !isEditable }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    margin="normal"
                                    InputProps={{ readOnly: !isEditable }}
                                />
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    margin="normal"
                                    InputProps={{ readOnly: !isEditable }}
                                />
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    margin="normal"
                                    InputProps={{ readOnly: !isEditable }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                                    Últimos Voluntariados
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
                                    {volunteers.length === 0 ? (
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            No hay voluntariados registrados.
                                        </Typography>
                                    ) : (
                                        volunteers.map((volunteer, index) => (
                                            <Chip
                                                key={index}
                                                label={`${volunteer.activity} (${volunteer.date})`}
                                                color="primary"
                                                sx={{ margin: '2px' }} 
                                            />
                                        ))
                                    )}
                                </Box>

                                <Typography variant="h5" sx={{ color: "white", mt: 3, mb: 2 }}>
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
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            No hay mascotas adoptadas registradas.
                                        </Typography>
                                    ) : (
                                        adoptedPets.map((pet, index) => (
                                            <Chip
                                                key={index}
                                                label={`${pet.name} (${pet.species}) - ${pet.adoptionDate}`}
                                                color="secondary"
                                                sx={{ margin: '2px' }} // Ensure chips have some spacing
                                            />
                                        ))
                                    )}
                                </Box>

                                <Typography variant="h5" sx={{ color: "white", mt: 3, mb: 2 }}>
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
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
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

                        <Box mt={4} display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                sx={{color: "white" }}
                                onClick={toggleEdit}
                            >
                                {isEditable ? "Guardar Cambios" : "Editar Perfil"}
                            </Button>
                        </Box>

                        <EventChipList events={events} />
                    </CardContent>
                    <Grid>

                    </Grid>
                </Card>
            </main>
            <footer>
                <Footer color={"#2fb090"} />
            </footer>
        </>
    );
};

const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "rgba(0,151,178,1)" },
        "&:hover fieldset": { borderColor: "rgba(126,217,87,1)" },
    },
    "& .MuiInputLabel-root": { color: "white" },
    "& .MuiInputBase-input": { color: "white" },
};

export default UserProfile;
