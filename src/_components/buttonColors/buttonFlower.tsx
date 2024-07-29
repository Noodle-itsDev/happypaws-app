import React from "react";
import styles from './buttonsSettingsFlower.module.css';
import ButtonImage from '../../../public/img/florAzul.png';
import Image from 'next/image';

const RotatingButton: React.FC = () => {
  return (
    <button className={styles.rotatingButton}>
      <div className={styles.buttonImage}>
        <Image
          src={ButtonImage}
          alt="Flor Azul"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <span className={styles.buttonText}>Adopta mascotas <br/> veteranas</span>
    </button>
  );
};

export default RotatingButton;