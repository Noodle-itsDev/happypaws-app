import { useRef } from 'react';
import { gsap } from 'gsap';


const ButtonComponentGreen = () => {
  const buttonRef = useRef(null);

  const handleMouseOver = () => {
    gsap.to(buttonRef.current, { duration: 0.3, x: -20, y: 30 });
  };

  const handleMouseOut = () => {
    gsap.to(buttonRef.current, { duration: 0.3, x: 0, y: 0 });
  };

  const handleClick = () => {
    window.location.href = "https://www.example.com"; // Cambia esta URL a la que desees
  };
  return (
    <button
      ref={buttonRef}
      className="btn-gradient text-white font-bold px-[120px] py-[130px] rounded-[30px] focus:outline-none text-[30px]"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      style={{
        background: 'linear-gradient(318deg, rgba(80,200,120,1) 0%, rgba(255,217,137,1) 100%)'
      }}
    >
      Adopta
    </button>
  );
};

export default ButtonComponentGreen;
