import React from "react";

import PrimarySearchAppBar from "../../../../_components/header/headerGradient";
import SimpleBottomNavigation from "../../../../_components/navigation/navigationNavBar";

const ProtectoraProfile: React.FC = () => {

  return (
    <>

      <header>
        <PrimarySearchAppBar backgroundGradient=" linear-gradient(90deg, rgba(0,151,178,1) 0%, rgba(126,217,87,1) 100%)" />
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
      <main className="p-20 flex flex-col items-center justify-center bg-secondary-orange bg-[#efefef]" style={{ background: "linear-gradient(#22a99947 0%, white 50%, white 100%)" }}>
  
      </main>
    </>
  );
};

export default ProtectoraProfile;
