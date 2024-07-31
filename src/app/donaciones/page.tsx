"use client";

"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";


// Registrar los plugins de GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);

const Donaciones: React.FC = () => {

    return (
        <>

                <header>

                </header>
                <main>

                </main>
                <footer>

                </footer>

        </>
    );
};

export default Donaciones;
