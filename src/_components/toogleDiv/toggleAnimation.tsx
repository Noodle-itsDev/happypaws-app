import gsap from "gsap";

export const toggleDivVisibility = (divRef: React.RefObject<HTMLDivElement>) => {
    if (divRef.current) {
        const isHidden = divRef.current.classList.contains('hidden');
        gsap.to(divRef.current, {
            x: isHidden ? '0%' : '75%',
            duration: 0.3,
            onComplete: () => {
                divRef.current?.classList.toggle('hidden');
                divRef.current?.classList.toggle('show');
            }
        });
    }
};
