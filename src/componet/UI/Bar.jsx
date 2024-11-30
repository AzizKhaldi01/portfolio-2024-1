import React, { useEffect, useRef } from "react";
// import "./bar.css";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Bar({ derection, initial, deg }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const marqueeElement = marqueeRef.current;

      const tween = gsap.to(marqueeElement.children, {
        xPercent: -100, // Move the marquee elements left
        ease: "linear",
        repeat: -1, // Infinite scroll
        duration: 20, // Adjust the speed of scrolling
        paused: true,
      });

      ScrollTrigger.create({
        trigger: ".home",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const isScrollingDown = self.direction === 1; // 1 for down, -1 for up

          // Update sliding direction based on scroll
          if (isScrollingDown) {
            tween.vars.xPercent = derection; // Use direction passed from props
            tween.timeScale(1).play(); // Play forward
          } else {
            tween.vars.xPercent = -derection ; // Move in the opposite direction
            tween.timeScale(1).play(); // Play forward
          }

          tween.invalidate().restart();

          // Toggle arrow class based on scroll direction
        },
      });
    }
  }, []);

  const marqueeItems = [
    "Handcrafted Digital Solutions",
    "Driven by Passion, Built with Code",
    "Custom Web Experiences",
    "Innovative Self-Made Creations",
    "Tailored Web Development for You",
  ];

  return (
    <div
      className={`${deg}   overflow-hidden  whitespace-nowrap  text-main  uppercase  font-bold text-sm lg:text-3xl    z-20 absolute top-[50%] transform translate-x-[50%]  marquee right-[50%] font-righteous  lg:py-5 py-3 bg-sec`}
    >
      <div ref={marqueeRef} className="  relative  flex gap-6  items-start ">
        <div className="flex  gap-6 flex-row      mr-14 absolute w-full  whitespace-nowrap right-[100%] top-0">
          {marqueeItems.map((item, index) => (
            <Item index={index} item={item} />
          ))}
        </div>

        <div className="flex  w-full      gap-4 flex-row  whitespace-nowrap    ">
          {marqueeItems.map((item, index) => (
            <Item index={index} item={item} />
          ))}
        </div>

        <div className="flex  gap-6 flex-row    ml-5 absolute w-full  whitespace-nowrap left-[100%] top-0">
          {marqueeItems.map((item, index) => (
            <Item index={index} item={item} />
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
      key={index}
      className="flex items-center  lg:gap-4 gap-2 flex-nowrap flex-shrink-0 w-fit justify-center  "
    >
      {item}
      <div className="arrow  lg:scale-100  scale-[0.6] ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#e7e7e7"
          fill="none"
        >
          <path
            d="M5.92089 5.92089C8.15836 3.68342 9.2771 2.56468 10.5857 2.19562C11.5105 1.93479 12.4895 1.93479 13.4143 2.19562C14.7229 2.56468 15.8416 3.68342 18.0791 5.92089C20.3166 8.15836 21.4353 9.2771 21.8044 10.5857C22.0652 11.5105 22.0652 12.4895 21.8044 13.4143C21.4353 14.7229 20.3166 15.8416 18.0791 18.0791C15.8416 20.3166 14.7229 21.4353 13.4143 21.8044C12.4895 22.0652 11.5105 22.0652 10.5857 21.8044C9.2771 21.4353 8.15836 20.3166 5.92089 18.0791C3.68342 15.8416 2.56468 14.7229 2.19562 13.4143C1.93479 12.4895 1.93479 11.5105 2.19562 10.5857C2.56468 9.2771 3.68342 8.15836 5.92089 5.92089Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
