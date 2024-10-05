import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import whiteLogo from "../../assest/Images/logo&textWhite.png";
import whiteLogoBlack from "../../assest/Images/logo&textBlack.png";

gsap.registerPlugin(ScrollTrigger);

function LogoWithText({ style , isBlack , scale }) {
  const logoRef = useRef(null);

  useEffect(() => {
    const element = logoRef.current;

    gsap.to(element, {
      rotation:150,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // when the top of the element hits the bottom of the viewport
        end: "bottom top", // when the bottom of the element hits the top of the viewport
        scrub: true, // smooth scrubbing, takes 1 second to catch up to the scrollbar
        onUpdate: (self) => {
          gsap.to(element, {
            rotation: self.progress *150, // rotate based on the scroll progress
            overwrite: 'auto'
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getById(element)?.kill(); // Cleanup
    };
  }, []);

  return (
    <img
      ref={logoRef}
      className={`${style} exp_item   z-50 w-[7rem] h-[7rem] `}
      src={ isBlack ? whiteLogoBlack.src : whiteLogo.src}
      alt="Logo with text"
    />
  );
}

export default LogoWithText;
