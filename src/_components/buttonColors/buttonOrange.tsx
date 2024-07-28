import { useRef } from 'react';
import { gsap } from 'gsap';

const ButtonComponentOrange = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseOver = () => {
    gsap.to(buttonRef.current, { duration: 0.5, rotation: 360, scale: 1.2 });
  };

  const handleMouseOut = () => {
    gsap.to(buttonRef.current, { duration: 0.5, rotation: 0, scale: 1 });
  };

  const handleClick = () => {
    window.location.href = "https://www.example.com"; // Cambia esta URL a la que desees
  };

  return (
    <button
      ref={buttonRef}
      className="btn-gradient-green text-white font-bold px-[150px] py-[165px] rounded-[50%] focus:outline-none text-2xl "
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      style={{
        background: 'radial-gradient(circle, rgba(255,217,137,1) 0%, rgba(253,141,29,1) 100%)'
      }}
    >
      Dona
    </button>
  );
};

export default ButtonComponentOrange;
