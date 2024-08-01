import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
  return (
    <Card
      sx={{
        maxWidth: 345,
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
          height: 140,
          objectFit: 'cover',
          width: '100%',
        }}
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
    </Card>
  );
};

export default ImgMediaCard;
