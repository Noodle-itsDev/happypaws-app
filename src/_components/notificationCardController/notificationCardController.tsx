import * as React from 'react';
import BasicModal from '../popupNotificationCard/popupNotificationCard'; 
import '../notificationCard/styles.module.css';

interface EventoCardProps {
  tipo: string;
  persona: string;
  mascota: string;
  hora?: string;
  dia?: string;
  cantidad?: string;
  correo?: string;
  descripcion?: string;
  onClick: () => void;
  isClicked: boolean;
}

const EventoCard: React.FC<EventoCardProps> = ({
  tipo,
  persona,
  mascota,
  hora,
  dia,
  cantidad,
  correo,
  descripcion,
  onClick,
  isClicked
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    onClick();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className={`evento-card ${isClicked ? 'clicked' : ''}`}
        onClick={handleOpen}
      >
        <h2>Nuevo evento creado: {tipo}</h2>
        <p>Por: {persona}</p>
        <p>Mascota: {mascota}</p>
        {hora && <p>Hora: {hora}</p>}
        {dia && <p>Día: {dia}</p>}
        {cantidad && <p>Cantidad: {cantidad}</p>}
        {correo && <p>Correo: {correo}</p>}
        {descripcion && <p>Descripción: {descripcion}</p>}
      </div>
      <BasicModal
        open={open}
        onClose={handleClose}
        title={`Evento: ${tipo}`}
        description={`Por: ${persona}\nMascota: ${mascota}\n${hora ? `Hora: ${hora}\n` : ''}${dia ? `Día: ${dia}\n` : ''}${cantidad ? `Cantidad: ${cantidad}\n` : ''}${correo ? `Correo: ${correo}\n` : ''}${descripcion ? `Descripción: ${descripcion}` : ''}`}
      />
    </>
  );
};

export default EventoCard;
