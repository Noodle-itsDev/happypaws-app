import { gsap } from 'gsap';

export const animateLogoOnIntersect = (logo: HTMLImageElement | null) => {
  if (!logo) return;

  gsap.fromTo(
    logo,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    }
  );
};

export const animateLogoVisibility = (logo: HTMLImageElement | null) => {
  if (!logo) return;

  gsap.to(logo, {
    opacity: 1,
    duration: 1,
    ease: 'power1.inOut',
  });
};
