"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LineAnimation = ({ 
  text, 
  className = "", 
  stagger = 0.01,
  delay = 0,
  duration = 1,
  enableBlur = true,
  baseOpacity = 0.1,
  blurStrength = 4,
  onScroll = false, // New prop to control scroll trigger
  scrollTriggerStart = "top 80%" // New prop to control scroll trigger start position
}) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const wordElements = wordsRef.current.filter(Boolean);

    if (wordElements.length === 0) return;

    const animConfig = {
      opacity: baseOpacity, 
      y: 20,
      willChange: 'opacity, transform',
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)'
    };

    const animTo = {
      ease: 'power2.out',
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      delay: delay,
      stagger: stagger,
      duration: duration,
    };

    // Create the animation
    const animation = gsap.fromTo(wordElements, animConfig, animTo);

    if (onScroll) {
      // If onScroll is true, create a ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: scrollTriggerStart,
        once: true, // Animation plays only once
        animation: animation
      });
    }

    return () => {
      if (onScroll) {
        // Clean up ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      animation.kill();
    };
  }, [text, stagger, delay, duration, enableBlur, baseOpacity, blurStrength]);

  return (
    <div ref={containerRef} className={className}>
      {text.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word;
        return (
          <span
            key={index}
            ref={(el) => (wordsRef.current[index] = el)}
            className="inline-block"
            style={{
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export default LineAnimation;
