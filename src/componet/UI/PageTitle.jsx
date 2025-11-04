import gsap from "gsap";
import React, { useEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PageTitle({ title, section, subtitle }) {
  const textRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      textRefs.current,
      { yPercent: 120 },
      {
        yPercent: 0,
        duration: .5,
        stagger: 0.01, 
        scrollTrigger: {
          trigger: textRefs.current[0].parentNode,
          start: "top 80%", // Adjust start point to trigger when the section is in view
          toggleActions: "play none none none", // Play the animation when the section comes into view
        },
      }
    );
  }, []);

  return (
    <div
      className={`title item ${section} w-full flex flex-col items-start font-light justify-center pt-5`}>
      <span className="flex leading-0 flex-nowrap gap-2 md:gap-4 overflow-hidden">
        {title.split("").map((word, index) => (
          <h1
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-righteous font-bold">
            {word}
          </h1>
        ))}
      </span>
      {subtitle && (
        <p className="text-left text-black/70 text-lg mt-4 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageTitle;
