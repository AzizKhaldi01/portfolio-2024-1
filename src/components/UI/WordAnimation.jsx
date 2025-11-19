import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WordAnimation = ({ 
  text, 
  className = "", 
  once = false,
  lineHeight = '1',
  trigger = null, 
  scrollContainer = null,
  start = "top 80%",
  stagger = 0.1,
  delay = 0,
  style = {},
  tag = "div" // New prop to specify the HTML tag
}) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const Tag = tag; // Dynamic tag component

  useEffect(() => {
    if (!containerRef.current) return;

    const words = wordsRef.current;
    const targetElement = trigger 
      ? document.querySelector(trigger) 
      : containerRef.current;

    if (!targetElement || words.length === 0) return;

    // Set initial state
    gsap.set(words, {
      yPercent: 100,
      opacity: 0,
      rotateX: -15
    });

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: targetElement,
        start: start,
        scroller: scrollContainer || undefined,
        toggleActions: once ? "play none none none" : "play none none reset",
        onEnter: () => {
          // Animate in
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: {
              amount: stagger * words.length,
              ease: "power2.inOut"
            },
            delay: delay
          });
        },
        onLeaveBack: () => {
          // Reset when scrolling back up (if not once)
          if (!once) {
            gsap.to(words, {
              yPercent: 100,
              opacity: 0,
              rotateX: -15,
              duration: 0.8,
              ease: "power3.in",
              stagger: {
                amount: stagger * words.length * 0.5,
                ease: "power2.inOut"
              }
            });
          }
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === targetElement) {
          st.kill();
        }
      });
    };
  }, [trigger, scrollContainer, start, once, stagger, delay, text]);

  return (
    <Tag 
      ref={containerRef} 
      className={className} 
      style={{ 
        ...style,
        perspective: '1000px'
      }}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{
            lineHeight: lineHeight,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
            marginRight: '0.3em'
          }}
        >
          <span
            ref={el => wordsRef.current[index] = el}
            className="inline-block mb-[0.2rem]"
            style={{
              transformOrigin: 'center bottom',
              transformStyle: 'preserve-3d'
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default WordAnimation;