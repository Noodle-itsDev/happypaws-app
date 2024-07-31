"use client";
import Link from "next/link";
import React from "react";
import Styles from './footer.module.css';

// Definir la interfaz para las propiedades del componente
interface FooterProps {
  color: string;
}

const Footer: React.FC<FooterProps> = ({ color = "#fd9227" }) => {
  return (
    <>
      <section style={{ display: "flex", flexDirection: "row", padding: "40px", backgroundColor: color, fontSize: "18px", width: "100vw"}}>
        <div
          style={{
            width: "100vw",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "left",
              gap: "10px",
              color: "white"
            }}
          >          
            <img
              src="/img/whiteAPaws.png"
              alt="Logo"
              style={{ width: "80px" }}
            />
            <div />
            <Link href={"/"} className="text-lg">
              Home
            </Link>
            <Link href={"/"} className="text-lg">
              Protectoras
            </Link>
            <Link href={"/"} className="text-lg">
              Voluntariado
            </Link>
            <Link href={"/"} className="text-lg">
              Inicio de sesión
            </Link>
            <Link href={"/"} className="text-lg">
              Contacto
            </Link>
            <Link href={"/"} className="text-lg">
              Sobre Nosotros
            </Link>
            <Link href={"/"} className="text-lg">
              Preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
      <div className={Styles.separator}></div>
      <section style={{ width: "100vw", display: "flex", flexDirection: "row", justifyContent: "center", padding: "40px", backgroundColor: color, color: "white" }}>
        <p>&copy; 2024 Happy Paws a web made by Johana Almeida and Borja Orts</p>
      </section>
    </>
  );
};

export default Footer;
