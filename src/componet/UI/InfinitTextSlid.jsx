import BigStar from "@/assest/Icons/bigStar";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";

function InfinitTextSlid({ trigger, style, color }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    // Register the GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    const marqueeElement = marqueeRef.current;
    if (!marqueeElement || !marqueeElement.children.length) return; // Ensure marqueeElement exists and has children

    const baseSpeed = 50; // Changed from 20 to 30
    let currentDirection = -1;

    const tween = gsap.to(marqueeElement.children, {
      xPercent: 100,
      ease: "none",
      repeat: -1,
      duration: baseSpeed,
      paused: true,
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const newDirection = self.direction;

        // Only update if direction changed
        if (newDirection !== currentDirection) {
          currentDirection = newDirection;

          // Set consistent speed regardless of direction
          tween.vars.xPercent = currentDirection === 1 ? 70 : -70;

          // Kill the old tween and create a new one to ensure consistent speed
          tween.kill();
          gsap.to(marqueeElement.children, {
            xPercent: currentDirection === 1 ? 70 : -70,
            ease: "none",
            repeat: -1,
            duration: baseSpeed,
          });
        }
      },
    });

    return () => {
      scrollTrigger.kill(); // Clean up the ScrollTrigger instance on component unmount
    };
  }, [trigger]); // Add 'trigger' as a dependency

  return (
    <div
      className={`  item relative w-full overflow-hidden   ${style} md:text-[7rem] text-[3rem] overflow-hidden  h-full w-full  lg:py-28  py-20  `}
    >
      <div className=" absolute top-[50%]  right-[50%] transform translate-x-[50%] translate-y-[-50%] overflow-hidden w-fit ">
        <div
          ref={marqueeRef}
          className={`whitespace-nowrap flex overflow-hidden items-center  font-normal  `}
        >
          <div className="  flex items-center  gap-10 50">
            <BigStar
              color={color}
              className=" h-10 w-10 lg:h-20 lg:w-20 "
              trigger={trigger}
            />{" "}
            FRONT-END DEVELOPER{" "}
            <span
              classNa
              me=" lg:h-5 h-3  lg:w-20 w-12 rounded-full bg-thr "
            ></span>{" "}
            UI & UX DESIGNER.
          </div>
          <div className="flex items-center gap-10   whitespace-nowrap ">
            <BigStar
              color={color}
              className=" h-10 w-10 lg:h-20 lg:w-20 "
              trigger={trigger}
            />{" "}
            FRONT-END DEVELOPER{" "}
            <BigStar
              color={color}
              className="  h-10 w-10 lg:h-20 lg:w-20 "
              trigger={trigger}
            />
            UI & UX DESIGNER.
          </div>
          <div className=" flex items-center gap-10 ">
            FRONT-END DEVELOPER
            UI & UX DESIGNER.{" "}
            <BigStar
              className=" h-10 w-10 lg:h-20 lg:w-20 "
              color={color}
              trigger={trigger}
            />
          </div>

          {/* <MyPic /> */}
        </div>
      </div>
    </div>
  );
}

export default InfinitTextSlid;
