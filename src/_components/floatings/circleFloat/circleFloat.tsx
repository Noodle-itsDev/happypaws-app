// components/CircleButton.tsx

import React, { useEffect, useRef } from 'react';
import Styles from './circleFloat.module.css';
import { gsap } from 'gsap';

interface CircleButtonProps {
    text: string;
    size?: string; // Tamaño opcional para el botón
    backgroundColor?: string; // Color de fondo opcional
    id?: string; // ID opcional para el botón
    href?: string; // URL opcional para el enlace
}

const CircleButton: React.FC<CircleButtonProps> = ({ text, size = '200px', backgroundColor = 'transparent', id, href }) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

    useEffect(() => {
        const button = buttonRef.current;

        if (button) {
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


            const handleMouseEnter = () => {
                gsap.to(button, { scale: 1.1, rotate: 15, duration: 0.3, ease: "power2.out" });
            };

            const handleMouseLeave = () => {
                gsap.to(button, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);

            // Cleanup the event listeners on component unmount
            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    // Decidimos si usar <a> o <button> basándonos en la presencia de href
    const Tag = href ? 'a' : 'button';

    return (
        <Tag
            id={id}
            href={href}
            className={Styles.button}
            ref={buttonRef as React.RefObject<HTMLButtonElement | HTMLAnchorElement>}
            style={{ width: size, height: size, backgroundColor }}
        >
            {text}
        </Tag>
    );
};

export default CircleButton;
