import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './cometTail.module.css'


const FluidCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(follower, { scale: 2, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default FluidCursor;