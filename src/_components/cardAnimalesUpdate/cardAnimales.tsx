import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface ImgMediaCardProps {
  title: string;
  description: string;
  imageSrc: string;
  especie: string;
  edad: string;
  shareButtonLabel: string;
  learnMoreButtonLabel: string;
  shareButtonColor?: string;
  learnMoreButtonColor?: string;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = ({
  title,
  description,
  imageSrc,
  especie,
  edad,
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

  const handleAdoptOpen = () => {
    setOpen(false);
    setAdoptModalOpen(true);
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
          alt={title}
          image={imageSrc}
          sx={{
            height: 200,
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'justify' }}
          >
            {description}
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
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAdoptOpen} sx={{ marginRight: 2 }}>
            Adoptar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleWalkOpen}>
            Pasear
          </Button>
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
            alt={title}
            image={imageSrc}
            sx={{
              height: 150,
              width: 150,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: 2,
            }}
          />
          <Typography variant="h6" component="h2" gutterBottom>
            Adoptar a {title}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            Aquí puedes añadir el contenido relacionado con la adopción.
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
            alt={title}
            image={imageSrc}
            sx={{
              height: 150,
              width: 150,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: 2,
            }}
          />
          <Typography variant="h6" component="h2" gutterBottom>
            Pasear a {title}
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
