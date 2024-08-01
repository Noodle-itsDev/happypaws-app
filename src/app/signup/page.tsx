"use client";

import axios from "axios";
import React, { useState } from "react";
import Styles from "./signup.module.css";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import Footer from "@/_components/footerCom/footer";
import CustomButton from "@/_components/button/buttonCurrent";
import BasicTextFields from "@/_components/inputs/usuario/inputUsuario";

const SignupView: React.FC = () => {
  const [view, setView] = useState<
    | "initial"
    | "formularioRegistro"
    | "formularioRegistroUsuario"
    | "formularioRegistroProtectora"
    | "user"
    | "protectora"
  >("initial");
  const [fadeOut, setFadeOut] = useState(false);

  const handleButtonClick = (
    targetView:
      | "formularioRegistro"
      | "user"
      | "protectora"
      | "formularioRegistroUsuario"
      | "formularioRegistroProtectora"
  ) => {
    setFadeOut(true);
    setTimeout(() => {
      setView(targetView);
      setFadeOut(false);
    }, 500); // Tiempo de desvanecimiento
  };

  const handleAccessProtectoraClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setView("protectora");
      setFadeOut(false);
    }, 500); // Tiempo de desvanecimiento
  };

  const handleRegisterUsuarioClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setView("formularioRegistroUsuario");
      setFadeOut(false);
    }, 500); // Tiempo de desvanecimiento
  };

  const handleAccessUsuarioClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setView("user");
      setFadeOut(false);
    }, 500); // Tiempo de desvanecimiento
  };

  const handleRegisterProtectoraClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setView("formularioRegistroProtectora");
      setFadeOut(false);
    }, 500); // Tiempo de desvanecimiento
  };

  const handleBackToAccessFormClick = (p0: string) => {
    setFadeOut(true);
    setTimeout(() => {
      setView("initial");
      setFadeOut(false);
    }, 500); // Tiempo de desvanecimiento
  };

  const handleLogin = async () => {
    // Obtener los valores directamente de los inputs usando document.getElementById

    document.getElementById('error')!.innerText = "";
    document.getElementById('success')!.innerText = "";
    try {
      const response = await axios.post('http://194.164.165.239:8080/api/auth/login', {
        username: (document.getElementById('username') as HTMLInputElement).value,
        password: (document.getElementById('passwd') as HTMLInputElement).value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      document.getElementById('success')!.innerText = "Autenticación realizada con éxito";

      const { accesToken, user } = response.data;
      localStorage.setItem('authToken', accesToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      if(user.protectoras && user.protectoras.lenght > 0){
        window.location.href = '/usuario/profile';
      } else {
        window.location.href = '/mascotas';
      }

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          document.getElementById('error')!.innerText = "Usuario o contraseña incorrectos";
          console.error('Error response data:', error.response);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('Error message:', (error as Error).message);
      }
    }
  }
  return (
    <>
      <header style={{ position: "fixed", top: "0", zIndex: 9000 }}>
        <PrimarySearchAppBar backgroundGradient="linear-gradient(311deg, rgba(57,200,148,1) 0%, rgba(255,214,157,1) 76%, rgba(253,141,29,1) 100%)" accessHref={"/signup"} accessLabel={"Acceso"} />
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
      </header>

      <main
        style={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        <section
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={`${Styles.videoBackground}`}>
            <video autoPlay muted loop className={`${Styles.backgroundVideo}`}>
              <source
                src="/video/4625769-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <section
            className={`${Styles.overlayContent}`}
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10vh",
            }}
          >
            <section
              className={`${Styles.backgroundTransparent}`}
              style={{
                height: "80vh",
                width: "70vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff6b",
                borderRadius: "20px",
                marginLeft: "5vw",
                marginBottom: "-40px",
              }}
            >
              {/* Formulario de Acceso */}
              <div
                className={`${view === "initial" ? Styles.fadeIn : Styles.fadeOut
                  } ${fadeOut ? Styles.fadeOut : ""} formularioAcceder`}
                style={{
                  height: "70vh",
                  width: "40vw",
                  display: view === "initial" ? "flex" : "none",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                  fontSize: "3rem",
                }}
              >
                <div>
                  <h1 className={`${Styles.titleFont}`}>Acceder como:</h1>
                </div>
                <div style={{ marginTop: "-90px" }}>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={"protectoraSignup"}
                      label={"Protectora"}
                      width={280}
                      height={50}
                      onClick={() => handleButtonClick("protectora")}
                    />
                  </div>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={"usuarioSignup"}
                      label={"Usuario"}
                      width={280}
                      height={50}
                      onClick={() => handleButtonClick("user")}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "6vh",
                      fontSize: "18px",
                      color: "#104b4b",
                    }}
                  >
                    <p>
                      <span>Aún no tiene cuenta?</span>
                    </p>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={"registrarse"}
                      label={"Registrarse"}
                      width={280}
                      height={50}
                      onClick={() => handleButtonClick("formularioRegistro")}
                    />
                  </div>
                </div>
              </div>

              {/* Formulario de Registro */}
              <div
                className={`${view === "formularioRegistro" ? Styles.fadeIn : Styles.fadeOut
                  } ${fadeOut ? Styles.fadeOut : ""} formularioRegistro`}
                style={{
                  height: "70vh",
                  width: "40vw",
                  display: view === "formularioRegistro" ? "flex" : "none",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                  fontSize: "3rem",
                }}
              >
                <div>
                  <h1 className={`${Styles.titleFont}`}>Registrarse como:</h1>
                </div>
                <div style={{ marginTop: "-90px" }}>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={"protectoraSignup"}
                      label={"Protectora"}
                      width={280}
                      height={50}
                      onClick={() =>
                        handleButtonClick("formularioRegistroProtectora")
                      }
                    />
                  </div>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={"usuarioSignup"}
                      label={"Usuario"}
                      width={280}
                      height={50}
                      onClick={() =>
                        handleButtonClick("formularioRegistroUsuario")
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "6vh",
                      fontSize: "18px",
                      color: "#104b4b",
                    }}
                  >
                    <p>
                      <span>Ya tiene cuenta? </span>
                    </p>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={"acceder"}
                      label={"Acceder"}
                      width={280}
                      height={50}
                      onClick={() => handleBackToAccessFormClick("initial")}
                    />
                  </div>
                </div>
                {/* Botón para volver a Formulario de Acceso */}
                <div style={{ position: "absolute", bottom: "40px", left: "120px" }}>
                  <CustomButton
                    bgColor={"#104b4b"}
                    opacity={1}
                    fontColor={""}
                    buttonId={"volverAcceso"}
                    label={"Volver"}
                    width={150}
                    height={40}
                    onClick={() => handleBackToAccessFormClick("initial")}
                  />
                </div>
              </div>

              {/* Formulario Registro Usuario */}
              <div
                className={`${view === "formularioRegistroUsuario"
                  ? Styles.fadeIn
                  : Styles.fadeOut
                  } ${fadeOut ? Styles.fadeOut : ""} formularioRegistroUsuario`}
                style={{
                  height: "70vh",
                  width: "40vw",
                  display:
                    view === "formularioRegistroUsuario" ? "flex" : "none",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                  fontSize: "3rem",
                }}
              >
                <div>
                  <h1 className={`${Styles.titleFont}`}>Registro de Usuario</h1>
                </div>
                <div style={{ marginTop: "-90px" }}>
                  <div>
                    <BasicTextFields id={""} placeholder={"Nombre"} />
                  </div>
                  <div>
                    <BasicTextFields id={""} placeholder={"Correo"} />
                  </div>
                  <div>
                    <BasicTextFields id={""} placeholder={"Contraseña"} />
                  </div>
                  <div>
                    <BasicTextFields
                      id={""}
                      placeholder={"Confirmar Contraseña"}
                    />
                  </div>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={""}
                      label={"Enviar"}
                      width={280}
                      height={50}
                      onClick={() => { }}
                    />
                  </div>
                  <div>
                    <p>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                          onClick={handleAccessProtectoraClick}
                        >
                          Acceder como protectora
                        </a>
                      </span>
                    </p>
                    <p>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                          onClick={handleAccessUsuarioClick}
                        >
                          ¿Ya tiene cuenta? Acceda
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
                {/* Botón para volver a Formulario de Acceso */}
                <div style={{ position: "absolute", bottom: "40px", left: "120px" }}>
                  <CustomButton
                    bgColor={"#104b4b"}
                    opacity={1}
                    fontColor={""}
                    buttonId={"volverAcceso"}
                    label={"Volver"}
                    width={150}
                    height={40}
                    onClick={() => handleBackToAccessFormClick("initial")}
                  />
                </div>
              </div>

              {/* Formulario Registro Protectora */}
              <div
                className={`${view === "formularioRegistroProtectora"
                  ? Styles.fadeIn
                  : Styles.fadeOut
                  } ${fadeOut ? Styles.fadeOut : ""
                  } formularioRegistroProtectora`}
                style={{
                  height: "70vh",
                  width: "40vw",
                  display:
                    view === "formularioRegistroProtectora" ? "flex" : "none",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                  fontSize: "3rem",
                }}
              >
                <div>
                  <h1 className={`${Styles.titleFont}`}>
                    Petición de registro
                  </h1>
                </div>
                <div style={{ marginTop: "" }}>
                  <div>
                    <BasicTextFields
                      id={""}
                      placeholder={"CIF"}
                    />
                  </div>
                  <div>
                    <BasicTextFields id={""} placeholder={"Nombre de la protectora"} />
                  </div>
                  <div>
                    <BasicTextFields id={""} placeholder={"Correo"} />
                  </div>
                  <div>
                    <BasicTextFields
                      id={""}
                      placeholder={"Localidad"}
                    />
                  </div>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={""}
                      label={"Enviar"}
                      width={280}
                      height={50}
                      onClick={() => { }}
                    />
                  </div>
                  <div>
                    <p>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",

                          }}
                          onClick={handleAccessUsuarioClick}
                        >
                          Acceder como usuario
                        </a>
                      </span>
                    </p>
                    <p style={{ marginTop: "-3vh" }}>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",

                          }}
                          onClick={handleAccessProtectoraClick}
                        >
                          ¿Ya tiene cuenta? Acceda
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
                {/* Botón para volver a Formulario de Acceso */}
                <div style={{ position: "absolute", bottom: "40px", left: "120px" }}>
                  <CustomButton
                    bgColor={"#104b4b"}
                    opacity={1}
                    fontColor={""}
                    buttonId={"volverAcceso"}
                    label={"Volver"}
                    width={150}
                    height={40}
                    onClick={() => handleBackToAccessFormClick("initial")}
                  />
                </div>
              </div>

              {/* Formulario de Acceso Usuario */}
              <div
                className={`${view === "user" ? Styles.fadeIn : Styles.fadeOut
                  } ${fadeOut ? Styles.fadeOut : ""} formularioLoginUsuario`}
                style={{
                  height: "70vh",
                  width: "40vw",
                  display: view === "user" ? "flex" : "none",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                  fontSize: "3rem",
                }}
              >
                <div>
                  <h1 className={`${Styles.titleFont}`}>¡Bienvenido de nuevo!</h1>
                </div>
                <div style={{ marginTop: "-90px" }}>
                  <div>
                    <span style={{ color: "red", fontSize: "18px", fontWeight: "600"}} id="error"></span>
                    <span style={{ color: "green", fontSize: "18px", fontWeight: "600"}} id="success"></span>
                    <BasicTextFields id={"username"} placeholder={"Correo"} />
                  </div>
                  <div>
                    <BasicTextFields id={"passwd"} placeholder={"Contraseña"} type={"password"} />
                  </div>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={""}
                      label={"Acceder"}
                      width={280}
                      height={50}
                      onClick={() => { handleLogin() }}
                    />
                  </div>
                  <div>
                    <p>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                          onClick={handleAccessProtectoraClick}
                        >
                          Acceder como protectora
                        </a>
                      </span>
                    </p>
                    <p >
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                          onClick={handleRegisterUsuarioClick}
                        >
                          ¿Aún no tiene cuenta? Regístrese
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
                {/* Botón para volver a Formulario de Acceso */}
                <div style={{ position: "absolute", bottom: "40px", left: "120px" }}>
                  <CustomButton
                    bgColor={"#104b4b"}
                    opacity={1}
                    fontColor={""}
                    buttonId={"volverAcceso"}
                    label={"Volver"}
                    width={150}
                    height={40}
                    onClick={() => handleBackToAccessFormClick("initial")}
                  />
                </div>
              </div>

              {/* Formulario de Acceso Protectora */}
              <div
                className={`${view === "protectora" ? Styles.fadeIn : Styles.fadeOut
                  } ${fadeOut ? Styles.fadeOut : ""} formularioLoginProtectora`}
                style={{
                  height: "70vh",
                  width: "40vw",
                  display: view === "protectora" ? "flex" : "none",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "20px",
                  flexDirection: "column",
                  fontSize: "3rem",
                }}
              >
                <div>
                  <h1 className={`${Styles.titleFont}`}>Acceso Protectora</h1>
                </div>
                <div style={{ marginTop: "-90px" }}>
                  <div>
                    <BasicTextFields id={""} placeholder={"CIF"} />
                  </div>
                  <div>
                    <BasicTextFields id={""} placeholder={"Contraseña"} />
                  </div>
                  <div>
                    <CustomButton
                      bgColor={"#104b4b"}
                      opacity={1}
                      fontColor={""}
                      buttonId={""}
                      label={"Acceder"}
                      width={280}
                      height={50}
                      onClick={() => { }}
                    />
                  </div>
                  <div>
                    <p>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                          onClick={handleAccessUsuarioClick}
                        >
                          Acceder como usuario
                        </a>
                      </span>
                    </p>
                    <p>
                      <span>
                        <a
                          href="#"
                          style={{
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                          onClick={handleRegisterProtectoraClick}
                        >
                          ¿Aún no tiene cuenta? Regístrese
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
                {/* Botón para volver a Formulario de Acceso */}
                <div style={{ position: "absolute", bottom: "40px", left: "120px" }}>
                  <CustomButton
                    bgColor={"#104b4b"}
                    opacity={1}
                    fontColor={""}
                    buttonId={"volverAcceso"}
                    label={"Volver"}
                    width={150}
                    height={40}
                    onClick={() => handleBackToAccessFormClick("initial")}
                  />
                </div>
              </div>
            </section>
          </section>
        </section>
      </main>

      <footer>
        <Footer color={"orange"} />
      </footer>
    </>
  );
};

export default SignupView;
function setToken(token: any) {
  throw new Error("Function not implemented.");
}

