import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateMascota from '../formPet/formPet';

interface ImgMediaCardProps {
  title: string;
  description: string;
  imageSrc: string;
  raza: string;
  genero: string;
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
  raza,
  genero,
  edad,
  shareButtonLabel,
  learnMoreButtonLabel,
  shareButtonColor = 'blue',
  learnMoreButtonColor = 'green',
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        maxWidth: 300, // Hacer la tarjeta más estrecha
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        image={imageSrc}
        sx={{
          height: 200, // Aumentar la altura de la imagen
          objectFit: 'cover',
          width: '100%',
          cursor: 'pointer', // Indicar que la imagen es interactiva
        }}
        onClick={handleOpen} // Abrir modal al hacer clic en la imagen
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Raza:</strong> {raza}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Género:</strong> {genero}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Edad:</strong> {edad}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Button
          size="small"
          sx={{
            backgroundColor: shareButtonColor,
            color: '#fff',
            '&:hover': {
              backgroundColor: `${shareButtonColor}D0`, // Slightly darker on hover
            },
          }}
        >
          {shareButtonLabel}
        </Button>
        <Button
          size="small"
          sx={{
            backgroundColor: learnMoreButtonColor,
            color: '#fff',
            '&:hover': {
              backgroundColor: `${learnMoreButtonColor}D0`, // Slightly darker on hover
            },
          }}
        >
          {learnMoreButtonLabel}
        </Button>
      </CardActions>
      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: '20px', backgroundColor: 'white', margin: '5% auto', width: '80%', maxHeight: '90vh', overflowY: 'auto' }}>
        </div>
      </Modal>
    </Card>
  );
};

export default ImgMediaCard;
