"use client";
import Image from "next/image";
import HeroImg from "../assest/Images/Hero/Hero.jpg";
import React from "react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

 
function Hero() {
  const background = useRef(null);
  const img = useRef(null);

  useLayoutEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#heroo",
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    timeline.fromTo(
      background.current,
      { clipPath: "inset(20%)" },
      { clipPath: "inset(0%)", ease: "easeIn" } // Use custom ease here
    ).to( img.current,
      { borderRadius: "3rem" },
    )
  }, []);

  return (
    <div id="heroo" className="w-full h-[100vh] relative">
      <div ref={background} className="top-0 absolute w-full  h-[90vh] lg:h-[140vh]">
        <Image
          fill={true}
          alt="image"
        ref={img}
          priority={true}
          className="object-cover rounded-lg h-full w-full top-0 right-0"
          src={HeroImg}
        />
      </div>
    </div>
  );
}

export default Hero;
