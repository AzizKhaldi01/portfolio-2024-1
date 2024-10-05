"use client";

import React, { useEffect, useRef } from "react";
import LogoWithText from "../../componet/UI/LogoWithText";
import Navbar from "../../componet/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import ana from "../../assest/Images/about/ana.jpg";
import ana from "../../assest/Images/about/ana.jpg";
import SlidingBars from "../../componet/Home/SlidingBars";
import GrayLine from "../../componet/UI/GrayLine";
import Footer from "../../componet/Footer/Footer";
import Curve from "../../componet/UI/NavCurve";
import SplitType from "split-type";

import CustomEase from "gsap/dist/CustomEase";
import Image from "next/image";
import InfinitTextSlid from "../../componet/UI/InfinitTextSlid.jsx";

function index() {
  const imageRef = useRef(null);
  const Data = [
    {
      skill: "Design",
      p: "I create visually engaging, user-friendly designs that reflect your brand, focusing on intuitive interfaces that leave a lasting impression.",
    },
    {
      skill: "Development",
      p: "I specialize in front-end development, transforming designs into responsive, high-performance websites using React, Next.js, and Tailwind CSS.",
    },
    {
      skill: "Creativity",
      p: "Need something unique? I bring creativity to every project with custom animations, interactive features, and design ideas that make your website stand out.",
    },
  ];


  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
        markers: true,
      },
      scale: 1,
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    gsap.to(".line", {
      transform: "translateY(0px)",
      y: 50,
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
    "As a front-end developer and designer, I specialize in turning your",
    "ideas into fully functional, visually stunning websites. From sleek,",
    "responsive designs to interactive features, I bring your vision to",
    "life. I work closely with you to ensure the final product not only",
    "looks great but performs seamlessly. Let’s create a website that",
    "truly represents your brand and goals!",
  ];

  useEffect(() => {
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
  }, []);

  return (
    <Curve>
      <div className=" aboutMe">
        <Navbar />
        <div className="  item pt-20  px-[0.8rem] lg:px-[10%] flex  lg:flex-row  gap-7 flex-col justify-between relative ">
          <div className="  lg:w-[50%] w-full  lg:text-xl text-base ">
            {lines.map((line) => (
              <div className="  overflow-hidden">
                <p className="line">{line}</p>
              </div>
            ))}
          </div>
          <div className=" flex lg:w-fit w-full items-end justify-end">
            <LogoWithText
              style={" lg:scale-[1.4] scale-100   "}
              isBlack={true}
            />
          </div>
        </div>

        {/* text slider */}
        <InfinitTextSlid
          style={" lg:text-[7rem] text-[3rem] my-8 "}
          trigger={".aboutMe"}
        />

        <div className=" h-[100vh] item flex  lg:flex-row flex-col w-full   gap-10 pt-10 lg:text-lg text-base  lg:px-[10%] px-[1rem]  ">
          <div className=" w-full  lg:w-[50%] ">
            {lines2.map((line) => (
              <div className="  overflow-hidden">
                <p className="line">{line}</p>
              </div>
            ))}
          </div>
          <div className=" relative  overflow-hidden h-[60vh] lg:h-[100vh] object-cover  w-full lg:w-[50%] rounded-md ">
            <Image
              src={ana.src}
              alt=""
              ref={imageRef}
              layout="fill"
              objectFit="cover"
              className="scale-125 absolute top-0 right-0 w-full h-full"
              placeholder="blur"
              blurDataURL="/path-to-small-blurry-image.jpg"
            />
          </div>
        </div>

        <div className=" pt-[3rem] lg:pt-[10rem] text-gray-800 lg:px-[7%] px-[1rem] grid lg:grid-cols-3 grid-cols-1 flex-col gap-[8rem]  ">
          {Data.map((item, index) => (
            <div className=" flex flex-col gap-5">
              <div className="flex gap-1 flex-col">
                0{index + 1}
                <GrayLine />
              </div>
              <h1 className="lg:text-[2rem] text-[1.7rem] font-semibold ">
                {item.skill}
              </h1>
              <p className="text-[1rem] leading-7 ">{item.p}</p>
            </div>
          ))}
        </div>
        <SlidingBars />
        <Footer />
      </div>
    </Curve>
  );
}

export default index;
