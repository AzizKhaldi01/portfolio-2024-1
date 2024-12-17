import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ArrowIcon from "@/assest/Icons/ArrowIcon";
import { AnimatePresence , motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState("black");

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
      });
    };

    const handleMouseEnter = (e) => {
      const color = e.currentTarget.dataset.cursorColor;
      setCursorColor(color);
      setIsHovering(true);

      gsap.to(cursor, {
        // scale: 4.5,
        duration: 0.3,
        mixBlendMode: "normal",
        backgroundColor: "black",
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        backgroundColor: "transparent",
        mixBlendMode: "difference",
      });
    };

    // Add new function to check cursor position on scroll
    const handleScroll = () => {
      const x = cursor.getBoundingClientRect().left + cursor.offsetWidth / 2;
      const y = cursor.getBoundingClientRect().top + cursor.offsetHeight / 2;
      const elementAtPoint = document.elementFromPoint(x, y);

      if (elementAtPoint?.closest(".target")) {
        const color = elementAtPoint.closest(".target").dataset.cursorColor;
        setCursorColor(color);
        setIsHovering(true);
        gsap.to(cursor, {
          // scale: 4.5,
          duration: 0.3,
          backgroundColor: "black",
          mixBlendMode: "normal",
        });
      } else {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          backgroundColor: "transparent",
          mixBlendMode: "difference",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);

    // Add event listeners to all elements with class 'target'
    const targets = document.querySelectorAll(".target");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (isHovering) {
        // Enter animation
        gsap.fromTo(contentRef.current,
          {
            opacity: 0,
            width: 0,
            duration: 1,
          },
          {
            opacity: 1,
            width: 200,
            duration: 0.4,
            ease: "back.out(1.7)"
          }
        );
      } else {
        // Exit animation
        gsap.to(contentRef.current, {
          opacity: 0,
          scale: 0,
          width: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isHovering]);

  const text = "view";

  return (
    <div
      ref={cursorRef}
      className={`fixed z-[200] ${
        !isHovering ? "rounded-full w-8 h-8" : "rounded-full px-2  pl-3 p-1"
      } border-2 hidden lg:flex border-white pointer-events-none items-center justify-center ${
        isHovering ? "bg-black" : "bg-transparent"
      }`}
      style={{
        transform: "translate(-50%, -50%)",
        backgroundColor: isHovering ? "black" : "transparent",
        border: isHovering ? "none" : "2px solid white",
        mixBlendMode: "difference",
      }}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            className="flex items-center gap-4 pr-3 py-2 font-righteous text-white overflow-hidden relative"
            initial={{ opacity: 0, scale: 0, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: "100%" }}
            exit={{ opacity: 0, scale: 0, width: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            <div className="text-3xl font-medium pb-1 px-1  flex">
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + (index * 0.05),
                    ease: "easeOut"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="relative"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              <ArrowIcon className="w-6 h-6 -rotate-45" />
              <svg 
                className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[3.3rem]  h-[3.3rem] " 
                viewBox="0 0 100 100"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                  stroke="transparent"
                />
                <text className="text-[16px] animate-spin-slow fill-white" style={{ transformOrigin: 'center' }}>
                  <textPath  style={{color: "white"}} href="#circlePath" startOffset="0%" className="text-white" >
                     Click to view • Click to view • Click to view
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
