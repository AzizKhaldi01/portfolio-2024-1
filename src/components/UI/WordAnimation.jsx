"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const WordAnimation = ({ 
  text, 
  className = "", 
  once = false,
  trigger = null, 
  start = "top 80%", 
  end = "bottom 20%",
  reverse = false,
  scrub = false,
  stagger = 0.1,
  delay = 0
}) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Split text into words
    const words = text.split(" ");
    const wordElements = wordsRef.current.filter(Boolean);

    if (wordElements.length === 0) return;

    // Set initial state
    gsap.set(wordElements, {
      y: 100,
      opacity: 0,
    });

    // Create animation
    const animation = gsap.to(wordElements, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: stagger,
      delay: delay,
      ease: "power3.out",
      once: once,
      reverse: reverse,
    });

    // Apply scroll trigger if trigger is provided
    if (trigger) {
      ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        scrub: scrub,
        animation: animation,
        onEnter: () => {
          if (!scrub) {
            animation.play();
          }
        },
        onLeave: () => {
          if (!scrub) {
            animation.reverse();
          }
        },
        onEnterBack: () => {
          if (!scrub) {
            animation.play();
          }
        },
        onLeaveBack: () => {
          if (!scrub) {
            animation.reverse();
          }
        }
      });
    } else {
      // Play animation immediately if no trigger
      animation.play();
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.animation === animation) {
          trigger.kill();
        }
      });
    };
  }, [text, trigger, start, end, scrub, stagger, delay, once]);

  return (
    <div style={{
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      }} ref={containerRef} className={className}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordsRef.current[index] = el)}
          className="inline-block mr-2"
          
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default WordAnimation;
