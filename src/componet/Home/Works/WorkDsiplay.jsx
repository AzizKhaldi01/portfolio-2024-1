"use client"
import React, { useEffect, useRef, useState } from "react";
import CursorBtn from "../../UI/CursorBtn";
import Magnetic from "../../../componet/gsap/Magnetic";
import Link from "next/link";
import ArrowIcon from "@/assest/Icons/ArrowIcon";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";



function WorkDsiplay({ item }) {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    // Dynamically import Splitting only on the client side
    const initializeSplitting = async () => {
      const Splitting = (await import('splitting')).default;
      const results = Splitting({ target: titleRef.current, by: 'chars' });
      
      // Animate the chars
      gsap.fromTo(results[0].chars,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse'
          }
        }
      );
    };

    gsap.registerPlugin(ScrollTrigger);
    initializeSplitting();

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
        <h1
          ref={titleRef}
          className={`work_title lg:text-[10rem] md:text-[6rem] text-[4rem] ${item.color} font-righteous whitespace-nowrap`}
          data-splitting=""
        >
          {item.title}
        </h1>
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
