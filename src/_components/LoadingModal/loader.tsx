import React from 'react';
import styles from './loader.module.css';

const LoadingModal = () => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.loader}></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
