import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { paragraphData } from "../assest/data/expData.js";
import WordAnimation from "@/components/UI/WordAnimation.jsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function ExperienceSection() {
  const mainRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get the home page container
      const homeContainer = document.querySelector('.home');
      
      // Create simple scroll trigger that changes background
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top-=50px top",
        end: "bottom bottom",
        pin: false,
        markers: false,
        onEnter: () => {
          // Change home page background to black
          if (homeContainer) {
            gsap.to(homeContainer, {
              backgroundColor: '#1E1E1E',
              duration: 0.4,
              ease: 'power1.inOut'
            });
          }
          
          // Change text colors to white
          gsap.to('.experience-text', {
            color: '#ffffff',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.experience-text-secondary', {
            color: 'rgba(255, 255, 255, 0.6)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.timeline-line', {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.timeline-dot', {
            borderColor: 'rgba(255, 255, 255, 0.6)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
        },
        onLeave: () => {
          // Change back to main background
          if (homeContainer) {
            gsap.to(homeContainer, {
              backgroundColor: '#e7e7e7',
              duration: 0.4,
              ease: 'power1.inOut'
            });
          }
          
          // Change text colors back to sec
          gsap.to('.experience-text', {
            color: '#1E1E1E',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.experience-text-secondary', {
            color: 'rgba(0, 0, 0, 0.6)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
        },
        onEnterBack: () => {
          // Change home page background to black
          if (homeContainer) {
            gsap.to(homeContainer, {
              backgroundColor: '#1E1E1E',
              duration: 0.4,
              ease: 'power1.inOut'
            });
          }
          
          // Change text colors to white
          gsap.to('.experience-text', {
            color: '#ffffff',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.experience-text-secondary', {
            color: 'rgba(255, 255, 255, 0.6)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.timeline-line', {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.timeline-dot', {
            borderColor: 'rgba(255, 255, 255, 0.6)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
        },
        onLeaveBack: () => {
          // Change back to main background
          if (homeContainer) {
            gsap.to(homeContainer, {
              backgroundColor: '#e7e7e7',
              duration: 0.4,
              ease: 'power1.inOut'
            });
          }
          
          // Change text colors back to sec
          gsap.to('.experience-text', {
            color: '#1E1E1E',
            duration: 0.4,
            ease: 'power1.inOut'
          });
          gsap.to('.experience-text-secondary', {
            color: 'rgba(0, 0, 0, 0.6)',
            duration: 0.4,
            ease: 'power1.inOut'
          });
        }
      });
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate experience cards on scroll
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      paragraphData.forEach((exp, i) => {
        const experienceCard = document.querySelector(`[data-index="${i}"]`);
        if (!experienceCard) return;

        ScrollTrigger.create({
          trigger: experienceCard,
          start: "top 80%",
          end: "bottom 20%",
          markers: false,
          onEnter: () => {
            const timelineDot = experienceCard.querySelector('.timeline-dot');
            const experienceContent = experienceCard.querySelector('.experience-content');

            const tl = gsap.timeline({
              defaults: {
                duration: 1,
                ease: "power3.out"
              }
            });

            if (timelineDot) {
              tl.fromTo(timelineDot, 
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
                0
              );
            }

            if (experienceContent) {
              tl.fromTo(experienceContent,
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                0
              );
            }
          }
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Update timeline progress line
  useEffect(() => {
    if (!contentRef.current) return;

    const timelineProgress = document.querySelector('.timeline-progress');
    if (!timelineProgress) return;

    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(timelineProgress, {
          height: `${progress * 93}%`,
          duration: 0.3,
          ease: "none"
        });
      }
    });
  }, []);

  // Animate background color when reaching last experience
  useEffect(() => {
    if (!mainRef.current) return;

    const lastExperienceIndex = paragraphData.length - 1;
    const lastExperience = document.querySelector(`[data-index="${lastExperienceIndex}"]`);

    if (!lastExperience) return;

    ScrollTrigger.create({
      trigger: lastExperience,
      start: "top center",
      end: "bottom center",
      markers: false,
      onEnter: () => {
        gsap.to('.timeline-line', {
          opacity: 0,
          duration: 0.6,
        });
        gsap.to('.timeline-progress', {
          opacity: 0,
          duration: 0.6,
        });
      },
      onLeaveBack: () => {
        gsap.to('.timeline-line', {
          opacity: 1,
          duration: 0.4,
        });
        gsap.to('.timeline-progress', {
          opacity: 1,
          duration: 0.4,
        });
      }
    });
  }, []);

  // SVG Line Animation
  useEffect(() => {
    const svgPath = document.querySelector('#experience-line-path');
    if (!svgPath || !contentRef.current) return;

    const pathLength = svgPath.getTotalLength();

    gsap.set(svgPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(svgPath, {
          strokeDashoffset: pathLength * (1 - progress),
          duration: 0.3,
          ease: 'none',
        });
      }
    });
  }, []);

  return (
    <div className="w-full">
      <style jsx>{`
        .experience-content,
        .timeline-dot {
          opacity: 0;
        }
        
        .experience-content {
          will-change: transform, opacity;
        }
        
        .timeline-dot {
          will-change: transform, opacity, scale;
          transform-origin: center;
        }

        .timeline-progress {
          transition: opacity 0.6s ease;
        }
      `}</style>
      
      <div
        ref={mainRef}
        className="relative w-full min-h-screen"
      >
        {/* Center Content Section */}
        <div
          ref={contentRef}
          className="flex flex-col items-center w-full text-white lg:px-8 px-0 py-12 md:py-16 lg:py-24 relative"
        >
          {/* SVG Line Animation */}
          <div className="absolute lg:block hidden h-[200vh] top-[20rem] md:top-[25rem] lg:top-[30rem] lg:left-0 -left-44 w-full pointer-events-none z-[5]" style={{ height: `${paragraphData.length * 50}vh` }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              viewBox="0 0 1200 3000"
              fill="none"
              preserveAspectRatio="xMidYMin slice"
            >
              <path
                id="experience-line-path"
                d="M0.478149 0.14624C179.389 584.988 1024.24 241.063 1203.16 488.791C1382.07 736.519 591.549 555.192 685.399 850.592C754.827 1069.12 1251.74 767.219 1254.66 995.312C1257.47 1214.38 748.65 1128.11 748.65 1392.87C748.65 1678.93 1318.81 1483.96 1318.81 1754.67C1318.81 1978.88 826.875 1777.46 819.13 2001.55C811.613 2219.04 1126.15 2122.45 1318.81 2242.46C1511.48 2362.48 902.26 3183.15 902.26 3183.15"
                stroke="#d4f534"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Header Section */}
          <div className="text-center mb-10 md:mb-16 lg:mb-20 max-w-4xl px-4">
            <h4 className="experience-text-secondary lg:text-sm text-xs font-bold tracking-[0.3em] mb-4 md:mb-6 font-cabinetGrotesk" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Experience & Technologies</h4>
            <h3 className="lg:text-4xl text-2xl font-bold leading-tight mb-4 font-cabinetGrotesk">
              <WordAnimation
                text="Explore my journey and the technologies that define my craft."
                className="experience-text font-cabinetGrotesk font-bold leading-tight mb-4 font-cabinetGrotesk"
                stagger={0.015}
                style={{ color: '#1E1E1E' }}
              />
            </h3>
          </div>

          {/* Experience Timeline */}
          <div className="w-full px-[1rem] md:px-[3rem] lg:px-[6rem] mb-10 md:mb-16 lg:mb-20 relative">
            <div className="timeline-line absolute left-1/2 top-0 w-[1px]" style={{ height: '100%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>

            <div
              className="timeline-progress absolute left-1/2 top-0  lg:w-[2px] w-[1px] bg-orange-500 origin-top"
              style={{
                height: '0%',
                transform: 'translateX(-50%)',
                backgroundColor: '#D4F534',
                boxShadow: '0 0 15px #D4F534',
                zIndex: 2
              }}
            ></div>

            <div className="relative experience-timeline-container" >
              {paragraphData.map((exp, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className="experience-item w-full flex items-center mb-[30vh] md:mb-[50vh] lg:mb-[80vh]"
                    data-index={index}
                  >
                    <div
                      className="timeline-dot absolute left-1/2 w-3 h-3 rounded-full border bg-black z-50"
                      style={{ transform: 'translateX(-50%)', borderColor: 'rgba(0, 0, 0, 0.6)' }}
                    ></div>

                    <div
                      className={`experience-content experience-content-${index} z-[100] relative w-full md:w-[45%] ${isLeft ? 'md:pr-20 text-right' : 'md:ml-auto md:pl-20 text-left'} lg:px-6 px-0`}
                    >
                      <WordAnimation
                        trigger={`.experience-content-${index}`}
                        stagger={0.02}
                        delay={0}
                        className={`experience-text font-cabinetGrotesk font-bold text-4xl md:text-6xl lg:text-7xl lg:mb-5 mb-2 leading-tight company-name`}
                        text={exp.companyName}
                        style={{ color: index === paragraphData.length - 1 ? '#6B7280' : '#6B7280' }}
                      />

                      <WordAnimation
                        trigger={`.experience-content-${index}`}
                        stagger={0.015}
                        delay={0.3}
                        className={`experience-text-secondary font-cabinetGrotesk text-xl md:text-3xl lg:text-4xl font-light lg:mb-3 mb-2 leading-relaxed role-text`}
                        text={exp.role}
                        style={{ color: index === paragraphData.length - 1 ? '#9CA3AF' : '#9CA3AF' }}
                      />

                      <WordAnimation
                        trigger={`.experience-content-${index}`}
                        stagger={0.01}
                        delay={0.5}
                        className={`experience-text-secondary font-cabinetGrotesk text-base md:text-lg leading-2 lg:mb-3 mb-2 max-w-xl description-text`}
                        lineHeight="1"
                        marginLeft={isLeft ? 'auto' : '0'}
                        marginRight={isLeft ? '0' : 'auto'}
                        text={exp.shortDesc}
                        style={{ color: index === paragraphData.length - 1 ? '#9CA3AF' : '#9CA3AF' }}
                      />

                      <WordAnimation
                        trigger={`.experience-content-${index}`}
                        stagger={0.05}
                        delay={0.7}
                        className={`experience-text-secondary text-sm md:text-base font-light date-tag`}
                        text={exp.date}
                        style={{ color: index === paragraphData.length - 1 ? '#9CA3AF' : '#9CA3AF' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;