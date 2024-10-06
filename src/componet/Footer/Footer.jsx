import React, { useEffect, useRef } from "react";
import LogoWithText from "../UI/LogoWithText";
import Curve from "../Home/Works/Curve";
import Link from "next/link";
import gsap from "gsap";
import SplitType from "split-type";
// import { ScrollTrigger } from "gsap/all";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LogoBlackBig from "../../assest/Images/LogoBlackBig.png";
import Magnetic from "../../componet/gsap/Magnetic";
import FlipLink from "../UI/FlipLink";
import ButtonEffect from "../UI/ButtonEffect";
import useLocalTime from "@/Hooks/useLocalTime";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const nameRef = useRef(null);
  const name2Ref = useRef(null);
  const textRefs = useRef([]);
  const localTime = useLocalTime();

  const Links = [
    {
      title: "LINKS",
      links: [
        {
          text: "Home",
          link: "/",
        },
        {
          text: "Work",
          link: "/works",
        },
        {
          text: "Experience",
          link: "/expereince",
        },
        {
          text: "Contact",
          link: "/contact",
        },
      ],
    },
    {
      title: "SOCIALS",
      links: [
        {
          text: "Email",
          link: "mailto:azizkhaldi0210@gmail.com",
          isSocaial: true,
        },
        {
          text: "Linkdin",
          link: "https://www.linkedin.com/in/aziz-khaldi-b28207261/",
          isSocaial: true,
        },
        {
          text: "Whatsapp",
          link: "https://wa.me/213779577865",
          isSocaial: true,
        },
      ],
    },
    {
      title: "LOCAL TIME",
      infos: [
        {
          p: localTime,
        },
      ],
    },
    {
      title: "VERSION",
      infos: [
        {
          p: "2024 © Edition",
        },
      ],
    },
  ];

  useEffect(() => {
    // Split text into characters
    const nameSplit = new SplitType(nameRef.current, { types: "chars" });
    const name2Split = new SplitType(name2Ref.current, { types: "chars" });

    // Create a timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footerSection",
        start: "center bottom", // Adjust based on when you want the animation to start
        onEnter: () => tl.restart(), // Restart animation when entering the footer section
      },
    });

    // Add animations to the timeline
    tl.from(nameSplit.chars, {
      y: 150,
      stagger: 0.01,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    })
      .from(
        name2Split.chars,
        {
          y: 150,
          stagger: 0.01,
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
        },
        0
      )
      .fromTo(
        ".Footertext",

        { y: 115, rotate: 20 },
        {
          y: 0,
          stagger: 0.04,
          delay: 0.2,
          rotate: 0,
          duration: 0.5,
          ease: "power1.out",
        },
        0
      );
  }, []);

  useEffect(() => {
    gsap.to(".FooterCurve", {
      scrollTrigger: {
        trigger: ".footerSection",
        start: "top 75%", // Start the animation when the top of the footerSection is at 80% of the viewport
        end: "bottom 40%", // End the animation when the bottom of the FooterCurve reaches the top of the viewport
        scrub: 1.5, // Smoother scrub value for a gradual animation
      },
      scaleY: 0,
      duration: 2, // Increase the duration slightly
    });

    gsap.to(".cercel", {
      scrollTrigger: {
        trigger: ".footerSection",
        start: "top 80%", // Start the animation when the top of the footerSection is at 80% of the viewport
        end: "90% center", // End the animation when the bottom of the FooterCurve reaches the top of the viewport
        scrub: 1.5, // Smoother scrub value for a gradual animation
      },
      boxShadow: 0,
    });
  }, []);

  return (
    <div className=" footerSection  relative overflow-hidden z-[30] ">
      {/* curve */}

      <div className=" w-[120%]  FooterCurve  absolute left-[50%] -top-[7rem]   transform  translate-x-[-50%]  lg:h-[30px] h-[15px]  z-50 ">
        <div
          style={{
            boxShadow: "  0px 60px 50px rgba(0,0,0,0.748) ",
          }}
          className=" cercel  absolute right-[-10%] rounded-[50%]   h-[1555%] w-[120%] bg-main "
        >
          {/* <Curve  end={"bottom 20%"} start={""} section={".footer"} mainColor={true} /> */}
        </div>
      </div>

      <div className="  h-[80vh] lg:h-[100vh] flex flex-col justify-between text-white  lg:pt-24   pt-[2rem]   px-[1rem] lg:px-[2rem]  relative bg-sec ">
        <div className=" flex flex-col  lg:flex-row  justify-between w-full">
          <div className=" flex    justify-between">
            {/* links */}
            <div className="lg:text-lg flex flex-wrap  lg:gap-10 gap-6">
              {Links.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="overflow-hidden">
                    <h1 className="Footertext opacity-50 text-sm">
                      {item.title}
                    </h1>
                  </div>
                  <div className="flex gap-1 flex-col whitespace-nowrap leading-6">
                    {item.links?.map((linkItem, linkIndex) => (
                      <div key={linkIndex} className="overflow-hidden">
                        <Link
                          href={linkItem.link}
                          target={linkItem?.isSocaial ? "_blank" : ""}
                          rel="noopener noreferrer"
                        >
                          <h1 className="Footertext text-[0.95rem] cursor-pointer hover:text-gray-400 text-gray-300">
                            <FlipLink>{linkItem.text}</FlipLink>
                          </h1>
                        </Link>
                      </div>
                    ))}
                    {/* Render the infos section */}
                    {item.infos?.map((infoItem, infoIndex) => (
                      <div key={infoIndex} className="  overflow-hidden">
                        <p className="Footertext text-[0.95rem] ">
                          {infoItem.p}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:flex-row lg:w-fit w-full  md:items-start items-center flex-col flex gap-5 pt-10">
            <div>
              <ButtonEffect
                Style={
                  "bg-sec lg:w-fit w-[87vw] border-white hover:border-0 border-[1px] text-white"
                }
              >
                <a
                  href="https://wa.me/213779577865"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +213779577865
                </a>
              </ButtonEffect>
            </div>
            <div>
              <ButtonEffect
                Style={
                  "bg-sec border-white lg:w-fit w-[87vw] hover:border-0 border-[1px] text-white"
                }
              >
                <a href="mailto:azizkhaldi0210@gmail.com">
                  azizkhaldi0210@gmail.com
                </a>
              </ButtonEffect>
            </div>
          </div>
        </div>

        {/* big text */}
        <div className="   font-righteous  lg:leading-[7rem] leading-[5rem]    lg:text-[6rem] text-[3rem] flex flex-col  ">
          <div className="  overflow-hidden ">
            <h1 ref={nameRef}>KHALDI AHMED</h1>
          </div>
          <div className="  overflow-hidden -mt-7">
            <h1 ref={name2Ref}>ABDELAZIZ</h1>
          </div>
        </div>
      </div>
      <div className=" lg:block hidden">
        <LogoWithText style={"absolute bottom-6 right-6"} />
      </div>
    </div>
  );
}

export default Footer;
