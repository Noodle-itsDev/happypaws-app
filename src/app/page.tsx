"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Styles from "./home.module.css";
import { animateLogoOnIntersect, animateLogoVisibility } from "../Animations/animationImg/animationLogo";

const ImageCarousel = dynamic(
  () => import("@/_components/bannerComponent/bannerComponent")
);
const SimpleBottomNavigation = dynamic(
  () => import("@/_components/navigation/navigationNavBar")
);
const PrimarySearchAppBar = dynamic(
  () => import("@/_components/header/headerGradient")
);
import CircleButton from "@/_components/floatings/circleFloat/circleFloat";
import FloatingText from "@/Animations/textAnimatio/textAnimation";

const items = [
  { image: "/img/pexels-katlovessteve-551628.jpg", text: "Adopta a tu futura alma gemela" },
  { image: "/img/pexels-cong-h-613161-1404819.jpg", text: "Ayuda a un animalito a tener un mejor día" },
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
              textoUno: "",
              textoDos: "",
              textoTres: "",
              textoCuatro: "",
              textoCinco: "",
              textoSeis: "",
            }}
          />
        </section>
      </header>
      <main style={{ width: "100dvw", height: "auto" }}>

        {/* BANNER */}
        <section style={{ width: "100dvw", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{ marginTop: "4rem", width: "100dvw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", background: "radial-gradient(circle, rgba(255,235,215,1) 4%, rgba(255,235,215,1) 70%, rgba(255,226,195,1) 78%, rgba(255,220,185,1) 85%, rgba(249,208,168,1) 90%, rgba(255,201,147,1) 100%)" }}
          >

            <div style={{ marginTop: "6rem", width: "fit-content", height: "fit-content" }}>
              <ImageCarousel items={items} />
            </div>

          </div>

        </section>

        {/* Logo */}
        <section
          ref={gradientBackgroundRef}
          style={{ width: "100dvw", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div
            className={` ${Styles.logoContainer} ${Styles.cssSelector}`}
            style={{ width: "100dvw", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
          >
            <section style={{ boxShadow: "0px 20px 20px gray inset", height: "inherit", width: "inherit" }}>

              <div className={`${Styles.logoWrapper} `} style={{ position: "relative", zIndex: "300", width: "auto", height: "auto", marginLeft: "auto", marginRight: "auto", top: "20vh", display: "flex", flexDirection: "column"}}>
                <img ref={logoRef} src="/img/logoPaws.png" alt="Logo PawsTopTram" className={Styles.logo} />
                <div style={{ position: "relative", zIndex: "300", width: "auto", height: "auto", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column"}}>
                <FloatingText text={"Adopta Amor, Un Hogar Seguro, Una Vida Feliz y Gestiona la amabilidad"} id={""}/>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around",position: "relative", zIndex: "300"}}>
                <div style={{ position: "relative", width: "auto", height: "auto", left: "-4vw", top: "9vh" }}>
                  <CircleButton text={"Adopta"} size="30ch" backgroundColor={"#6fc263"} id={""} />
                </div>
                <div style={{ position: "relative", width: "auto", height: "auto", left: "30vw", top: "-35vh" }}>
                  <CircleButton text={"Ayuda"} size={"40ch"} backgroundColor={"#94cf98"} id={""} />
                </div>
                <div style={{ position: "relative", width: "auto", height: "auto", right: "-3vw", top: "" }}>
                  <CircleButton text={"Dona"} size={"20ch"} backgroundColor={"#ffc200"} id={""} />
                </div>
              </div>


            </section>
          </div>
        </section>
      </main>
    </section>
  );
};

export default HomeView;

