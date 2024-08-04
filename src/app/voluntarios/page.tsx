"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import Carousel from "@/_components/newBannerCom/newBannerCom";
import Footer from "@/_components/footerCom/footer";
import RotatingImage from "@/_components/flowerComAnimated/flowerComAnimated";

// Registrar los plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

const VolunteersView: React.FC = () => {
    const [elements, setElements] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const sections = gsap.utils.toArray(".section") as HTMLElement[];
        setElements(sections);
    }, []);

    useEffect(() => {
        if (elements.length) {
            // Ordenar los elementos de mayor a menor altura
            const sortedElements = elements.sort((a, b) => b.offsetHeight - a.offsetHeight);
            sortedElements.forEach((element, index) => {
                gsap.fromTo(
                    element,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: index * 0.2, 
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        },
                    }
                );
            });
        }
    }, [elements]);

    const images = [
        { src: 'img/pexels-cong-h-613161-1404819.jpg', alt: 'Gatito' },
        { src: 'img/pexels-mikhail-nilov-7474346.jpg', alt: "imagen voluntarios" },
        { src: 'img/shelter.png', alt: 'perritos' }
    ];

    const title = [
        'Adopta',
        'Hazte voluntario',
        '¡Haz que tu protectora brille aún más!'
    ];

    const paragraphs = [
        'Cientos de miles de mascotas mayores de cinco años esperan en refugios de toda España una segunda oportunidad. Estos compañeros leales y amorosos a menudo son pasados por alto, pero merecen un hogar lleno de cariño. ¡Considera adoptar a un animal mayor y haz la diferencia hoy!',
        '¡Tu tiempo puede transformar vidas! Como voluntario en un refugio, no solo ayudas a cuidar a los animales necesitados, sino que también les ofreces esperanza y amor. Únete a nosotros y marca la diferencia: tu dedicación puede ser el cambio que estos animales están esperando.',
        'Al inscribirte en nuestra red de organizaciones, tendrás acceso a recursos y apoyo para facilitar adopciones y reclutar voluntarios. Únete a nosotros para maximizar tu impacto y ofrecer a más animales la oportunidad de encontrar un hogar amoroso.'
    ];

    return (
        <>
            <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "sticky", overflow: "hidden" }}>
                <header>
                    <section style={{ position: "fixed", top: 0, zIndex: 9000 }}>
                    <PrimarySearchAppBar accessHref={''} accessLabel={''} />
                    <SimpleBottomNavigation labels={[]} icons={[]}/>
                        
                    </section>
                </header>
                <main>
                    <section className="intro section" style={{ marginTop: "12.5vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "100vw", position: "relative", zIndex: "1" }}>
                            <Carousel
                                images={images}
                                paragraphs={paragraphs}
                                fontSize="calc(1rem + 1vw)"
                                fontColor="#fff"
                                titles={title}
                            />
                        </div>
                    </section>
                </main>
                <footer>
                    <Footer color={"#ffc200"} />
                </footer>
            </section>
        </>
    );
};

export default VolunteersView;
