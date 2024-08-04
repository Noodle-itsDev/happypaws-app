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
    <>
      <Card
        sx={{
          maxWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow: 3,
          borderRadius: 2,
          cursor: 'pointer'
        }}
        onClick={handleOpen}
      >
        <CardMedia
          component="img"
          alt={informacionComportamiento}
          image={imagen}
          sx={{
            height: 200,
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'justify' }}
          >
            {informacionComportamiento}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'justify' }}
          >
            <strong>Especie:</strong> {especie}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'justify' }}
          >
            <strong>Edad:</strong> {edad}
          </Typography>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'white',
          margin: '5% auto',
          width: { xs: '90%', sm: '80%', md: '60%' },
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 2,
          outline: 'none',
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            ¿Qué quieres hacer?
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={imagen} alt={nombre} style={{ width: '20rem', height: '20rem' }} />
              <input name='idMascota' type="hidden" value={id} />
              <input name='nombre' type="text" value={nombre} />
              <input type="text" value={especie} />
              <input type="hidden" value={raza} />
              <input type="text" value={genero} />
              <input name='edad' type="text" value={edad} />
              {/* <input type="checkbox" value={chip}/> */}
              <input type="hidden" value={numeroChip} />
              <input type="text" value={estado} />
              {/* <input type="text" value={esterilizacion}/> */}
              {/* <input type="text" value={desparasitacionInterna}/> */}
              {/* <input type="text" value={vacunado}/> */}
              {/* <input type="text" value={desparasitacionExterna}/> */}
              <input type="text" value={tratamientos} />
              <input type="text" value={alergias} />
              <input type="text" value={socializacion} />
              <input type="text" value={informacionComportamiento} />
              <input type="text" value={incidentes} />
              {/* <input type="date" value={fechaDefuncion}/> */}
            </div>

          </Typography>
          <Button variant="contained" color="primary" onClick={handleAdoptOpen} sx={{ marginRight: 2 }}>Adoptar</Button>
          {/* <Button variant="contained" color="secondary" onClick={handleWalkOpen}>
            Pasear
          </Button> */}
        </Box>
      </Modal>



      <Modal open={adoptModalOpen} onClose={handleAdoptClose}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'white',
          margin: '5% auto',
          width: { xs: '90%', sm: '80%', md: '60%' },
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 2,
          outline: 'none',
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
          <Typography variant="h6" component="h2" gutterBottom>
            Adoptar a {nombre}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            Muchas gracias por ponerte en contacto con nosotros, en breve recibirás respuesta a tu solicitud.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAdoptClose} sx={{ marginTop: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>

      <Modal open={walkModalOpen} onClose={handleWalkClose}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'white',
          margin: '5% auto',
          width: { xs: '90%', sm: '80%', md: '60%' },
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 2,
          outline: 'none',
        }}>
          <CardMedia
            id=''
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
          <Typography variant="h6" component="h2" gutterBottom>
            Pasear a {nombre}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            Aquí puedes añadir el contenido relacionado con el paseo.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleWalkClose} sx={{ marginTop: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ImgMediaCard;
