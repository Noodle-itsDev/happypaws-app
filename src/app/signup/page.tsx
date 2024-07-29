"use client";

import React, { Suspense, useState, useEffect } from "react";
import "./registerLoginView.css";
import { createTheme as createThemeDefault } from "@mui/material/styles";
import BasicTextFields from "@/_components/inputs/usuario/inputUsuario";
import ContainedButtons from "@/_components/buttonPlacerholder/buttonSubmit";
import Footer from "@/_components/footerCom/footer";
import { relative } from "path";
import FlowerComAnimated from "@/_components/flowerComAnimated/flowerComAnimated";
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
  const [isRegistering, setIsRegistering] = useState(false); // Nuevo estado

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

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsRegistering(true);
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsRegistering(false);
  };

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
                  <section style={{display: "flex", flexDirection: "column", alignContent: "center", justifyContent:"center"}}>
                    {/* <section>
                    <div style={{position: "relative", top: "-600px", zIndex: "400", left:"-500px", justifyContent: "center", alignContent: "center"}}>
                    <FlowerComAnimated/>
                      <img src="img/perritoGuiñando.png" alt="" style={{width:"382px", position: "relative",left: "1000px", top: "-130px"}}/>
                      <span style={{width:"482px", position: "relative",top: "-200px", left: "-30px"}}>
                        <p className="fontText">Adoptar una mascota mejora tu vida,<br/> y las mascotas veteranas brindan<br/> estabilidad y amor.</p>
                      </span>
                    </div>
                    </section> */}
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
                    marginTop: "0.3vh"
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
                    <div
                      className="shadowCss"
                      style={{
                        backgroundColor: "#40c8925d",
                        height: "80%",
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
                        <p className="font" style={{marginBottom: "1vh"}}>
                          <span>{isRegistering ? "Regístrate" : "Iniciar sesión"}</span>
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignContent: "center",
                          marginTop: "-80px",
                        }}
                      >
                        {!isRegistering ? (
                          <>
                            <BasicTextFields
                              id="usuario"
                              placeholder="Usuario"
                              backgroundColor="#f0f0f0"
                              width="16vw"
                              height="55px"
                            />
                            <BasicTextFields
                              id="contraseña"
                              placeholder="Contraseña"
                              backgroundColor="#f0f0f0"
                              width="16vw"
                              height="55px"
                            />
                          </>
                        ) : (
                          <>
                            <BasicTextFields
                              id="nombre"
                              placeholder="Nombre"
                              backgroundColor="#f0f0f0"
                              width="16vw"
                              height="55px"
                            />
                            <BasicTextFields
                              id="apellido"
                              placeholder="Apellido"
                              backgroundColor="#f0f0f0"
                              width="16vw"
                              height="55px"
                            />
                            <BasicTextFields
                              id="email"
                              placeholder="Email"
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
                            <BasicTextFields
                              id="contraseña"
                              placeholder="Contraseña"
                              backgroundColor="#f0f0f0"
                              width="16vw"
                              height="55px"
                            />
                          </>
                        )}
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
                            width="15vw"
                            height="string"
                            borderRadius="string"
                            label={isRegistering ? "Registrar" : "Acceder"}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          marginTop: "-9vh",
                        }}
                      >
                        {!isRegistering ? (
                          <>
                                                   <a
                              style={{ color: "blue" }}
                              href=""
                            >
                              Iniciar sesión como protectora
                            </a>
                            <a
                              style={{ color: "blue", marginTop: "1vh" }}
                              href=""
                              onClick={handleRegisterClick}
                            >
                              ¿Aún no tiene cuenta? <br/> Regístrese
                            </a>
   
                          </>
                        ) : (
                          <a
                            style={{ color: "blue", marginTop: "3vh" }}
                            href=""
                            onClick={handleLoginClick}
                          >
                            ¿Ya tiene cuenta? Acceda
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
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
                    }}
                  >

                  </div>
                </section>
              </section>
            </Suspense>
          </section>
        </Suspense>
      </main>
      <footer style={{ marginTop: "3vh" }}>
        <Footer />
      </footer>
    </>
  );
};

export default Signup;
