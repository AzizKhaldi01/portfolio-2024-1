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

// import Model from "../../public/assets/Scene";

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
    gsap.fromTo(
      ".word",
      { y: 115, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.2,
        duration: 1,
        ease: "power1.out",
      }
    );


      gsap.fromTo(
        ".item",
        { y: 150 },
        {
          y: 0,
          delay: 0.7,
          duration: 0.6,
          stagger: 0.05,
          ease: "power1.out",
        }
      );

    // gsap.fromTo(
    //   ".item",
    //   { y: 100 },
    //   {
    //     y: 0,
    //     delay: 0.9,
    //     duration: 0.5,
    //     stagger: 0.03,
    //     ease: "power1.out",
    //   }
    // );
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
      
      
      <div className=" flex item lg:pl-0 pl-0  lg:-mt-[13rem] -mt-[16rem] flex-col lg:flex-row justify-center items-center ">
        <div className="  lg:mt-10  -mb-5     w-full lg:w-[18vw]   lg:h-[40vh] h-[25vh] ">
          <>
            <Canvas
              camera={{ position: [10, 20, 140] }}
              style={{ backgroundColor: "transparent" }}
            >
              <ambientLight intensity={1} color="#FF69B4" />
              {/* Soft pink ambient light */}
              <directionalLight
                color="#ffff" // Red color
                intensity={1}
                position={[10, -10, 10]}
              />
              {/* Top left light */}
              <directionalLight
                color="#c3cbfc" // Green color
                intensity={1}
                position={[-10, 10, 10]}
              />
              {/* Left bottom light */}
              <directionalLight
                color="#c3cbfc" // Blue color
                intensity={1}
                position={[-10, -10, 10]}
              />
              <pointLight
                color="#ffffff" // White color
                intensity={100}
                position={[-10, 10, 10]}
              />
              {/* Strong Point Light in the right */}
              <pointLight
                color="#ff00ff" // Magenta color
                intensity={2}
                position={[10, 0, 10]}
              />
              {/* <Environment preset="sunset" /> */}
              <Model />
            </Canvas>
          </>
        </div>

        {/* text */}
        <div className=" flex flex-col  item lg:px-0  px-[1rem] text-black z-50 justify-center ">
          {animations.slice(" ").map((animation, index) => (
            <div className=" overflow-hidden  lg:leading-[3rem] leading-[2.1rem] ">
              <h1
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className={`${
                  !animation.fontR
                    ? "font-righteous text-[2.1rem] pb-1   font-black  text-center  lg:text-left  lg:text-[3rem]  "
                    : "  lg:text-[1.7rem] text-[1.5rem] text-center  lg:-mb-1  mb-1  lg:text-left"
                }  word`}
              >
                {animation.text}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* background */}
      <motion.div
        id="bgChanged"
        className="  bgChanged absolute flex translate-x-[50%] right-[50%] w-[150%]  lg:w-[120%] h-[100vh] items-center justify-center  bg-main  -z-10 "
        initial={{
          opacity: 0,
          borderStartEndRadius: "50%",
          borderStartStartRadius: "50%",
          bottom: "-80%",
        }}
        animate={{
          opacity: 1,
          borderStartEndRadius: "0",
          borderStartStartRadius: "0",
          top: "0%",
        }}
        transition={{
          borderStartEndRadius: {
            duration: 0.6,
            delay: 0.5,
            ease: "easeInOut",
          },
          borderStartStartRadius: {
            duration: 0.6,
            delay: 0.5,
            ease: "easeInOut",
          },
          top: { duration: 0.3, delay: 0.5, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 0.5, ease: "easeInOut" },
        }}
        onAnimationComplete={() => setBgAnimationComplete(true)}
      >
        {/* { bgAnimationComplete  && <Model/>} */}
      </motion.div>
      {/* {bgAnimationComplete &&  <div className=" flex w-full  h-full absolute top-0 right-0">
        <ModalShapes />
      </div>} */}

      {/*  */}

      <div className=" item absolute hidden  -mt-10  lg:block -rotate-90 top-[40%] -right-[7%] transform -translate-y-1/2 writing-mode-vertical-rl text-orientation-mixed   tracking-wider pr-5">
        KHALID AHMED ABDELAZIZ
      </div>

      <h1 className=" item letter-spacing-[1em] font-Megrim  lg:text-2xl text-xl  cursor-default right-[50%] transform translate-x-[50%]  absolute z-[100] bottom-[16%]   ">
        SCROLL DOWN
      </h1>
    </div>
  );
}

export default Hero1;
