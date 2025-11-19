"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Socials from "./Socials.jsx";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BackgroundVideo from "@/componet/BackgroundVideo";

// Register ScrollTrigger plugin

const animations = [
  { text: "Hi!  i’m Aziz", duration: 0.5, fontR: true },
  { text: "Full-stack Developer", duration: 0.5 },
  { text: "UI & UX Designer. ", duration: 0.5 },
  // Add more animations as needed
];

function Hero1() {
  const textRefs = useRef([]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".word",
      {
        y: 250,
        rotate: 3,

      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.15,
        delay: 0.3,
        duration: 1,
        // ease: "power3.out"
      }
    );

    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.9,
        duration: 0.6,
        stagger: 0.02,
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      ".obj3d",
      {
        y: 0,
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 3,
        },
        y: -120,
        ease: "none",
      }
    );
  }, []);

  return (
    <div className="  hero  relative  h-screen  flex items-center justify-center   overflow-hidden z-20">
      {/* Animated background */}

      {/* left side */}
      <div className="  z-50 flex-col flex  lg:h-[80vh] h-[85vh] px-4  lg:px-10  pt-[5rem]   lg:mt-12 py-5 lg:py-10 items-center left-0 top-0  absolute   justify-end  lg:justify-between ">
        <div className="  item  lg:block hidden  h-[40vh] w-[1px] bg-gray-700  relative">
          <div className=" absolute  bottom-0 right-[50%] transform translate-x-[50%] h-[.3rem] bg-black rounded-[50%] w-[.3rem] "></div>
          <div className=" absolute top-0 right-[50%] transform translate-x-[50%] h-[.3rem] bg-black rounded-[50%] w-[.3rem] "></div>
        </div>
        <Socials />
      </div>
      {/* ------------------- */}

      <div className=" flex  lg:pl-0 pl-0  lg:-mt-[13rem] -mt-[40rem]  flex-col lg:flex-row justify-center items-center ">
        {/* text */}
        <div className=" flex flex-col  item lg:px-0  px-[1rem] text-black z-50 justify-center ">
          {animations.slice(" ").map((animation, index) => (
            <div style={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" }} className=" words overflow-hidden  lg:leading-[5.5rem] md:leading-[3.2rem] leading-[2.1rem] ">

              <h1
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className={`${!animation.fontR
                    ? "font-cabinetGrotesk text-[1.8rem] xs:text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[6rem] pb-1 text-center"
                    : " font-cabinetGrotesk text-[1.2rem] xs:text-[1.5rem] sm:text-[1.6rem] md:text-[1.65rem] lg:text-[1.7rem] text-center mb-1 lg:-mb-1"
                  } word`}
              >
                {animation.text}
              </h1>
            </div>
          ))}
          {/* <p className="text-center text-black/70 text-lg mt-6 max-w-2xl mx-auto">
            Crafting digital experiences that blend creativity with cutting-edge technology
          </p> */}
        </div>
      </div>

      <div className=" item absolute hidden font-cabinetGrotesk   -mt-10  lg:block -rotate-90 top-[40%] -right-[6.5%] transform -translate-y-1/2 writing-mode-vertical-rl text-orientation-mixed   tracking-wider pr-5">
        KHALID AHMED ABDELAZIZ
      </div>

      <h1 className=" item letter-spacing-[1em] font-cabinetGrotesk  lg:text-2xl text-xl  cursor-default right-[50%] transform translate-x-[50%]  absolute z-[100] bottom-[16%]   ">
        scroll down
      </h1>

      <span className=" absolute 2xl:-top-[5.5rem] xl:-top-[3rem] lg:-top-[0rem] top-[16rem]  lg:-right-3 -z-10">
        <BackgroundVideo trigger={".hero"} />
      </span>
    </div>
  );
}

export default Hero1;
