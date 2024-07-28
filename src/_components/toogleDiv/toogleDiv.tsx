import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import Styles from './toogleDiv.css';

interface ToggleDivProps {
  contentOne: ReactNode;
  contentTwo: ReactNode;
  zIndexOne: number;
  zIndexTwo: number;
}

const ToggleDiv: React.FC<ToggleDivProps> = ({ contentOne, contentTwo, zIndexOne, zIndexTwo }) => {
  const [isExpandedOne, setIsExpandedOne] = useState(false);
  const [isExpandedTwo, setIsExpandedTwo] = useState(false);

  const divRefOne = useRef<HTMLDivElement | null>(null);
  const divRefTwo = useRef<HTMLDivElement | null>(null);

  const toggleDivOne = () => {
    setIsExpandedOne(!isExpandedOne);
    if (isExpandedTwo) {
      setIsExpandedTwo(false);
    }
  };

  const toggleDivTwo = () => {
    setIsExpandedTwo(!isExpandedTwo);
    if (isExpandedOne) {
      setIsExpandedOne(false);
    }
  };

  useEffect(() => {
    if (isExpandedOne) {
      gsap.to(divRefOne.current, { duration: 0.5, width: '60vw', height: 'auto' });
    } else {
      gsap.to(divRefOne.current, { duration: 0.5, width: '14vw', height: 'auto' });
    }
  }, [isExpandedOne]);

  useEffect(() => {
    if (isExpandedTwo) {
      gsap.to(divRefTwo.current, { duration: 0.5, width: '60vw', height: 'auto' });
    } else {
      gsap.to(divRefTwo.current, { duration: 0.5, width: '6vw', height: 'auto' });
    }
  }, [isExpandedTwo]);

  return (
    <div className="container relative mx-auto h-[755px] l-0">
      <div className="relative">
        <div ref={divRefOne} className={`${Styles.toggleDiv}`} style={{ zIndex: zIndexOne, backgroundColor: "#e5e7eb", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <div style={{ padding: "1rem", height: "755px"}}>
            {contentOne}
          </div>
          <button className="toggleButton" onClick={toggleDivOne} style={{ zIndex: zIndexOne, backgroundColor: "#50c878", color: "white", padding: "0px 1rem", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "100%" }}>
            Toggle Div One
          </button>
        </div>
        <div ref={divRefTwo} className="toggleDiv" style={{ zIndex: zIndexTwo, backgroundColor: "#d1d5db", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)"}}>
          <div style={{ padding: "1rem", height: "755px"}}>
            {contentTwo}
          </div>
          <button className="toggleButton" onClick={toggleDivTwo} style={{ zIndex: zIndexTwo, backgroundColor: "#50c878", color: "white", padding: "0px 1rem", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", height: "100%" }}
          >
            Toggle Div Two
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleDiv;
