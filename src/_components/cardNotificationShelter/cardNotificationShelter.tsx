import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

// Estilos
const cardStyle: React.CSSProperties = {
  marginBottom: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const cardContentStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
};

// Definir los colores para diferentes estados
const statusColors: Record<string, string> = {
  "Pendiente": '#757575', 
  "Aceptado": '#0356d3',
  "Cancelado": 'rgb(213, 18, 18)', 
  "Asistido": '#4cab24',
  "No asistido": '#181a17',
};

interface Evento {
  tipoEvento: string;
  nombreUsuario: string;
  nombreMascota: string;
  nombreEvento: string;
  fechaInicio: string;
  estado: string;
}

interface NotificationCardProps {
  events: Evento[];
}

// Función para formatear la fecha
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
};

const NotificationCardShelter: React.FC<NotificationCardProps> = ({ events }) => {
  const [expanded, setExpanded] = React.useState<{ [key: number]: boolean }>({});

  const handleExpandClick = (index: number) => {
    setExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filtrar eventos con estado "Inactivo" y luego ordenar por fechaInicio en orden descendente
  const filteredEvents = events.filter(event => event.estado !== "Inactivo");

  const sortedEvents = filteredEvents.sort((a, b) => {
    return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
  });

  // Agrupar eventos por mes y año
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const date = new Date(event.fechaInicio);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);

    return acc;
  }, {} as Record<string, Evento[]>);

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {Object.keys(groupedEvents).map((monthYear) => (
          <Grid item xs={12} key={monthYear}>
            <Typography variant="h6" sx={{ marginBottom: '10px', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>
              {new Date(monthYear.split('-').reverse().join('-')).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </Typography>
            {groupedEvents[monthYear].map((event, index) => (
              <Card sx={cardStyle} key={index}>
                <CardHeader
                  title={`${event.tipoEvento.charAt(0).toUpperCase() + event.tipoEvento.slice(1)} - ${formatDate(event.fechaInicio)}`}
                  sx={{
                    backgroundColor: statusColors[event.estado] || '#1e5b5b',
                    color: 'white',
                  }}
                  action={
                    <IconButton
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expanded[index]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                />
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                  <CardContent sx={cardContentStyle}>
                    <Box sx={{ marginBottom: '10px' }}>
                      <Typography><strong>Usuario:</strong> {event.nombreUsuario}</Typography>
                      <Typography><strong>Mascota:</strong> {event.nombreMascota}</Typography>
                      <Typography><strong>Estado:</strong> {event.estado}</Typography>
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotificationCardShelter;
