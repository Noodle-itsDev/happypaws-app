// components/CircleButton.tsx

import React, { useEffect, useRef } from 'react';
import Styles from './circleFloat.module.css';
import { gsap } from 'gsap';

interface CircleButtonProps {
    text: string;
    size: string; // Tamaño opcional para el botón
    backgroundColor: string; // Color de fondo opcional
    id: string; // ID opcional para el botón
}

const CircleButton: React.FC<CircleButtonProps> = ({ text, size = '200px', backgroundColor = 'transparent', id }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const button = buttonRef.current;

        if (button) {
            // Animación inicial
            gsap.fromTo(
                button,
                { opacity: 0, y: 50, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "drop-shadow(0 15px 15px rgba(0, 0, 0, 0.1))",
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(button, {
                            y: 20,
                            repeat: -1,
                            yoyo: true,
                            duration: 1.5,
                            ease: "power1.inOut",
                            filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5))",
                        });
                    },
                }
            );

            // Efecto de hover con GSAP
            gsap.to(button, {
                scale: 1.1,
                rotate: 15,
                duration: 0.3,
                ease: "power2.out",
                paused: true,
                onStart: () => {
                    button?.addEventListener('mouseenter', () => {
                        gsap.to(button, { scale: 1.1, rotate: 15, duration: 0.3, ease: "power2.out" });
                    });
                    button?.addEventListener('mouseleave', () => {
                        gsap.to(button, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
                    });
                },
            });
        }
    }, []);

    return (
        <button
            id={id} // Aplica el ID al botón
            className={Styles.button}
            ref={buttonRef}
            style={{ width: size, height: size, backgroundColor }}
        >
            {text}
        </button>
    );
};

export default CircleButton;
