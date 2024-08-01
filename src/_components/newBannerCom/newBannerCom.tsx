"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import gsap from "gsap";
import Styles from "./newBannerCom.module.css";
import RotatingImage from "../flowerComAnimated/flowerComAnimated";

interface CarouselProps {
  images: { src: string; alt: string; backgroundColor?: string }[];
  paragraphs: string[];
  titles: string[]; // Añadido para manejar los títulos
  fontSize?: string;
  fontColor?: string;
  fontFamily?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number; // Intervalo en milisegundos para el autoplay
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  paragraphs,
  titles, // Recibiendo los títulos
  fontSize = "16px",
  fontColor = "#fff",
  fontFamily = "Arial",
  autoPlay = false, // Desactivar autoplay
  autoPlayInterval = 3000, // Intervalo de 3 segundos por defecto
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Iniciar en la segunda imagen
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 }
      );
    }

    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval]);

  const handlePrev = () => {
    if (isAnimating) return;
    if (currentIndex > 0) {
      setIsAnimating(true);
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          );
          gsap.fromTo(
            imageRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              onComplete: () => setIsAnimating(false),
            }
          );
          gsap.fromTo(
            textRef.current,
            { y: 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5 }
          );
        },
      });
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    if (currentIndex < images.length - 1) {
      setIsAnimating(true);
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              onComplete: () => setIsAnimating(false),
            }
          );
          gsap.fromTo(
            textRef.current,
            { y: 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5 }
          );
        },
      });
    }
  };

  const currentImage = images[currentIndex];
  const currentParagraph = paragraphs[currentIndex];
  const currentTitle = titles[currentIndex]; // Obtén el título actual

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "87vh",
        overflow: "hidden",
        backgroundColor: currentImage?.backgroundColor || "#000",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 9000,
        }}
      >
        <IconButton
          onClick={handlePrev}
          style={{
            color: "white",
            height: "87vh",
            borderRadius: "0",
            width: "100%",
          }}
          className={`${Styles.hoverColor}`}
        >
          <ArrowBackIosNew />
          <div style={{ marginRight: "14px", marginLeft: "14px" }}>Adoptar</div>
        </IconButton>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "30px",
          transform: "translateY(-50%)",
          zIndex: 9000,
        }}
      >
        <IconButton
          onClick={handleNext}
          style={{
            color: "white",
            height: "87vh",
            borderRadius: "0",
            width: "100%",
          }}
          className={`${Styles.hoverColor}`}
        >
          <div style={{ marginRight: "12px", marginLeft: "12px" }}>
            Protectoras
          </div>
          <ArrowForwardIos />
        </IconButton>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "87vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {currentImage && (
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.5s ease",
              filter: "blur(4px)",
            }}
          />
        )}
        {currentTitle && currentParagraph && (
          <div
            ref={textRef}
            style={{
              position: "absolute",
              color: fontColor,
              fontSize,
              fontFamily,
              background: "#ffffff6b",
              padding: "10px",
              borderRadius: "15px",
              maxWidth: "40%",
              textAlign: "left",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                maxHeight: "50vh",
              }}
            >

              <h2
                className={`${Styles.fontFamilyAnton}`}
                style={{
                  margin: 0,
                  fontSize: "48px",
                  marginBottom: "2vh",
                  marginTop: "4vh",
                  borderBottom: "1px solid white"
                }}
              >
                {currentTitle}
              </h2>{" "}

              {/* Título del párrafo */}
              <p
                className={`${Styles.fontFamily}`}
                style={{ margin: 0, fontSize: "25px", padding: "20px" }}
              >
                {currentParagraph}
              </p>{" "}

              {/* Párrafo */}
              <div style={{ position: "absolute", top: "70%", left: "80%" }}>
                <RotatingImage src={"/img/florAzul.png"} alt={""} buttonText={"Ir"} href={"/signup"}                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
