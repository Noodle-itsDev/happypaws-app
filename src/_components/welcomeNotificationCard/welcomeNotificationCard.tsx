import React, { useState } from 'react';
import BasicModal from '../popupNotificationCard/popupNotificationCard'; 
import Styles from './styles.module.css';

interface WelcomeProps {
  protectoraName: string;
  onClick: () => void;
  isClicked: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ protectoraName, onClick, isClicked }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    onClick();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className={`${Styles.eventocard} ${isClicked ? 'clicked' : ''}`}
        onClick={handleOpen}
      >
        <h2>Bienvenida, {protectoraName}</h2>
        <p>
          Te damos la bienvenida a esta sección donde encontrarás todas las notificaciones
          relacionadas con eventos de tu protectora. Disfruta mucho de nuestra web.
        </p>
      </div>
      <BasicModal
        open={open}
        onClose={handleClose}
        title={`Bienvenida, ${protectoraName}`}
        description="Te damos la bienvenida a esta sección donde encontrarás todas las notificaciones relacionadas con eventos de tu protectora. Disfruta mucho de nuestra web."
      />
    </>
  );
};

export default Welcome;