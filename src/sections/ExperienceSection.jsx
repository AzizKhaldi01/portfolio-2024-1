import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { paragraphData } from "../assest/data/expData.js";
import MagneticWrapper from "@/componet/gsap/Magnetic.jsx";
import ButtonEffect from "@/componet/UI/ButtonEffect.jsx";
import Link from "next/link.js";
import ArrowIcon from "@/assest/Icons/ArrowIcon.jsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function ExperienceSection() {
  const mainRef = useRef(null);
  const topRef = useRef(null);
  const centerRef = useRef(null);
  const bottomRef = useRef(null);
  const contentRef = useRef(null);
  const topH1Ref = useRef(null);
  const bottomH1Ref = useRef(null);
  const contentMaxScrollRef = useRef(0);
  const openPhase = 0.22; // portion of the scroll reserved for door opening

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the gravity door opening timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: () => `+=2800`, // deeper dynamic distance
          scrub: 1.5,
          pin: true,
          markers: false,
          onUpdate: (self) => {
            // Map progress to: door open (0 -> openPhase), then content scroll (openPhase -> 1)
            const p = self.progress;
            if (p <= openPhase) {
              const t = p / openPhase;
              gsap.to(centerRef.current, { height: "100vh", duration: 0.1, ease: "none" });
              gsap.to(topRef.current, { top: `${-55 * t}%`, duration: 0.1, ease: "none" });
              gsap.to(bottomRef.current, { bottom: `${-55 * t}%`, duration: 0.1, ease: "none" });
              gsap.to(topH1Ref.current, { top: `${10 + 50 * t}%`, duration: 0.1, ease: "none" });
              gsap.to(bottomH1Ref.current, { bottom: `${-30 * t}%`, duration: 0.1, ease: "none" });
              gsap.to(contentRef.current, { marginTop: `${(1 - t) * 100}%`, duration: 0.1, ease: "none" });
            } else {
              // Content scroll segment
              const t = (p - openPhase) / (1 - openPhase);
              const targetScrollTop = t * contentMaxScrollRef.current;
              if (contentRef.current) {
                contentRef.current.scrollTop = targetScrollTop;
              }
            }
          },
        }
      });

      // Ensure final state at the end
      tl.to({}, { duration: 0 });
    }, mainRef);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    // Measure how much the inner content can scroll
    const measure = () => {
      if (!contentRef.current) return;
      const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      contentMaxScrollRef.current = Math.max(0, maxScroll);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Animate experience cards on scroll
  useEffect(() => {
    if (!contentRef.current) return;

    const handleScroll = () => {
      if (!contentRef.current) return;

      const content = contentRef.current;
      const scrollTop = content.scrollTop;
      const scrollHeight = content.scrollHeight;
      const clientHeight = content.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Calculate progress (0 to 1)
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      // Update timeline progress line
      const timelineProgress = document.querySelector('.timeline-progress');
      if (timelineProgress) {
        // Calculate how much of the timeline should be filled based on scroll
        // We want it to fill as we scroll through the experience section
        const experienceSection = document.querySelector('.experience-timeline-container');
        if (experienceSection) {
          const expRect = experienceSection.getBoundingClientRect();
          const contentRect = content.getBoundingClientRect();

          // Calculate visible portion of experience section
          const visibleTop = Math.max(expRect.top, contentRect.top);
          const visibleBottom = Math.min(expRect.bottom, contentRect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          // Calculate progress through the experience section
          const expProgress = Math.max(0, Math.min(1,
            (contentRect.top - expRect.top + visibleHeight) / expRect.height
          ));

          gsap.to(timelineProgress, {
            height: `${expProgress * 93}%`,
            duration: 1,
          });
        }
      }

      // Animate experience cards when they come into view
      paragraphData.forEach((exp, i) => {
        const experienceCard = document.querySelector(`[data-index="${i}"]`);
        if (!experienceCard) return;

        const cardRect = experienceCard.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        // Calculate if card is in the center viewport area
        const viewportCenter = contentRect.top + (contentRect.height / 2);
        const cardCenter = cardRect.top + (cardRect.height / 2);
        const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
        const triggerDistance = contentRect.height / 1.8;

        const isActive = distanceFromCenter < triggerDistance && cardRect.top < contentRect.bottom;

        const experienceContent = experienceCard.querySelector('.experience-content');
        const companyName = experienceCard.querySelector('.company-name');
        const role = experienceCard.querySelector('.role-text');
        const dateTag = experienceCard.querySelector('.date-tag');
        const description = experienceCard.querySelector('.description-text');
        const timelineDot = experienceCard.querySelector('.timeline-dot');

        // Only animate if not already visible
        const hasAnimated = experienceCard.getAttribute('data-animated');
        if (isActive && !hasAnimated) {
          experienceCard.setAttribute('data-animated', 'true');
          const isLeft = i % 2 === 0;

          // Set initial states using GSAP
          gsap.set(timelineDot, { opacity: 0, scale: 0 });
          gsap.set(experienceContent, { opacity: 0 });
          gsap.set(companyName, { opacity: 0, y: 50 });
          gsap.set(role, { opacity: 0, y: 50 });
          gsap.set(description, { opacity: 0, y: 50 });
          gsap.set(dateTag, { opacity: 0, y: 50 });

          // Create animation timeline with stagger effect
          const tl = gsap.timeline({
            defaults: {
              duration: 1,
              ease: "power3.out"
            }
          });

          // Animate timeline dot
          if (timelineDot) {
            tl.to(timelineDot, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(2)",
            }, 0);
          }

          // Animate the main experience content container
          tl.to(experienceContent, {
            opacity: 1,
            duration: 0.8
          }, 0);

          // Animate company name with fade and slide up
          if (companyName) {
            tl.to(companyName, {
              opacity: 1,
              y: 0,
              duration: 1,
            }, 0.2);
          }

          // Animate role text with fade and slide
          if (role) {
            tl.to(role, {
              opacity: 1,
              y: 0,
              duration: 1,
            }, 0.4); // Increased delay
          }

          // Animate description with fade and slide
          if (description) {
            tl.to(description, {
              opacity: 1,
              y: 0,
              duration: 1,
            }, 0.6); // Increased delay
          }

          // Animate date tag with fade and slide
          if (dateTag) {
            tl.to(dateTag, {
              opacity: 1,
              y: 0,
              duration: 1,
            }, 0.8); // Increased delay
          }
        }
      });
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
    }

    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Animate background color when reaching last experience
  useEffect(() => {
    if (!contentRef.current || !centerRef.current) return;

    const handleScroll = () => {
      const content = contentRef.current;
      const center = centerRef.current;

      if (!content || !center) return;

      const contentRect = content.getBoundingClientRect();

      // Get the last experience item
      const lastExperienceIndex = paragraphData.length - 1;
      const lastExperience = document.querySelector(`[data-index="${lastExperienceIndex}"]`);

      if (!lastExperience) return;

      const lastExpRect = lastExperience.getBoundingClientRect();

      // Calculate when last experience is in view
      // Trigger when last experience reaches halfway up the viewport
      const triggerPoint = contentRect.top + (contentRect.height / 2);
      const isInView = lastExpRect.top <= triggerPoint;

      if (isInView) {
        // Change background to light gray
        gsap.to(center, {
          backgroundColor: '#e7e7e7',
          duration: 0.6,
          ease: 'power2.out'
        });

        // Hide timeline lines on light background
        gsap.to('.timeline-line', {
          opacity: 0,
          duration: 0.6,
        });
        gsap.to('.timeline-progress', {
          opacity: 0,
          duration: 0.6,
        });

        // Change last experience text to black
        const lastExpContent = lastExperience.querySelector('.company-name');
        const lastExpRole = lastExperience.querySelector('.role-text');
        const lastExpDesc = lastExperience.querySelector('.description-text');
        const lastExpDate = lastExperience.querySelector('.date-tag');

        if (lastExpContent) {
          gsap.to(lastExpContent, { color: '#000000', duration: 0.6, ease: 'power2.out' });
        }
        if (lastExpRole) {
          gsap.to(lastExpRole, { color: '#000000', duration: 0.6, ease: 'power2.out' });
        }
        if (lastExpDesc) {
          gsap.to(lastExpDesc, { color: 'rgba(40, 40, 40, 0.83)', duration: 0.6, ease: 'power2.out' });
        }
        if (lastExpDate) {
          gsap.to(lastExpDate, { color: 'rgba(130, 130, 130, 0.4)', duration: 0.6, ease: 'power2.out' });
        }
      } else {
        // Transition back to dark gray background
        gsap.to(center, {
          backgroundColor: '#1E1E1E',
          duration: 0.4,
          ease: 'power2.out'
        });

        // Show timeline lines on dark background
        gsap.to('.timeline-line', {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to('.timeline-progress', {
          opacity: 1,
          duration: 0.4,
        });

        // Change last experience text back to white
        const lastExpContent = lastExperience.querySelector('.company-name');
        const lastExpRole = lastExperience.querySelector('.role-text');
        const lastExpDesc = lastExperience.querySelector('.description-text');
        const lastExpDate = lastExperience.querySelector('.date-tag');

        if (lastExpContent) {
          gsap.to(lastExpContent, { color: '#ffffff', duration: 0.4, ease: 'power2.out' });
        }
        if (lastExpRole) {
          gsap.to(lastExpRole, { color: '#ffffff', duration: 0.4, ease: 'power2.out' });
        }
        if (lastExpDesc) {
          gsap.to(lastExpDesc, { color: 'rgba(255, 255, 255, 0.6)', duration: 0.4, ease: 'power2.out' });
        }
        if (lastExpDate) {
          gsap.to(lastExpDate, { color: 'rgba(255, 255, 255, 0.4)', duration: 0.4, ease: 'power2.out' });
        }
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full pb-[220rem] h-screen">
      <style jsx>{`
        /* Initial hidden state for animation */
        .experience-content,
        .company-name, 
        .role-text, 
        .description-text, 
        .date-tag, 
        .timeline-dot {
          opacity: 0;
        }
        
        .experience-content {
          will-change: transform, opacity;
        }
        
        .company-name, .role-text, .description-text, .date-tag, .timeline-dot {
          will-change: transform, opacity, scale;
          transform-origin: center;
        }
        
        /* Smooth text rendering for animations */
        .company-name, .role-text, .description-text, .date-tag {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Normal scrolling */
        .scrollable-content {
          scroll-behavior: auto;
        }
        
        /* Minimal scrollbar styling */
        .scrollable-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollable-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb {
          background: rgba(42, 42, 42, 0.15);
          border-radius: 2px;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Timeline progress line */
        .timeline-progress {
          transition: opacity 0.6s ease;
        }
        
        /* Timeline dot animation */
        .timeline-dot {
          transform-origin: center;
        }
      `}</style>
      <div
        ref={mainRef}
        className="relative w-full h-screen bg-sec overflow-hidden"
      >
        {/* Top Section */}
        <div
          ref={topRef}
          className="absolute top-0 w-full h-[50vh] bg-main z-[19] overflow-hidden"
        >
          <h1
            // ref={topH1Ref}
            className="absolute font-cabinetGrotesk font-bold  lg:-bottom-[140px] -bottom-[44px] lg:text-[13vw] text-[4rem] left-1/2 transform z-[100] -translate-x-1/2 text-sec"
          >
            Experience
          </h1>

          {/* Gradient overlays */}
          <div className="flex flex-row justify-between absolute top-0 right-0 w-full h-full">
            <div className="h-full w-[40%] bg-gradient-to-l from-transparent via-transparent to-main"></div>
            <div className="h-full w-[40%] bg-gradient-to-r from-transparent via-transparent to-main"></div>
          </div>
        </div>

        {/* Center Content Section */}
        <div
          ref={centerRef}
          className="relative w-full h-screen overflow-hidden"
          style={{ backgroundColor: '#1E1E1E' }}

        >

          <div
            ref={contentRef}
            className="scrollable-content flex flex-col items-center w-full h-screen text-white overflow-y-auto  lg:px-8 px-0 py-12 relative"
            style={{ marginTop: '0' }}
          >
            {/* Header Section */}
            <div className="text-center mb-20 max-w-4xl">
              <h4 className=" lg:text-sm text-xs font-bold tracking-[0.3em] mb-6 text-white/60 font-cabinetGrotesk ">Experience & Technologies</h4>
              <h3 className=" lg:text-4xl text-2xl font-bold leading-tight mb-4 text-white font-cabinetGrotesk">
                <em className="font-semibold text-white">Explore</em> my journey and the technologies that define my <em className="font-semibold text-white">craft</em>.
              </h3>

            </div>

            {/* Experience Timeline - Minimal Design */}
            <div className="w-full px-[1rem] md:px-[6rem] mb-20 relative">

              {/* Simple Vertical Line - Static Background */}
              <div className="timeline-line absolute left-1/2 top-0 w-[1px] bg-white/20" style={{ height: '100%', transform: 'translateX(-50%)' }}></div>

              {/* Animated Progress Line */}
              <div
                className="timeline-progress absolute left-1/2 top-0 w-[2px] bg-orange-500 origin-top"
                style={{
                  height: '-30%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#f97316',
                  boxShadow: '0 0 15px rgba(249, 115, 22, 0.6)',
                  zIndex: 2
                }}
              ></div>

              <div className="relative experience-timeline-container" style={{ height: `${paragraphData.length * 80}vh` }}>
                {paragraphData.map((exp, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className="experience-item absolute w-full flex items-center"
                      data-index={index}
                      style={{
                        top: `${index * 80}vh`,
                        minHeight: '80vh'
                      }}
                    >
                      {/* Circle Dot */}
                      <div
                        className="timeline-dot absolute left-1/2 w-3 h-3 rounded-full border border-white/60 bg-sec z-50"
                        style={{ transform: 'translateX(-50%)' }}
                      ></div>

                      {/* Experience Content - Minimal Design */}
                      <div
                        className={`experience-content z-[100] relative w-full md:w-[45%] ${isLeft ? 'md:pr-20 text-right' : 'md:ml-auto md:pl-20 text-left'}  lg:px-6 px-0`}
                      >
                        {/* Title */}
                        <h3
                          className="company-name font-cabinetGrotesk font-bold text-4xl md:text-6xl lg:text-7xl text-white  lg:mb-5 mb-2 leading-tight"
                        >
                          {exp.companyName}
                        </h3>

                        {/* Role */}
                        <div
                          className="role-text font-cabinetGrotesk text-xl md:text-3xl lg:text-4xl font-light text-white lg:mb-3 mb-2 leading-relaxed"
                        >
                          {exp.role}
                        </div>

                        {/* Description */}
                        <p
                          className="description-text font-cabinetGrotesk text-base md:text-lg text-white/60 leading-relaxed max-w-xl lg:mb-3  mb-2"
                          style={{
                            marginLeft: isLeft ? 'auto' : '0',
                            marginRight: isLeft ? '0' : 'auto'
                          }}
                        >
                          {exp.desc.substring(0, 180)}...
                        </p>

                        {/* Date */}
                        <div
                          className="date-tag text-sm md:text-base text-white/60 font-light"
                        >
                          {exp.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* View All Experience Button */}
            <div className="flex justify-center mt-16 mb-20">
              <MagneticWrapper>
                <div>
                  <Link href="/experience" scroll={false}>
                    <ButtonEffect
                      strength={3.7}
                      Style={
                        "lg:px-[2rem] px-[2.8rem] font-cabinetGrotesk lg:py-3 py-4 flex gap-2 border-2 border-sec text-sec hover:border-0 lg:text-lg text-lg text-black"
                      }
                    >
                      <span className="flex items-center gap-4">
                        View All Experience <ArrowIcon className="w-5 h-5" />
                      </span>
                    </ButtonEffect>
                  </Link>
                </div>
              </MagneticWrapper>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          ref={bottomRef}
          className="absolute bottom-0 w-full h-[50vh] z-[100] bg-main overflow-hidden"
        >
          <h1

            className="absolute  lg:-top-[160px] -top-[52px] font-cabinetGrotesk font-bold  lg:text-[13vw] text-[4rem] left-1/2 transform z-[100] -translate-x-1/2 text-sec"
          >
            Experience
          </h1>

          {/* Gradient overlays */}
          <div className="flex flex-row justify-between absolute top-0 right-0 w-full h-full">
            <div className="h-full w-[40%] bg-gradient-to-l from-transparent via-transparent to-main"></div>
            <div className="h-full w-[40%] bg-gradient-to-r from-transparent via-transparent to-main"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
