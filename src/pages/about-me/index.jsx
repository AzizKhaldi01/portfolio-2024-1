"use client";

import React, { useEffect, useRef } from "react";
import LogoWithText from "../../componet/UI/LogoWithText";
import Navbar from "../../componet/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import ana from "../../assest/Images/about/ana.jpg";
import ana from "../../assest/Images/about/aziz-about-me-02.jpg";
import SlidingBars from "../../componet/Home/SlidingBars";
import GrayLine from "../../componet/UI/GrayLine";
import Footer from "../../componet/Footer/Footer";
import Curve from "../../componet/UI/NavCurve";
import SplitType from "split-type";

import CustomEase from "gsap/dist/CustomEase";
import Image from "next/image";
import InfinitTextSlid from "../../componet/UI/InfinitTextSlid.jsx";
import ScrollReveal from "../../componet/gsap/ScrollReveal";

function index() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const Data = [
    {
      skill: "Design",
      p: "I create visually engaging, user-friendly designs that reflect your brand, focusing on intuitive interfaces that leave a lasting impression.",
    },
    {
      skill: "Development",
      p: "I specialize in Full-stack development, transforming designs into responsive, high-performance websites using React, Next.js, and Tailwind CSS.",
    },
    {
      skill: "Creativity",
      p: "Need something unique? I bring creativity to every project with custom animations, interactive features, and design ideas that make your website stand out.",
    },
  ];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Title animation is now handled by ScrollReveal component

  useEffect(() => {
    // Split the text into lines using SplitType
    const splitInstance = new SplitType(textRef.current, { types: "lines" });
    const splitInstance2 = new SplitType(textRef2.current, { types: "lines" });
    const lines = splitInstance.lines; // Get the lines for animation
    const lines2 = splitInstance2.lines; // Get the lines for animation

    // Animate each line using GSAP
    gsap.from(lines, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.07, // Stagger the animation for each line
      ease: "power1.out",
    });

    gsap.from(lines2, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.07, // Stagger the animation for each line
      ease: "power1.out",
    });
    // Cleanup the split instance on unmount
    return () => {
      splitInstance.revert();
    };
  }, []);

  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: "25%",
      scale: 1.1,
      ease: "none",
    });
  }, []);

  useEffect(() => {
    gsap.to(".line", {
      transform: "translateY(0px)",
      y: 20,
      opacity: 1,
      delay: 1,
      stagger: 0.08,
      duration: 0.5,
      ease: CustomEase.create("customEase", "M0,0 C0.5,0 0,1 1,1"),
    });
  }, []);

  useEffect(() => {
    gsap.to(".section_02_line", {
      transform: "translateY(0px)",
      y: 50,
      opacity: 1,
      delay: 1,
      stagger: 0.08,
      duration: 0.5,
      ease: CustomEase.create("customEase", "M0,0 C0.5,0 0,1 1,1"),
    });
  }, []);

  const lines = [
    "I transform your ideas into stunning, high-performance websites that",
    "captivate your audience. Let's create a digital experience that inspires and",
    "leaves a lasting impression.",
  ];

  const lines2 = [
    "As a Full-stack developer and designer, I specialize in turning your",
    "ideas into fully functional, visually stunning websites. From sleek,",
    "responsive designs to interactive features, I bring your vision to",
    "life. I work closely with you to ensure the final product not only",
    "looks great but performs seamlessly. Let’s create a website that",
    "truly represents your brand and goals!",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.7,
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.out",
      }
    );

    gsap.to(".About_item", {
      scrollTrigger: {
        trigger: ".About_item",
        start: "top bottom",
        scrub: true,
      },
      y: -50,
      opacity: 1,
      stagger: 0.02,
      ease: "power3.inOut",
      duration: 0.5,
    });
  }, []);

  return (
    <Curve>
      <div className=" aboutMe pb-44 overflow-hidden">
        <Navbar />



        <div className="  item pt-20  px-[0.8rem] md:px-[2rem] flex  md:flex-row  gap-7 flex-col justify-between relative ">
          {/* Title Section */}
          <div className="pt-12 pb-7 ">
            <ScrollReveal
              baseOpacity={0.1}
              delay={0.5}
              enableBlur={true}
              baseRotation={5}
              duration={1}
              blurStrength={8}
              containerClassName="overflow-hidden"
              textClassName="works-title text-5xl md:text-6xl lg:text-8xl font-cabinetGrotesk leading-tight  text-black "
            >
              About Me
            </ScrollReveal>
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed  font-cabinetGrotesk max-w-5xl">
              <p className="mb-1">
                Get to know the person behind the code and the passion that drives innovation
              </p>
              <p>I transform your ideas into stunning, high-performance websites that
              captivate your audience. Let's create a digital experience that inspires and
              leaves a lasting impression.
              </p>
            </div>
          </div>
          <div className=" flex md:w-fit w-full items-end justify-end mb-10 mr-10">
            <LogoWithText
              style={" md:scale-[1.4] scale-100 "}
              isBlack={true}
            />
          </div>
        </div>

        {/* text slider */}
        <InfinitTextSlid
        delay={1}
          color={"#000"}
          style={" md:text-[7rem] text-[3rem] font-light !font-light"}
          trigger={".aboutMe"}
        />

        <div className=" h-[100vh] item flex  md:flex-row flex-col w-full  font-cabinetGrotesk  gap-10 pt-10 md:text-lg text-base  md:px-[2rem] px-[1rem]  ">
          <div ref={textRef} className=" w-full  md:w-[50%] text-lg md:text-xl text-gray-600 leading-relaxed  font-cabinetGrotesk ">
            As a Full-stack developer and designer, I specialize in turning your
            ideas into fully functional, visually stunning websites. From sleek,
            responsive designs to interactive features, I bring your vision to
            life. I work closely with you to ensure the final product not only
            looks great but performs seamlessly. Let’s create a website that
            truly represents your brand and goals!
         
          </div>
          <div className=" relative  overflow-hidden h-[60vh] md:h-[100vh] object-cover  w-full md:w-[50%] rounded-md ">
            <Image
              src={ana.src}
              alt=""
              ref={imageRef}
              quality={100}
              layout="fill"
              objectFit="cover"
              className=" scale-125 absolute top-0 right-0 w-full h-full"
              placeholder="blur"
              blurDataURL="/path-to-small-blurry-image.jpg"
            />
          </div>
        </div>

        <div className=" pt-[3rem] md:pt-[10rem] text-gray-800 md:px-[2rem] px-[1rem] grid md:grid-cols-3 grid-cols-1 flex-col gap-[8rem]  ">
          {Data.map((item, index) => (
            <div className=" opacity-0 font-cabinetGrotesk About_item flex flex-col gap-5">
              <div className="flex gap-1 flex-col">
                0{index + 1}
                <GrayLine />
              </div>
              <h1 className="md:text-[2rem] text-[1.7rem] font-cabinetGrotesk font-semibold ">
                {item.skill}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed  font-cabinetGrotesk ">{item.p}</p>
            </div>
          ))}
        </div>

        <SlidingBars />
      </div>
      <Footer />
    </Curve>
  );
}

export default index;
