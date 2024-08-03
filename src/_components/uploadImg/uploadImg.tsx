"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { gsap } from 'gsap';
import Image from 'next/image';

interface EditableImageProps {
  id: string;
  defaultImageSrc?: string;
}

const UploadImg: React.FC<EditableImageProps> = ({
  id,
  defaultImageSrc = '/img/pexels-katlovessteve-551628.jpg',
}) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(defaultImageSrc);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageSrc(e.target.result);
          gsap.fromTo(imageRef.current, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: 'back.out' }
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.3)' }
      );
    }
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '80%',
        paddingTop: '80%',
        position: 'relative',
        maxWidth: '2400px',
        margin: 'auto',
        overflow: 'hidden',
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'scale(1.05)', 
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          
        }}
      >
        <input
          id={id}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={inputRef}
          onChange={handleImageChange}
        />
        <Box
          component="div"
          sx={{
            width: '80%',
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'lightgray',
            position: 'relative',
          }}
        >
          {imageSrc ? (
            <Box
              ref={imageRef}
              component="img"
              src={imageSrc as string}
              alt="Editable"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'relative',
                width: '50%',
                height: '50%',
              }}
            >
              <Image
                src="/images/upload_placeholder.png"
                alt="Upload Image"
                layout="fill"
                objectFit="contain"
                style={{ opacity: 0.5 }}
              />
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            position: 'absolute',
            bottom: '10%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: 'clamp(0.7rem, 2vw, 1rem)',
            padding: 'clamp(5px, 1vw, 10px) clamp(10px, 2vw, 20px)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              transform: 'scale(1.1)',
            },
          }}
        >
          Upload Image
        </Button>
      </Box>
    </Box>
  );
};

export default UploadImg;
