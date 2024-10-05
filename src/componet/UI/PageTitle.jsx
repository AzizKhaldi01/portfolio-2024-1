import gsap from "gsap";
import React, { useEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PageTitle({ title, section }) {
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
      className={`title item ${section} w-full flex items-center font-light justify-center pt-5`}>
      <span className="flex leading-0 flex-nowrap gap-5 overflow-hidden">
        {title.split("").map((word, index) => (
          <h1
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className=" text-[1.8rem] lg:text-[4rem] font-Megrim">
            {word}
          </h1>
        ))}
      </span>
    </div>
  );
}

export default PageTitle;
