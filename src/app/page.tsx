"use client";

import React, { useRef, useEffect } from "react";
import ImageCarousel from "../_components/bannerComponent/bannerComponent";
import SimpleBottomNavigation from "../_components/navigation/navigationNavBar";
import PrimarySearchAppBar from "../_components/header/headerGradient";
import { animateImage } from "../_components/homeViewButtons/homeViewButtons";
import CometTrail from "../_components/cometTrail/comet";
import ToggleDiv from "../_components/toogleDiv/toogleDiv";
import '../../public/fonts/playwrite.css';
import  Styles  from'./home.module.css';
import './globals.css';
import zIndex from "@mui/material/styles/zIndex";

const items = [
  { image: "/img/pexels-katlovessteve-551628.jpg", text: "Adopta a tu futura alma gemela" },
  { image: "/img/pexels-cong-h-613161-1404819.jpg", text: "Ayuda a un animalito a tener un mejor día" },
  { image: "/img/image.jpg", text: "Gestiona tus protectoras" },
];

const HomeView: React.FC = () => {
      const buttonsContainerRef = useRef<HTMLDivElement | null>(null);
      const logoImgRef = useRef<HTMLImageElement | null>(null);
      useEffect(() => {
        if (buttonsContainerRef.current) {
        }

        if (logoImgRef.current) {
          animateImage(logoImgRef);
        }
      }, []);

      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "9900" }}>
            <PrimarySearchAppBar backgroundGradient="linear-gradient(311deg, rgba(57,200,148,1) 0%, rgba(255,214,157,1) 76%, rgba(253,141,29,1) 100%)" />
            <SimpleBottomNavigation
              labels={{
                textoUno: "Uno",
                textoDos: "Dos",
                textoTres: "Tres",
                textoCuatro: "Cuatro",
                textoCinco: "Cinco",
                textoSeis: "Seis",
              }}
            />
          </div>
          <section style={{ marginTop: "10rem", width: "99vw"}}>
            <div
              className="bg-opacity-60" style={{background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,217,137,1) 100%)", height: "700px", width: "100vw", paddingLeft: "auto", paddingRight: "auto",
                display: "flex", justifyContent: "center", alignContent: "center" }}>
              <div className="fixed" style={styles.container}>
                <ImageCarousel items={items} />
              </div>
            </div>
          </section>
          <section className="buttons-animation" style={{ position: "relative", zIndex: "1100", width: "100vw" }}  ref={buttonsContainerRef}>
            <CometTrail />
            <div className={`${Styles.backgroundAnimated}`} style={{ height: "800px", width: "100vw", paddingLeft: "auto", paddingRight: "auto", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div className="max-w-[100vw] textAdopciones" style={{
                maxWidth: "100vw"
              }}>
                <div className="mt-[-100px] flex align-center justify-center" style={{ marginTop: "-100px", display: "flex", alignItems: "center",justifyContent: "center"}}>
                  <img className={`${Styles.imageLogo}`} src="/img/LogoPaws.png" alt="Logo" ref={logoImgRef} />
                </div>
                <div className={`${Styles.textContainerBenefits}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "1400px", marginTop: "100px"}}>
                  <span> Adopta Amor, Un Hogar Seguro, Una Vida Feliz <br /> y Gestiona la amabilidad</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className={`${Styles.interSection}`} style={{ position: "relative", height: "830px", zIndex: "1400", backgroundColor: "white"}}>
            </div>
          </section>
          <section style={{ position: "relative", zIndex: "1500", top: "-700px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{ boxShadow: '0px 20px 20px 20px #808080a1', width: "80vw", height: "830px", backgroundColor: "#e9d49c", display: "flex", alignItems: "center", borderRadius: "20px"}}>
              <div style={{ display: "flex" }}>
                <ToggleDiv contentOne={<div></div>} contentTwo={<div></div>} zIndexOne={1200} 
                  zIndexTwo={1200}
                />
              </div>
            </div>
          </section>
        </div>
      );
    };

const styles = {
      container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 6rem)",
        overflow: "hidden",
      },
    };

export default HomeView;

