import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './cometTail.css';

const CometTrail: React.FC = () => {
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const trailElements: HTMLDivElement[] = [];
  const trailLength = 50;

  useEffect(() => {
    if (trailContainerRef.current) {
      for (let i = 0; i < trailLength; i++) {
        const div = document.createElement('div');
        div.className = 'trail';
        trailContainerRef.current.appendChild(div);
        trailElements.push(div);
      }

      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
      }

      let currentColor = randomColor();

      let index = 0;
      function updateTrail() {
        const trail = trailElements[index];
        const size = Math.random() * 10 + 5;

        gsap.to(trail, {
          x: mouseX,
          y: mouseY,
          backgroundColor: currentColor,
          opacity: 1,
          duration: 0.5,
          scale: 1,
          width: size,
          height: size,
        });

        setTimeout(() => {
          gsap.to(trail, {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
          });
        }, 100);

        index = (index + 1) % trailLength;
      }

      function animate() {
        updateTrail();
        requestAnimationFrame(animate);
      }

      function changeColor() {
        currentColor = randomColor();
        setTimeout(changeColor, 1000);
      }

      animate();
      changeColor();
    }
  }, []);

  return <div ref={trailContainerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
};

export default CometTrail;
