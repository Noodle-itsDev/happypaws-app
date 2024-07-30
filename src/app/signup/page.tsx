"use client"

import React from "react";
import Styles from './signup.module.css';

import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import Footer from "@/_components/footerCom/footer";
import RotatingFlower from "@/_components/flowerRotatingIcon/flowerRotationg.module";



const SignupView: React.FC = () => {

  return (
    <>
      <header style={{ position: "fixed", top: "0", zIndex: 9000 }}>
        <PrimarySearchAppBar
          backgroundGradient="linear-gradient(311deg, rgba(57,200,148,1) 0%, rgba(255,214,157,1) 76%, rgba(253,141,29,1) 100%)"
        />
        <SimpleBottomNavigation labels={{
          textoUno: "",
          textoDos: "",
          textoTres: "",
          textoCuatro: "",
          textoCinco: "",
          textoSeis: ""
        }} />
      </header>

      <main style={{ height: "100vh", display: "flex", justifyContent: "center", }}>

        <section style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

          <div className={`${Styles.videoBackground}`}>
            <video autoPlay muted loop className={`${Styles.backgroundVideo}`}>
              <source src="/video/4772989-uhd_3840_2160_24fps.mp4" type="video/mp4" />
            </video>
          </div>

          <section className={`${Styles.overlayContent}`} style={{ height: "100vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: "10vh" }}>
            <section className={`${Styles.backgroundTransparent}`} style={{ height: "80vh", width: "45vw", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff6b", borderRadius: "20px", marginLeft: "5vw" }}>
              <div style={{ height: "70vh", width: "40vw", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "20px", flexDirection: "column", fontSize: "3rem"}}>
                <div>
                  <h1>Acceder como</h1>
                </div>
                <div >
                    <div>
                      
                    </div>
                    <div>
                      
                    </div>
                </div>
              </div>
            </section>
            <section className={`${Styles.backgroundTransparent}`} style={{ height: "100vh", width: "50vw", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <div style={{ position: "relative", marginBottom: "70vh", right: "-30vw" }}>
                <RotatingFlower src={"/img/florAzul.png"} alt={"Flor"} />

              </div>
            </section>
          </section>

        </section>
      </main>
      <footer style={{ position: "relative", zIndex: 3 }}>
        <Footer></Footer>
      </footer>
    </>

  );


}
export default SignupView;