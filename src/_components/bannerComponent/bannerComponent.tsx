"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { gsap, Power2 } from 'gsap';
import './bannerComponent.css';

interface ImageCarouselProps {
  items: { image: string; text: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const textAnim = gsap.timeline();
    if (textRef.current) {
      textAnim.fromTo(textRef.current, 
        { opacity: 0, y: '100%' }, 
        { duration: 0.6, opacity: showText ? 1 : 0, y: showText ? '0%' : '100%', ease: Power2.easeOut }
      );
    }
  }, [showText]);

  useEffect(() => {
    const imageAnim = gsap.timeline();
    if (imageRef.current) {
      imageAnim.fromTo(imageRef.current, 
        { x: '100%', opacity: 0, filter: 'blur(20px)' }, 
        { duration: 1.2, x: '0%', opacity: 1, filter: 'blur(0)', ease: Power2.easeOut }
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setShowText(true);
      }, 800);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length]);

  const handleNext = () => {
    setShowText(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      setShowText(true);
    }, 800);
  };

  const handlePrev = () => {
    setShowText(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      setShowText(true);
    }, 800);
  };

  return (
    <Box sx={{ marginTop: "-107px" }} className="carousel-container">
      <Box className="carousel-image-container">
        <img
          src={items[currentIndex].image}
          alt={items[currentIndex].text}
          className="carousel-image"
          ref={imageRef}
          aria-hidden={!showText}
        />
      </Box>
      <div className="carousel-text" ref={textRef}>
        <Typography variant="h6" className="carousel-text-content">
          {items[currentIndex].text}
        </Typography>
      </div>

      <div className="carousel-indicators">
        {items.map((_, index) => (
          <div
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          ></div>
        ))}
      </div>
    </Box>
  );
};

export default ImageCarousel;
