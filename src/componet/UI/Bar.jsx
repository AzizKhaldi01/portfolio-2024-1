import React, { useEffect, useRef } from "react";
// import "./bar.css";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BigStar } from "@/assest/Icons/bigStar";

function Bar({ derection, initial, deg }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement || !marqueeElement.children.length) return;
  
    const baseSpeed = 20;
    let currentDirection = -1;

    // Determine initial sliding direction based on the derection prop
    const initialXPercent = derection === 'right' ? -20 : 20;
    const targetXPercent = derection === 'right' ? 20 : -20;

    const tween = gsap.to(marqueeElement.children, {
      xPercent: targetXPercent,
      ease: "none",
      repeat: -1,
      duration: baseSpeed,
      paused: true,
    });
  
    const scrollTrigger = ScrollTrigger.create({
      trigger: ".home",
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const newDirection = self.direction;
        
        if (newDirection !== currentDirection) {
          currentDirection = newDirection;
          
          // Adjust animation direction based on scroll direction and initial direction
          const scrollBasedXPercent = currentDirection === 1 
            ? (derection === 'right' ? -20 : 20)
            : (derection === 'right' ? 20 : -20);
          
          tween.kill();
          gsap.to(marqueeElement.children, {
            xPercent: scrollBasedXPercent,
            ease: "none",
            repeat: -1,
            duration: baseSpeed,
          });
        }
      },
    });
  
    return () => {
      scrollTrigger.kill();
    };
  }, [derection]); // Add derection as a dependency
  

  const marqueeItems = [
    "Handcrafted Digital Solutions",
    "Driven by Passion, Built with Code",
    "Custom Web Experiences",
    "Innovative Self-Made Creations",
    "Tailored Web Development for You",
  ];

  return (
    <div
      className={`${deg}   overflow-hidden  font-cabinetGrotesk whitespace-nowrap  text-main  font-bold text-sm lg:text-3xl    z-20 absolute top-[50%] transform translate-x-[50%]  marquee right-[50%] font-righteous  lg:py-5 py-3 bg-sec`}
    >
      <div ref={marqueeRef} className="  relative  flex gap-6  items-start ">
        <div className="flex  gap-6 flex-row      mr-14 absolute w-full  whitespace-nowrap right-[100%] top-0">
          {marqueeItems.map((item, index) => (
            <Item key={`left-${index}`} index={index} item={item} />
          ))}
        </div>

        <div className="flex  w-full      gap-4 flex-row  whitespace-nowrap    ">
          {marqueeItems.map((item, index) => (
            <Item key={`center-${index}`} index={index} item={item} />
          ))}
        </div>

        <div className="flex  gap-6 flex-row    ml-5 absolute w-full  whitespace-nowrap left-[100%] top-0">
          {marqueeItems.map((item, index) => (
            <Item key={`right-${index}`} index={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bar;

function Item({ item, index }) {
  return (
    <div
      className="flex items-center  lg:gap-4 gap-2 flex-nowrap flex-shrink-0 w-fit justify-center  "
    >
      {item}
      <div className="arrow  lg:scale-100  scale-[0.6] ">
      <BigStar trigger={".SlidingBars"} />
      </div>
    </div>
  );
}
