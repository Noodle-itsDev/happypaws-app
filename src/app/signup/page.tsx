"use client";

import React, { Suspense, useState, useEffect } from "react";
import "./registerLoginView.css";
import { createTheme as createThemeDefault } from "@mui/material/styles";
import BasicTextFields from "@/_components/inputs/usuario/inputUsuario";
import ContainedButtons from "@/_components/buttonPlacerholder/buttonSubmit";
const PrimarySearchAppBar = React.lazy(
  () => import("../../_components/header/headerGradient")
);
const SimpleBottomNavigation = React.lazy(
  () => import("../../_components/navigation/navigationNavBar")
);

const Signup: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setHeaderVisible(true), 500),
      setTimeout(() => setNavVisible(true), 1000),
      setTimeout(() => setVideoVisible(true), 1500),
      setTimeout(() => setSectionVisible(true), 2000),
      setTimeout(() => setLogoVisible(true), 2500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <>
      <header style={{ position: "sticky", top: "0px", zIndex: "9000" }}>
        <Suspense fallback={<div>Loading header...</div>}>
          <div className={`fade-in ${headerVisible ? "visible" : ""}`}>
            <PrimarySearchAppBar backgroundGradient="linear-gradient(311deg, rgba(57,200,148,1) 0%, rgba(255,214,157,1) 76%, rgba(253,141,29,1) 100%)" />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading navigation...</div>}>
          <div className={`fade-in ${navVisible ? "visible" : ""}`}>
            <SimpleBottomNavigation
              labels={{
                textoUno: "Donaciones",
                textoDos: "Protectoras",
                textoTres: "Inicio",
                textoCuatro: "Voluntariado",
                textoCinco: "Sobre Nosotros",
                textoSeis: "Contacto",
              }}
            />
          </div>
        </Suspense>
      </header>

      <main style={{ maxWidth: "100vw", maxHeight: "100vh" }}>
        <Suspense fallback={<div>Loading video...</div>}>
          <section
            className={`relative fade-in ${videoVisible ? "visible" : ""}`}
          >

            <Suspense>
              <section>
                <video
                  autoPlay
                  muted
                  loop
                  className={`video-container fade-in ${videoVisible ? "visible" : ""
                    }`}
                >
                  <source
                    src="/video/4625769-hd_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                </video>
                <section
                  className={`scale-up-hor-right login-section  fade-in ${sectionVisible ? "visible" : ""
                    }`}
                  style={{
                    height: "87.3vh",
                    width: "50vw",
                    backgroundColor: "#ffffff75",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    zIndex: "200",
                    borderTopLeftRadius: "30px",
                    borderBottomLeftRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: "87.3vh",
                      width: "50vw",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      columnGap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/img/yellowLogoPaws.png"
                      alt=""
                      className={`fade-in ${logoVisible ? "visible" : ""}`}
                      style={{
                        width: "15vw",
                        marginBottom: "20px",
                        position: "relative",
                        top: "",
                        zIndex: "1300",
                      }}
                    />

                    <div
                      className="shadowCss"
                      style={{
                        backgroundColor: "#40c8925d",
                        height: "70%",
                        width: "60%",
                        borderRadius: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginTop: "-20px",
                      }}
                    >
                      <div>
                        <p className="font">
                          <span>Iniciar sesión</span>
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignContent: "center",
                          marginTop: "-20px",
                        }}
                      >
                        <BasicTextFields
                          id="usuario"
                          placeholder="Usuario"
                          backgroundColor="#f0f0f0"
                          width="16vw"
                          height="55px"
                        />
                        <BasicTextFields
                          id="usuario"
                          placeholder="Usuario"
                          backgroundColor="#f0f0f0"
                          width="16vw"
                          height="55px"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15px",
                          }}
                        >
                          <ContainedButtons
                            id="enviar"
                            color="white"
                            width="10vw"
                            height="string"
                            borderRadius="string"
                            label="Enviar"
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          marginTop: "-7vh",
                        }}
                      >
                        <a
                          style={{ textDecoration: "underline", color: "blue" }}
                          href=""
                        >
                          Iniciar sesión como protectora
                        </a>
                        <a
                          style={{ textDecoration: "underline", color: "blue" }}
                          href=""
                        >
                          ¿Aún no tiene cuenta? <br/> Regístrese
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div
                    style={{
                      backgroundColor: "#40c8925d",
                      height: "70%",
                      width: "60%",
                      borderRadius: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      marginTop: "-20px",
                    }}>
                      
                  </div>
                </section>
              </section>
            </Suspense>
          </section>
        </Suspense>
      </main>
    </>
  );
};

export default Signup;
