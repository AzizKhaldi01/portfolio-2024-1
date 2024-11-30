"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import Logo from "./Logo";
import Socials from "./Socials.jsx";
// import Modal from "../componet/Scene";
import { Model } from "../componet/Scene";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import assest3d from "../assest/glassyObj.mp4";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BackgroundVideo from "@/componet/BackgroundVideo";

// Register ScrollTrigger plugin

const animations = [
  { text: "Hi!  i’m Aziz", duration: 0.5, fontR: true },
  { text: "Front-end Developer", duration: 0.5 },
  { text: "UI & UX Designer. ", duration: 0.5 },
  // Add more animations as needed
];

function Hero1() {
  const [bgAnimationComplete, setBgAnimationComplete] = useState(false);
  const textRefs = useRef([]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".word",
      { y: 115, rotate:3 },
      {
        y: 0,
        opacity: 1,
        rotate:0,
        stagger: 0.01,
        delay: 0.1,
        duration: 1,
      }
    );

    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.7,
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
      <div className="    flex-col flex  lg:h-[80vh] h-[85vh] px-4  lg:px-10  pt-[5rem]   lg:mt-12 py-5 lg:py-10 items-center left-0 top-0  absolute   justify-end  lg:justify-between ">
        <div className="  item  lg:block hidden  h-[40vh] w-[1px] bg-gray-700  relative">
          <div className=" absolute  bottom-0 right-[50%] transform translate-x-[50%] h-[.3rem] bg-black rounded-[50%] w-[.3rem] "></div>
          <div className=" absolute top-0 right-[50%] transform translate-x-[50%] h-[.3rem] bg-black rounded-[50%] w-[.3rem] "></div>
        </div>
        <Socials />
      </div>
      {/* ------------------- */}

      <div className=" flex item lg:pl-0 pl-0  lg:-mt-[13rem] -mt-[16rem]  flex-col lg:flex-row justify-center items-center ">
        {/* text */}
        <div className=" flex flex-col  item lg:px-0  px-[1rem] text-black z-50 justify-center ">
          {animations.slice(" ").map((animation, index) => (
            <div className=" overflow-hidden  lg:leading-[6rem] leading-[2.1rem] ">
              <h1
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className={`${
                  !animation.fontR
                    ? "font-righteous text-[2.2rem] pb-1     text-center    lg:text-[6rem]  "
                    : "  lg:text-[1.7rem] text-[1.5rem] text-center  lg:-mb-1  mb-1  "
                }  word`}
              >
                {animation.text}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className=" item absolute hidden  -mt-10  lg:block -rotate-90 top-[40%] -right-[7%] transform -translate-y-1/2 writing-mode-vertical-rl text-orientation-mixed   tracking-wider pr-5">
        KHALID AHMED ABDELAZIZ
      </div>

      <h1 className=" item letter-spacing-[1em] font-Megrim  lg:text-2xl text-xl  cursor-default right-[50%] transform translate-x-[50%]  absolute z-[100] bottom-[16%]   ">
        SCROLL DOWN
      </h1>

      <span className=" absolute   lg:-top-[7rem] top-[15rem]  lg:-right-3 -z-10">
        <BackgroundVideo trigger={".hero"} />
      </span>
    </div>
  );
}

export default Hero1;
