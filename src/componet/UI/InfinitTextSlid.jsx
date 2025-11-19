import BigStar from "@/assest/Icons/bigStar";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import greenFlower from "@/assest/Images/green-flower.avif";
import Image from "next/image";



const Flower = () => {
  return (
    <Image src={greenFlower} alt="green flower" className="h-16 w-16 lg:h-[8rem] lg:w-[8rem] " />
  );
};

function InfinitTextSlid({ trigger, style, color, delay = 0, className = "", isFlower = false }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    const items = marqueeElement.querySelectorAll("div");
    gsap.fromTo(
      items,
      { y: 300, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        stagger: 0.01,
        scrollTrigger: {
          trigger: ".infinit-text",
          start: "top bottom",
          toggleActions: "play none none reverse",
          once: false,
        },
      }
    );

    const baseSpeed = 20;
    let currentDirection = -1;

    const createMarqueeTween = (direction) => {
      const children = Array.from(marqueeElement.children);

      // Get current xPercent to maintain smooth transition
      const currentX = gsap.getProperty(children[0], "xPercent") || 0;

      // Calculate the target based on direction
      const target = direction === 1 ? 100 : -100;

      // Calculate distance to travel from current position
      const distance = Math.abs(target - currentX);

      // Adjust duration based on remaining distance to keep speed consistent
      const adjustedDuration = (distance / 100) * baseSpeed;

      return gsap.to(children, {
        xPercent: target,
        ease: "none",
        duration: adjustedDuration,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 100) // Seamless loop
        },
        repeat: -1,
      });
    };

    let tween = createMarqueeTween(currentDirection);

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const newDirection = self.direction;
        if (newDirection !== currentDirection) {
          currentDirection = newDirection;
          tween.kill();
          tween = createMarqueeTween(currentDirection);
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      tween.kill();
    };
  }, [trigger]);

  return (
    <div
      className={`item font-semibold relative w-full overflow-hidden ${style} md:text-[8rem] text-[3rem] h-full lg:py-28 py-20`}
    >
      <div className="absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] overflow-hidden w-fit">
        <div
          ref={marqueeRef}
          style={{
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          className=" infinit-text whitespace-nowrap flex overflow-hidden items-center "
        >
          <div className="flex items-center gap-10">
              {isFlower && <Flower />}
              {!isFlower && <BigStar color={color} className="h-16 w-16 lg:h-20 lg:w-20" />}
            FULL-STACK DEVELOPER
            <BigStar color={color} className="h-16 w-16 lg:h-20 lg:w-20" />
            UI & UX DESIGNER.
          </div>
          <div className="flex items-center gap-10 whitespace-nowrap">
            {isFlower && <Flower />}
            {!isFlower && <BigStar color={color} className="h-16 w-16 lg:h-20 lg:w-20" />}
            FULL-STACK DEVELOPER
            <BigStar color={color} className="h-16 w-16 lg:h-20 lg:w-20" />
            UI & UX DESIGNER.
            {isFlower && <Flower />}
            {!isFlower && <BigStar color={color} className="h-16 w-16 lg:h-20 lg:w-20" />}
          </div>
          <div className="flex items-center gap-10">
            FULL-STACK DEVELOPER UI & UX DESIGNER.
            {isFlower && <Flower />}
            {!isFlower && <BigStar className="h-16 w-16 lg:h-28 lg:w-28" color={color} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfinitTextSlid;