import React from "react";

import PrimarySearchAppBar from "../../../../_components/header/headerGradient";
import SimpleBottomNavigation from "../../../../_components/navigation/navigationNavBar";
import Footer from "@/_components/footerCom/footer";
import BasicTextFields from "@/_components/inputs/usuario/inputUsuario";
import UploadImg from "@/_components/uploadImg/uploadImg";

const ProtectoraProfile: React.FC = () => {
  return (
    <>
      <header style={{ position: "fixed", top: 0, zIndex: 9999 }}>
        <PrimarySearchAppBar
          backgroundGradient=" linear-gradient(90deg, rgba(0,151,178,1) 0%, rgba(126,217,87,1) 100%)"
          accessHref={"/"}
          accessLabel={"Cerrar sesión"}
        />
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
      </header>
      <main
        style={{
          height: "auto",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section style={{ height: "auto", width: "50vw" }}></section>
        <section
          style={{
            minHeight: "100vh",
            width: "50vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ height: "auto", width: "20vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}></div>
          <div
            style={{
              position: "fixed",
              height: "100vh",
              width: "25vw",
              backgroundColor: "#3bb688ba",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              right: "0",
              top: 0,
              columnGap: "10vh"
            }}
          >
            <div style={{ height: "30vh",width: "30vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <UploadImg id={""} />
            </div>
            <div style={{fontSize: "2rem", height: "10vh"}}>
              <h1>NOMBRE DE PROTECTORA</h1>
            </div>
            <div style={{ maxHeight: "20vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginRight: "20%", }}>
              <BasicTextFields
                id={""}
                placeholder={"Nombre"}
                width="130%"
                disabled={true}
              />
              <BasicTextFields
                id={""}
                placeholder={"Nombre"}
                width="130%"
                disabled={true}
              />
              <BasicTextFields
                id={""}
                placeholder={"Nombre"}
                width="130%"
                disabled={true}
              />
              <BasicTextFields
                id={""}
                placeholder={"Nombre"}
                width="130%"
                disabled={true}
              />
            </div>
          </div>
        </section>
      </main>
      <footer style={{position: "sticky", bottom: "auto"}}>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default ProtectoraProfile;
