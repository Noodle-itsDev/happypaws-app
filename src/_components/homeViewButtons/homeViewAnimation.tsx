import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const setupScrollAnimations = (
  sectionOne: HTMLElement | null,
  sectionTwo: HTMLElement | null
) => {
  if (sectionOne && sectionTwo) {
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionTwo,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: sectionOne,
        anticipatePin: 1,
      }
    })
    .fromTo(sectionTwo, { y: '100%' }, { y: '0%', ease: 'none' });
  }
};
