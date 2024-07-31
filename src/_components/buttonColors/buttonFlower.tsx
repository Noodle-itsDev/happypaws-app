import React from "react";
import styles from './buttonsSettingsFlower.module.css';
import Image from 'next/image';

const RotatingButton: React.FC = () => {
  return (
    <button className={styles.rotatingButton}>
      <div className={styles.buttonImage}>
        <Image
          src="/img/florAzul.png"
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