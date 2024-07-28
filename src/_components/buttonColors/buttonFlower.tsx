// src/components/ButtonFlower.tsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import './buttonsSettingsFlower.css'; 

const ButtonFlower: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current.querySelector('.button-image'),
        { scale: 1, rotate: 0 },
        {
          scale: 1.1,
          rotate: 360,
          duration: 4,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      className="button-flower"
      onClick={() => window.location.href = 'https://www.tusitio.com'} // Reemplaza con la URL a la que quieras redirigir
    >
      <div className="button-image"></div>
      <span className="button-text ">Cuida</span>
    </button>
  );
};

export default ButtonFlower;
