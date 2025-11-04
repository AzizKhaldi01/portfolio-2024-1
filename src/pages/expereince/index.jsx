"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../componet/Navbar.jsx";
import Footer from "../../componet/Footer/Footer.jsx";
import Curve from "../../componet/UI/NavCurve.jsx";
import { paragraphData } from "../../assest/data/expData.js";
import Image from "next/image";
import SVGPathEditor from "../../componet/SVGPathEditor.jsx";
import ScrollReveal from "../../componet/gsap/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

function Page() {
  const containerRef = useRef(null);
  const progressPathRef = useRef(null);
  const pathLengthRef = useRef(0);
  const [svgHeight, setSvgHeight] = useState(1000);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [pathData, setPathData] = useState("M-10 0.5C319.5 171 -126.253 229.191 151.5 736.5C429.253 1243.81 151.5 1112 151.5 1273.5C151.5 1435 419.232 1590.14 185.5 1870C-48.2324 2149.86 170 2337 151.5 2665C133 2993 -56 3139.5 113.5 3385.5C283 3631.5 890.5 3283 1085 3359.5C1279.5 3436 931 3760.5 931 3760.5C931 3760.5 607.456 4013.09 662.5 4223C753.969 4571.81 1105.74 4449.2 1173.5 4806.5C1207.73 4987 985 5354 985 5354");
  const [dynamicPathPoints, setDynamicPathPoints] = useState([]);

  useEffect(() => {
    // Set the SVG height based on window height
    if (typeof window !== 'undefined') {
      setSvgHeight(window.innerHeight * 0.9);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  // Calculate points based on experience card title positions
  useEffect(() => {
    const calculateTitlePositions = () => {
      const cards = document.querySelectorAll('.experience-card');
      if (cards.length === 0) return;

      const points = [];
      const container = containerRef.current;
      const svgElement = document.querySelector('.dynamic-svg-path');

      if (!container || !svgElement) return;

      const containerRect = container.getBoundingClientRect();
      const svgRect = svgElement.getBoundingClientRect();

      cards.forEach((card, index) => {
        // Find the company name (title) element within the card
        const titleElement = card.querySelector('.company-name');
        if (titleElement) {
          const titleRect = titleElement.getBoundingClientRect();

          // Convert to SVG coordinates
          const x = 50; // Fixed x position for the line (left side of SVG)
          const y = titleRect.top - containerRect.top + (titleRect.height / 2);

          // Scale to SVG viewBox (0 0 600 6000)
          const svgX = (x / containerRect.width) * 600;
          const svgY = (y / containerRect.height) * 6000;

          points.push({ x: svgX, y: svgY, index });
        }
      });

      setDynamicPathPoints(points);
    };

    // Calculate positions after cards are rendered
    const timeoutId = setTimeout(() => {
      calculateTitlePositions();
    }, 1000);

    // Recalculate on window resize
    window.addEventListener('resize', calculateTitlePositions);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateTitlePositions);
    };
  }, [paragraphData]);

  // Title animation is now handled by ScrollReveal component

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate company names character by character
      gsap.utils.toArray(".company-name").forEach((name) => {
        // Split text into characters
        const text = name.textContent;
        name.innerHTML = text
          .split("")
          .join("");

        const chars = name.querySelectorAll(".char");

        gsap.fromTo(
          chars,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: name,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate descriptions word by word
      gsap.utils.toArray(".company-desc").forEach((desc) => {
        const text = desc.textContent.trim();
        const words = text.split(/\s+/);
        desc.innerHTML = words
          .map((word) => `<span className="word" style="display: inline-block; white-space: nowrap; margin-right: 0.25em;">${word}</span>`)
          .join(" ");

        const wordSpans = desc.querySelectorAll(".word");

        gsap.fromTo(
          wordSpans,
          {
            y: 20,
            opacity: 0,
            filter: "blur(5px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: {
              amount: 0.8,
              from: "start"
            },
            delay: 0.3,
            ease: "power1.out",
            scrollTrigger: {
              trigger: desc,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate role cards with stagger
      gsap.utils.toArray(".role-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate role and date
      gsap.utils.toArray(".company-role").forEach((role) => {
        gsap.fromTo(
          role,
          {
            x: -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: role,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".company-date").forEach((date) => {
        gsap.fromTo(
          date,
          {
            x: -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: date,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Section numbers - no animation
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animated SVG Path Progress
  useEffect(() => {
    const progressPath = progressPathRef.current;
    if (!progressPath) return;

    // Get path length
    const pathLength = progressPath.getTotalLength();
    pathLengthRef.current = pathLength;

    // Set initial state
    gsap.set(progressPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Get document height dynamically
    const getDocumentHeight = () => {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    };

    // Create scroll-triggered animation for the path
    gsap.to(progressPath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".experience-cards-container",
        start: "top 80%",
        end: "+=6500",
        scrub: 3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Animate experience points when line reaches them
          paragraphData.forEach((exp, i) => {
            const progress = self.progress;
            const pointProgress = (i + 1) / paragraphData.length;

            if (progress >= pointProgress - 0.1) {
              // Point is active - turn to shiny orange
              gsap.to(`.experience-point-glow-${i}`, {
                opacity: 0.6,
                scale: 1.3,
                duration: 0.2,
                ease: "power2.out",
              });
              gsap.to(`.experience-point-ring-${i}`, {
                opacity: 1,
                duration: 0.2,
              });
              gsap.to(`.experience-point-dot-${i}`, {
                opacity: 1,
                scale: 1.1,
                duration: 0.2,
              });
              gsap.to(`.experience-point-line-${i}`, {
                opacity: 0.8,
                duration: 0.2,
              });

              // Highlight the corresponding card
              const card = document.querySelectorAll('.experience-card')[i];
              if (card) {
                gsap.to(card, {
                  scale: 1,
                  duration: 0.3,
                });
              }
            } else {
              // Point is inactive - keep gray
              gsap.to(`.experience-point-glow-${i}`, {
                opacity: 0,
                scale: 1,
                duration: 0.15,
              });
              gsap.to(`.experience-point-ring-${i}`, {
                opacity: 0.3,
                duration: 0.15,
              });
              gsap.to(`.experience-point-dot-${i}`, {
                opacity: 0.3,
                scale: 0.8,
                duration: 0.15,
              });
              gsap.to(`.experience-point-line-${i}`, {
                opacity: 0,
                duration: 0.15,
              });

              // Slightly dim the corresponding card
              const card = document.querySelectorAll('.experience-card')[i];
              if (card) {
                gsap.to(card, {
                  scale: 0.98,
                  duration: 0.3,
                });
              }
            }
          });
        },
      },
    });
  }, []);

  return (
    <Curve>
      <div className="cursor-default page relative   min-h-screen" style={{ minHeight: '100vh' }}>
        <Navbar />
        {/* Animated SVG Path */}
        <svg
          className="dynamic-svg-path absolute left-0 top-0 pointer-events-none "
          width="100%"
          height="200%"
          viewBox="0 0 1178 5355"
          preserveAspectRatio="xMidYMin meet"
          style={{ zIndex: 0 }}
        >
          <defs>
            {/* Orange gradient */}
            <linearGradient id="experienceLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="1" />
              <stop offset="33%" stopColor="#EA580C" stopOpacity="1" />
              <stop offset="66%" stopColor="#DC2626" stopOpacity="1" />
              <stop offset="100%" stopColor="#B91C1C" stopOpacity="1" />
            </linearGradient>

            {/* Enhanced glow filter */}
            <filter id="experienceGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pulse animation for points */}
            <filter id="pointGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background curved dotted path */}
          <path
            d={pathData}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            strokeLinecap="round"
          />

          {/* Animated curved progress path with glow */}
          <path
            ref={progressPathRef}
            d={pathData}
            stroke="url(#experienceLineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#experienceGlow)"
          />
        </svg>




        {/* Hero Section */}
        <div className="pt-32 pb-20 px-[1rem] lg:px-[5rem]">
          <div className="pt-12 pb-7 ">
            <ScrollReveal
              baseOpacity={0.1}
              delay={1}
              enableBlur={true}
              baseRotation={5}
              duration={1}
              blurStrength={8}
              containerClassName="overflow-hidden"
              textClassName="works-title text-5xl md:text-6xl lg:text-8xl font-cabinetGrotesk leading-tight  text-black"
            >
              Experience
            </ScrollReveal>
            <div className="text-lg md:text-2xl text-gray-600 leading-relaxed  font-cabinetGrotesk max-w-3xl">
              <p className="mb-1">
                Explore my journey and the technologies that define my craft.
              </p>
            </div>
          </div>
          {/* <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={5}
              blurStrength={8}
              containerClassName="overflow-hidden"
              textClassName="experience-title font-righteous text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight text-black"
            >
            Experience
          </ScrollReveal> */}
          <div className="mt-4 overflow-hidden">
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
              E.01 - E.0{paragraphData.length}
            </p>
          </div>
        </div>

        {/* Experience Cards */}
        <div ref={containerRef} className="experience-cards-container relative space-y-0">



          {paragraphData.map((company, index) => (
            <div
              key={index}
              className=" font-cabinetGrotesk  relative min-h-screen flex items-center justify-center  py-20"
            >
              <div className="w-full px-[1rem] lg:px-[5rem]"
              >
                {/* Company Header */}
                <div className="p-8 lg:p-12 border-b  border-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="section-number text-6xl lg:text-8xl font-bold   ">
                        E.0{index + 1}
                      </div>
                      <div>
                        <h2
                          className="company-name font-righteous text-4xl lg:text-6xl font-bold mb-2 text-black"
                        >
                          {company.companyName}
                        </h2>
                        <p className="company-role text-gray-500 text-sm lg:text-base uppercase tracking-wider">
                          {company.role}
                        </p>
                        <p className="company-date text-gray-400 text-xs lg:text-sm mt-1">
                          {company.date}
                        </p>
                      </div>
                    </div>

                    {/* Company Logo */}
                    <div
                      className="w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center bg-white shadow-lg border-4 border-gray-300"
                    >
                      <img
                        src={company.logo}
                        alt={company.companyName}
                        className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <p className="company-desc text-lg lg:text-xl text-gray-700 leading-relaxed">
                      {company.desc}
                    </p>

                  </div>

                  {/* Roles Grid */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-black uppercase tracking-wide">
                      Key Responsibilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {company.roles.map((role, roleIndex) => (
                        <div
                          key={roleIndex}
                          className="role-card flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-black"
                          ></div>
                          <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                            {role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </Curve>
  );
}

export default Page;
