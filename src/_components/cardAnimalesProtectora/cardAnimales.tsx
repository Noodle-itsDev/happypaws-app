import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Define the animation styles for the CardMedia image
const AnimatedCardMedia = styled(CardMedia)`
  transition: transform 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

interface ImgMediaCardProps {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  genero: string;
  edad: number;
  chip: boolean;
  numeroChip: string;
  estado: string;
  vacunado: boolean;
  esterilizacion: boolean;
  desparasitacionInterna: boolean;
  desparasitacionExterna: boolean;
  tratamientos: string;
  alergias: string;
  socializacion: string;
  informacionComportamiento: string;
  incidentes: string;
  fecha_defuncion: Date;
  imagen: string;
  shareButtonLabel: string;
  learnMoreButtonLabel: string;
  shareButtonColor?: string;
  learnMoreButtonColor?: string;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = ({
  id,
  nombre,
  especie,
  raza,
  genero,
  edad,
  chip,
  numeroChip,
  estado,
  vacunado,
  esterilizacion,
  desparasitacionInterna,
  desparasitacionExterna,
  tratamientos,
  alergias,
  socializacion,
  informacionComportamiento,
  incidentes,
  fecha_defuncion,
  imagen,
  shareButtonLabel,
  learnMoreButtonLabel,
  shareButtonColor = 'blue',
  learnMoreButtonColor = 'green',
}) => {
  const [open, setOpen] = useState(false);
  const [adoptModalOpen, setAdoptModalOpen] = useState(false);
  const [walkModalOpen, setWalkModalOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdoptOpen = async () => {
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');

    if (!userJson || !token) {
      location.href = "/signup";
      return;
    }

    const usuario = JSON.parse(userJson);
    const usuarioNombre = usuario.nombre;
    const email = usuario.email;
    const telefono = usuario.telefono;

    try {
      await axios.post('http://194.164.165.239:8080/api/another/send/adoptation', {
        nombreUsuario: usuarioNombre,
        nombreMascota: nombre,
        email: email,
        imagen: imagen,
        telefono: telefono,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOpen(false);
      setAdoptModalOpen(true);
    } catch (error) {
      console.error('Error al enviar los datos de adopción:', error);
    }
  };

  const handleAdoptClose = () => setAdoptModalOpen(false);

  const handleWalkOpen = () => {
    setOpen(false);
    setWalkModalOpen(true);
  };

  const handleWalkClose = () => setWalkModalOpen(false);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow: 3,
          borderRadius: 2,
          cursor: 'pointer',
          margin: 'auto'
        }}
        onClick={handleOpen}
      >
        <AnimatedCardMedia
          image={imagen}
          sx={{
            height: { xs: 180, sm: 200 },
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <CardContent
          sx={{
            width: { xs: '70vw', sm: '40vw', md: '15vw' },
            height: { xs: '20vh', sm: '20vh', md: '15vh' },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 1
          }}
        >
          <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: "system-ui", color: "#104b4b", fontWeight: "bold", backgroundColor: "#ebebeb", borderRadius: "10px", width: '100%', textAlign: 'center', padding: "6px" }}>
            {nombre}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', fontFamily: "system-ui", color: "#104b4b" }}
          >
            <strong>Edad:</strong> {edad}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', fontFamily: "system-ui", color: "#104b4b" }}
          >
            {informacionComportamiento}
          </Typography>

        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '5% auto',
          width: { xs: '90vw', sm: '80vw', md: '60vw', lg: '40vw' },
          height: 'auto',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '30px',
          outline: 'none',
          backgroundColor: '#ffffff6b',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: '2vw', sm: '5vw' },
            alignItems: 'center',
            padding: { xs: '20px', sm: '40px', md: '40px', lg: '60px' },
            borderRadius: '30px',
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              padding: { xs: '20px', sm: '40px', md: '60px', lg: '80px' },
              borderRadius: '30px',
              backgroundColor: 'white'
            }}>
              <Box sx={{height: '30vh', width: "140%"}}>
                <CardMedia
                  component="img"
                  alt={nombre}
                  image={imagen}
                  sx={{
                    width: { xs: '80%', sm: '50%', md: '70%' },
                    height: '90%',
                    borderRadius: '10%',
                    objectFit: 'cover',
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "system-ui",
                width: { xs: "100%", sm: "60%", md: "70%" }
              }}>
                <Typography variant='h4' sx={{ fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b", mb: 2 }}>
                  {nombre}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Especie:</strong> {especie}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Raza:</strong> {raza}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Género:</strong> {genero}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Edad:</strong> {edad} años
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Estado:</strong> {estado}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Chip:</strong> {chip ? numeroChip : 'No'}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Tratamientos:</strong> {tratamientos}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Alergias:</strong> {alergias}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Socialización:</strong> {socializacion}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Comportamiento:</strong> {informacionComportamiento}
                </Typography>
                <Typography hidden variant="body1" sx={{ fontFamily: "system-ui", mb: 1 }}>
                  <strong>Incidentes:</strong> {incidentes}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleAdoptOpen} sx={{ marginTop: 2,  backgroundColor: "#104b4b"}}>Adoptar</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal open={adoptModalOpen} onClose={handleAdoptClose}>

        <Box >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
            margin: '5% auto',
            width: { xs: '50%', sm: '50%', md: '30%' },
            maxHeight: '40vh',
            overflowY: 'auto',
            borderRadius: 2,
            outline: 'none',
            fontFamily: "system-ui",
            overflow: "hidden"
          }}>
            <CardMedia
              component="img"
              alt={nombre}
              image={imagen}
              sx={{
                height: 150,
                width: 150,
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: 2,
              }}
            />
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: "system-ui", textAlign: "center"}}>
              Solicitud para adoptar a {nombre} <br/> enviada.
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', fontFamily: "system-ui" }}>
              Muchas gracias por ponerte en contacto con nosotros, en breve recibirás respuesta a tu solicitud.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAdoptClose} sx={{ marginTop: 2, fontFamily: "system-ui", backgroundColor: "#104b4b"}}>
              Cerrar
            </Button>

          </Box>
        </Box>

      </Modal>

    </Box>
  );
};

export default ImgMediaCard;
