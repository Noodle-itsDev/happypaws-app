
import React, { useEffect, useRef } from 'react';
import Styles from './textAnimation.module.css';
import { gsap } from 'gsap';

interface FloatingTextProps {
    textDos: string;
    text: string;
    id: string;
}

const FloatingText: React.FC<FloatingTextProps> = ({ text, textDos,id }) => {
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const textElement = textRef.current;

        if (textElement) {
            // Animación inicial
            gsap.fromTo(
                textElement,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(textElement, {
                            y: 20,
                            repeat: -1,
                            yoyo: true,
                            duration: 1.5,
                            ease: "power1.inOut",
                        });
                    },
                }
            );
        }
    }, []);

    return (
        <div
            id={id}
            className={Styles.floatingText}
            ref={textRef}
        >
            <p>{text}</p>
            <p>{textDos}</p>
        </div>
    );
};

export default FloatingText;
