import React from "react";
import styles from './flowerCom.module.css';
import ButtonImage from '../../../public/img/florAzul.png';
import Image from 'next/image';

const FlowerComAnimated: React.FC = () => {
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
            </button >

);
};

            export default FlowerComAnimated;