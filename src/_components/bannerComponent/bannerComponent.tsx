// src/components/ImageCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { gsap } from 'gsap';
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
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: '-100%' },
        { duration: 0.6, opacity: showText ? 1 : 0, x: showText ? '0%' : '-100%', ease: 'power2.out' }
      );
    }
  }, [showText]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { x: '100%', opacity: 0, filter: 'blur(10px)' },
        { duration: 1.2, x: '0%', opacity: 1, filter: 'blur(0)', ease: 'power2.out' }
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
    <Box sx={{
      marginTop: "-107px"
    }}className="carousel-container">
      <Box className="carousel-image-container">
        <img
          src={items[currentIndex].image}
          alt="carousel"
          className="carousel-image"
          ref={imageRef}
        />
      </Box>
      <div className="carousel-text" ref={textRef}>
        <Typography variant="h6" className="carousel-text-content">
          {items[currentIndex].text}
        </Typography>
      </div>
      <Button onClick={handlePrev} className="carousel-button-prev">
        Prev
      </Button>
      <Button onClick={handleNext} className="carousel-button-next">
        Next
      </Button>
    </Box>
  );
};

export default ImageCarousel;
