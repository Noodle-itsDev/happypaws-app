"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


interface RotatingImageProps {
  src: string;
  alt: string;
  size?: string;
  duration?: number; // Duration in seconds

}

const RotatingFlower: React.FC<RotatingImageProps> = ({ src, alt, size = '100px', duration = 5}) => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      // Rotate the image continuously
      gsap.to(imageRef.current, {
        rotation: 360,
        duration: duration,
        repeat: -1, // Infinite loop
        ease: 'linear',
        transformOrigin: '50% 50%',
      });
    }
  }, [duration]);

  return (
    <div

      ref={imageRef}
      style={{
        width: '50%',
        height: '50%',
        transformOrigin: '50% 50%',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',

        }}
      />
    </div>

  );
};

export default RotatingFlower;
