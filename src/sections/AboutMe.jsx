import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoWithText from "../componet/UI/LogoWithText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MyPic from "../componet/Home/AboutMe/MyPic";
import Curve from "../componet/Home/Works/Curve";
import ButtonEffect from "../componet/UI/ButtonEffect";
import Magnetic from "../componet/gsap/Magnetic";
import me from "../assest/Images/about/ana.jpeg";
import Link from "next/link";
import CustomCursor from "@/componet/UI/CustomCursor";
import InfinitTextSlid from "../componet/UI/InfinitTextSlid.jsx";
import { differenceInMonths, differenceInYears } from "date-fns";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const textRef = useRef(null);
  const imgDivRef = useRef(null);

  const birthDate = new Date(2001, 7, 26); 
  const age = differenceInYears(new Date(), birthDate);

  // Experience calculation
  const startDate = new Date(2021, 9, 1); 
  const experienceYears = differenceInYears(new Date(), startDate);
  const experienceMonths = differenceInMonths(new Date(), startDate) % 12;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const words = textRef.current.querySelectorAll("span");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom", // Adjust when the animation starts
          end: "bottom 15%", // Adjust when the animation ends
          scrub: true,
        },
      })
      .fromTo(
        words,
        { opacity: 0, duration: 1 }, // Start with words invisible and slightly below
        { opacity: 1, stagger: 0.1 } // Animate to visible and in place
      );
  }, []);

  useEffect(() => {
    gsap.to(".about_top_curve", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top 90%",
        end: "bottom+=500 top",
        scrub: 1.5,
      },
      scaleY: 5,
      ease: "power3.inOut",
      duration: 2,
    });

    gsap.to(".about_bottom_curve", {
      scrollTrigger: {
        trigger: ".About-me",
        start: "25% top",
        end: "bottom+=1000 top",
        scrub: true,
      },
      scaleY: 0,
      ease: "power3.inOut",
      duration: 2,
    });

    gsap.to(".exp_item", {
      scrollTrigger: {
        trigger: ".exp_item",
        start: "top 90%",
        scrub: 1.5,
      },
      y: -50,
      opacity: 1,

      stagger: 0.05,
      ease: "power3.inOut",
      duration: 2.3,
    });
  }, []);

  const text = `  Hey, I’m Aziz Khaldi, a ${age} year old Front-End Developer and UI/UX Designer with ${experienceYears} year${experienceYears !== 1 ? 's' : ''}  of experience. I have a passion for creating interactive, high-performance web applications. I love working with React and Next.js, and I’m all about building clean, user-friendly interfaces. I focus on making sure everything looks great and works smoothly, solving complex front-end challenges along the way.`;
  const words = text.split(" ").map((word, index) => (
    <span key={index} className="inline-block">
      {word}&nbsp;
    </span>
  ));

  const imgRef = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top center", // When the image starts entering the viewport
        end: "70% top", // When the image is out of view
        scrub: true, // Smoothly transitions with the scroll
      },
    });

    // Animation for image to move up and zoom
    tl.to(imgRef.current, {
      scale: 1, // Zoom effect
      ease: "power1.out",
    });
    tl.to(
      textRef2.current,
      {
        y: 400,
        opacity: 0,
        ease: "power1.out",
      },
      0
    );

    tl.to(
      ".blurEffect",
      {
        y: 200,
        opacity: 0,
        ease: "power1.out",
      },
      0
    );
  }, []);

  return (
    <div
      id="bgChanged"
      className=" relative  About-me flex flex-col items-center  w-full duration-200 h-full   font-righteous text-white z-50   gap-[4rem]  -mt-[2rem]    bgChanged about-me   bg-sec "
    >
      <div className="   overflow-hidden  absolute left-[50%]  lg:-top-[3rem] -top-[2rem] transform  translate-x-[-50%] w-[100%] about_top_curve   lg:h-[4rem] h-[2rem]  mb-14 z-40 ">
        <div className="   absolute right-[-10%] rounded-[50%]   h-[150%] w-[120%] bg-sec "></div>
      </div>

      <div className=" mt-10 md:text-[2.5rem] text-[1.3rem]  w-[92vw] lg:w-[80vw] text-center  z-[60]   md:leading-[3rem] leading-[2rem]  relative">
        <h1 ref={textRef} className="   z-20 font-bold ">
          {words}
        </h1>
        <h1 className="  opacity-10 text-white absolute top-0  left-0 font-bold ">
          {words}
        </h1>
      </div>

      <InfinitTextSlid trigger={".home"} />

      <div className="z-50 pt-5  lg:pt-10 items-center flex flex-col gap-6 ">
        <h1
          ref={textRef2}
          className=" text-center  lg:text-[3rem] text-[1.7rem] font-bold"
        >
          KHALDI AHMED <br /> ABDELAZIZ
        </h1>
        <div
          ref={imgDivRef}
          className="  md:h-[35rem]  md:w-[25rem] w-[18rem] sm:w-[20rem] h-[26rem] object-cover  relative rounded-[40%] overflow-hidden"
        >
          <img
            ref={imgRef}
            className="  absolute top-0 right-0   lg:scale-[1.35] scale-[1.2]  object-cover w-full h-full   "
            src={me.src}
            alt=""
          />
        </div>
      </div>

      <div
        className=" lg:h-[100vh] h-[60vh]  lg:w-[60vh] w-[90vw] blurEffect absolute rounded-full top-[30%] pointer-events-none z-10 opacity-40 blur-[5vw]"
        style={{
          background: `radial-gradient(circle, #A1DD70 0%, rgba(34, 34, 34, 0) 66%)`, // Replace with real color values
          filter: "blur(5vw)", // Apply the blur directly here
        }}
      ></div>

      <div className=" flex flex-col items-center  pt-20  justify-center  gap-7 w-full ">
        <div className="  flex   lg:flex-row  flex-col items-center gap-5 ">
          <div className="  flex gap-5  flex-row items-center  ">
            <CercelOfInfo title={"Experience"} num={"3y"} />
            <LogoWithText
              style={
                "  lg:w-[7.7rem] opacity-0  -mb-3 lg:h-[7.7rem]  h-[5.6rem] w-[5.6rem]"
              }
            />
          </div>
          <div className="flex gap-5  flex-row items-center">
            <div className=" lg:hidden block">
              <LogoWithText
                style={
                  "lg:w-[7.7rem] opacity-0  -mb-3 lg:h-[7.7rem]  h-[5.6rem] w-[5.6rem]"
                }
              />
            </div>
            <CercelOfInfo title={"Projects"} num={"+10"} />
          </div>
        </div>
        <div className=" flex items-center gap-5 ">
          <div className=" hidden lg:block">
            <LogoWithText
              style={
                "lg:w-[7.7rem] opacity-0  -mb-3 lg:h-[7.7rem]  h-[5.6rem] w-[5.6rem] "
              }
            />
          </div>
          <CercelOfInfo title={"Companies"} num={"3"} />
          <LogoWithText
            style={
              " lg:w-[7.7rem] opacity-0  -mb-3 lg:h-[7.7rem]  h-[5.6rem] w-[5.6rem] "
            }
          />
        </div>
      </div>
      <div className="  exp_item opacity-0 z-50 w-full flex justify-center items-center my-16 ">
        <Magnetic>
          <div>
            <Link href={"/about-me"}>
              <ButtonEffect
                Style={
                  "  lg:px-[5rem] px-[2.8rem]   lg:py-8 py-4    border-2 border-white text-white hover:border-0  lg:text-2xl text-lg text-black   "
                }
              >
                About Me
              </ButtonEffect>
            </Link>
          </div>
        </Magnetic>
      </div>

      <div className=" overflow-hidden   about_bottom_curve rotate-180 absolute  left-[50%]  lg:-bottom-[8rem] -bottom-[6rem]   transform  translate-x-[-50%] w-[100%]    lg:h-[10rem] h-[6rem]  mb-14 z-40 ">
        <div className="   absolute right-[-10%] rounded-[50%]   h-[150%] w-[120%] bg-sec "></div>
      </div>
    </div>
  );
}

export default AboutMe;

function CercelOfInfo({ title, num, width }) {
  return (
    <div className=" opacity-0 exp_item flex gap-2">
      <div
        className={`flex justify-center items-center  ${
          width || " lg:w-[24vw] w-[55vw]  "
        }   lg:h-[7.8rem] h-[5rem] border-2 border-gray-500 rounded-full`}
      >
        <div className="text-white  lg:pt-2 flex  lg:flex-col  lg:gap-1 gap-2 items-center justify-center text-center">
          <h1 className="  lg:text-4xl text-xl "> {title}</h1>
          <p className="  lg:text-2xl  text-lg ">{num} </p>
        </div>
      </div>
    </div>
  );
}
