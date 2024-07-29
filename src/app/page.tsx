"use client";
import React, { lazy, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./home.module.css";
import {
  animateLogoOnIntersect,
  animateLogoVisibility,
} from "@/Animations/animationImg/animationLogo";

const ImageCarousel = lazy(
  () => import("@/_components/bannerComponent/bannerComponent")
);
const SimpleBottomNavigation = lazy(
  () => import("@/_components/navigation/navigationNavBar")
);
const PrimarySearchAppBar = lazy(
  () => import("@/_components/header/headerGradient")
);
import CircleButton from "@/_components/floatings/circleFloat/circleFloat";
import ButtonFlower from "@/_components/buttonColors/buttonFlower";
const FloatingText = lazy(
  () => import("@/Animations/textAnimatio/textAnimation")
);
const Footer = lazy(() => import("@/_components/footerCom/footer"));

// Datos del carousel
const items = [
  {
    image: "/img/pexels-katlovessteve-551628.jpg",
    text: "Adopta a tu futura alma gemela",
  },
  {
    image: "/img/pexels-cong-h-613161-1404819.jpg",
    text: "Ayuda a un animalito a tener un mejor día",
  },
  { image: "/img/image.jpg", text: "Gestiona tus protectoras" },
];

const HomeView: React.FC = () => {
  const logoRef = useRef<HTMLImageElement | null>(null);
  const gradientBackgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gradientBackgroundRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateLogoOnIntersect(logoRef.current);
              animateLogoVisibility(logoRef.current);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(gradientBackgroundRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <section>
      <header>
        <section style={{ position: "fixed", top: 0, zIndex: 9000 }}>
          <PrimarySearchAppBar backgroundGradient="linear-gradient(311deg, rgba(57,200,148,1) 0%, rgba(255,214,157,1) 76%, rgba(253,141,29,1) 100%)" />
          <SimpleBottomNavigation
            labels={{
              textoUno: "Home",
              textoDos: "Voluntariado",
              textoTres: "Adoptar",
              textoCuatro: "Donar",
              textoCinco: "About Us",
              textoSeis: "Contacto",
            }}
          />
        </section>
      </header>
      <main style={{ width: "100vw", height: "auto" }}>
        <section
          ref={gradientBackgroundRef}
          style={{
            width: "100vw",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "6rem",
          }}
        >
          <div
            className={styles.logoContainer}
            style={{
              width: "100vw",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <section style={{ height: "inherit", width: "inherit" }}>
              <div
                className={styles.logoWrapper}
                style={{
                  position: "relative",
                  zIndex: 300,
                  width: "auto",
                  height: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                  top: "20vh",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "-100px",
                }}
              >
                <img
                  ref={logoRef}
                  src="/img/logoPaws.png"
                  alt="Logo PawsTopTram"
                  className={styles.logo}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 300,
                    width: "auto",
                    height: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FloatingText
                    text="Adopta Amor, Un Hogar Seguro, Una Vida Feliz"
                    id=""
                    textDos="y Gestiona la amabilidad"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  position: "relative",
                  zIndex: 300,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "auto",
                    height: "auto",
                    top: "6vh",
                  }}
                >
                  <CircleButton
                    text="Adopta"
                    size="30ch"
                    backgroundColor="#6fc263"
                    id=""
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "auto",
                    height: "auto",
                    left: "-18vw",
                    top: "-14vh",
                  }}
                >
                  <ButtonFlower />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "auto",
                    height: "auto",
                    left: "19.5vw",
                    top: "-40vh",
                  }}
                >
                  <CircleButton
                    text="Ayuda"
                    size="40ch"
                    backgroundColor="#94cf98"
                    id=""
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "auto",
                    height: "auto",
                    right: "",
                    top: "",
                  }}
                >
                  <CircleButton
                    text="Dona"
                    size="20ch"
                    backgroundColor="#ffc200"
                    id=""
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default HomeView;
