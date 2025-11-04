"use client"
import React, { useEffect, useRef, useState } from "react";
import CursorBtn from "../../UI/CursorBtn";
import Magnetic from "../../../componet/gsap/Magnetic";
import Link from "next/link";
import ArrowIcon from "@/assest/Icons/ArrowIcon";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollReveal from "../../gsap/ScrollReveal";



function WorkDsiplay({ item }) {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Title animation is now handled by ScrollReveal component

    // Your existing animations
    gsap.fromTo(buttonRef.current,
      {
        y: 50,
      },
      {
        y: -100,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      }
    );

    let animationFrameId;
    
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.05);
      
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${currentY.current}px)`;
      }

      targetY.current = 20 * Math.sin(Date.now() * 0.001);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animate-section flex mt-8 font-bold items-center justify-center h-screen relative">
      <Link
        href={item?.Link}
        ref={cardRef}
        target="_blank"
        className="relative cursor-none target Item z-50"
        data-cursor-color={item.bg}
        style={{ backgroundColor: item.bg }}
      >
        <img
          ref={imageRef}
          className="opacity-90 cursor-none md:scale-110 scale-150 w-full md:h-[80vh] sm:h-[45vh] z-30"
          src={item.img?.src}
          alt={item?.title}
          style={{ willChange: 'transform' }}
        />
      </Link>
      <div className="cursor-default top-[12%] md:top-[0%] right-[50%] translate-x-[50%] transform absolute">
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={4}
          delay={0.5}
          duration={1}
          blurStrength={8}
          containerClassName=""
          textClassName={`work_title lg:text-[10rem] md:text-[6rem] text-[4rem] ${item.color} font-righteous whitespace-nowrap`}
        >
          {item.title}
        </ScrollReveal>
      </div>

      <Magnetic>
        <Link
          ref={buttonRef}
          className="works_button opacity-50 lg:hidden btn absolute z-50 bottom-10 right-10 flex items-center justify-center h-[8rem] w-[8rem] text-white rounded-[50%]"
          style={{ backgroundColor: item.bg }}
          key={item.Link}
          target="_blank"
          href={item.Link}
        >
          <ArrowIcon className="lg:w-10 lg:h-10 w-8 h-8 -rotate-45" />
        </Link>
      </Magnetic>
    </div>
  );
}

export default WorkDsiplay;
