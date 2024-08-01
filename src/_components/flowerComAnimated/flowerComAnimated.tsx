"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RotatingImageProps {
  src: string;
  alt: string;
  size?: string;
  duration?: number; // Duration in seconds
  buttonText: string; // Text for the button
  href: string; // URL for the link
}

const RotatingImage: React.FC<RotatingImageProps> = ({ src, alt, size = '100px', duration = 5, buttonText = 'Click Me', href }) => {
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
      style={{
        display: 'inline-block',
        width: "250px",
        height: "250px",
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        background: 'transparent', 
      }}
    >
      <div
        ref={imageRef}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '50% 50%',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            background: 'transparent', // Make the image background transparent
          }}
        />
      </div>
      {href ? (
        <a
          href={href}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            padding: '10px 20px',
            fontSize: '20px',
            color: '#002735', // Text color

            borderRadius: '5px',
            cursor: 'pointer',
            textAlign: 'center',
            background: 'transparent',
            writingMode: 'horizontal-tb',
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          {buttonText}
        </a>
      ) : (
        <button
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the button
            zIndex: 2, // Ensure the button is on top
            padding: '10px 20px',
            fontSize: '16px',
            color: '#007BFF', // Text color
            borderRadius: '5px',
            cursor: 'pointer',
            textAlign: 'center',
            background: 'transparent', // Remove background
            writingMode: 'horizontal-tb', // Ensure text remains horizontal
          }}
          onClick={() => alert('Button Clicked')}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default RotatingImage;
