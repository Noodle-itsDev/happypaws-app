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
import RotatingButton from "@/_components/buttonColors/buttonFlower";
const FloatingText = lazy(
  () => import("@/Animations/textAnimatio/textAnimation")
);
const Footer = lazy(() => import("@/_components/footerCom/footer"));

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
    <section className={styles.mainContainer}>
      <header className={styles.header}>
        <Suspense fallback={<div>Loading...</div>}>

        </Suspense>
      </header>
      <main className={styles.main}>
        <section ref={gradientBackgroundRef} className={styles.contentSection}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <img
                ref={logoRef}
                src="/img/logoPaws.png"
                alt="Logo PawsTopTram"
                className={styles.logo}
              />
              <Suspense fallback={<div>Loading...</div>}>
                <FloatingText
                  text="Adopta Amor, Un Hogar Seguro, Una Vida Feliz"
                  id=""
                  textDos="y Gestiona la amabilidad"
                />
              </Suspense>
            </div>
            <div className={styles.buttonContainer}>
              <CircleButton
                text="Adopta"
                size="30ch"
                backgroundColor="#6fc263"
                id=""
              />
              <div className={styles.rotatingButtonWrapper}>
                <RotatingButton/>
              </div>
              <CircleButton
                text="Ayuda"
                size="40ch"
                backgroundColor="#94cf98"
                id=""
              />
              <CircleButton
                text="Dona"
                size="20ch"
                backgroundColor="#ffc200"
                id=""
              />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Suspense fallback={<div>Loading...</div>}>
          <Footer color={"#ffc200"} />
        </Suspense>
      </footer>
    </section>
  );
};

export default HomeView;