// src/animations.ts
import { gsap } from "gsap";

export const animateLogoOnIntersect = (logo: HTMLImageElement | null) => {
  if (logo) {
    gsap.fromTo(
      logo,
      { opacity: 0, y: 50, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
      {
        opacity: 1,
        y: 0,
        filter: "drop-shadow(0 18px 18px rgba(0, 0, 0, 0.5))",
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(logo, {
            y: 40,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "power1.inOut",
            filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5))",
          });
        },
      }
    );
  }
};

export const animateLogoVisibility = (logo: HTMLImageElement | null) => {
  if (logo) {
    gsap.fromTo(
      logo,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: logo,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }
};
