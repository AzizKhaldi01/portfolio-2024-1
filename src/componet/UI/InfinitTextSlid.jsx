import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";

function InfinitTextSlid({trigger , style}) {

    const marqueeRef = useRef(null);

    useEffect(() => {
      // Register the GSAP plugin
      gsap.registerPlugin(ScrollTrigger);
    
      const marqueeElement = marqueeRef.current;
      if (!marqueeElement || !marqueeElement.children.length) return; // Ensure marqueeElement exists and has children
    
      const tween = gsap.to(marqueeElement.children, {
        // xPercent: -120, // Move the marquee elements left
        ease: "linear",
        repeat: -1, // Infinite scroll
        duration: 20, // Adjust the speed of scrolling
        paused: true,
      });
    
      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const isScrollingDown = self.direction === 1; // 1 for down, -1 for up
    
          // Update sliding direction based on scroll
          tween.vars.xPercent = isScrollingDown ? 100 : -100; // Move in the opposite direction
          tween.timeScale(1).play(); // Play forward
          tween.invalidate().restart(); // Restart tween with updated direction
        },
      });
    
      return () => {
        scrollTrigger.kill(); // Clean up the ScrollTrigger instance on component unmount
      };
    }, [trigger]); // Add 'trigger' as a dependency
    
    
  return (
    <div className= {`  item relative w-full overflow-hidden   ${style} md:text-[8rem] text-[3rem] overflow-hidden  h-full w-full  lg:py-28  py-20  `}>
      <div className=" absolute top-[50%]  right-[50%] transform translate-x-[50%] translate-y-[-50%] overflow-hidden w-fit ">
        <div
          ref={marqueeRef}
          className={`    whitespace-nowrap    font-righteous     flex   overflow-hidden  items-center  `}
        >
          <div className="  flex items-center  gap-10 ">
            <span className=" lg:h-5 h-3   lg:w-20 w-12 rounded-full bg-thr "></span> Front-end
            Developer <span className=" lg:h-5 h-3  lg:w-20 w-12 rounded-full bg-thr "></span>{" "}
            UI & UX Designer.
          </div>
          <div className="flex items-center gap-10   whitespace-nowrap ">
            <span className=" lg:h-5 h-3 lg:w-20 w-12 rounded-full bg-thr "></span> Front-end
            Developer <span className=" lg:h-5 h-3  lg:w-20 w-12 rounded-full bg-thr "></span>
            UI & UX Designer.
            <span className=" lg:h-5 h-3 lg:w-20 w-12 rounded-full  bg-thr "></span>
          </div>
          <div className=" flex items-center gap-10 ">
            Front-end Developer
            <span className=" lg:h-5 h-3 lg:w-20 w-12 rounded-full bg-thr "></span> UI & UX
            Designer. <span className=" lg:h-5 h-3 lg:w-20 w-12  rounded-full bg-thr "></span>
          </div>

          {/* <MyPic /> */}
        </div>
      </div>
    </div>
  );
}

export default InfinitTextSlid;
