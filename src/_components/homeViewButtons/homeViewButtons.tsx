
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const animateImage = (imageRef: MutableRefObject<HTMLImageElement | null>) => {
    const tl = gsap.timeline({
        defaults: { duration: 1.9, ease: "bounce.out" },
        scrollTrigger: {
            trigger: imageRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
        }
    });

    tl.fromTo(imageRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1 }
    );
};
