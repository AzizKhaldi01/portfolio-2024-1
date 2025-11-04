"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Curve from "../componet/Home/Works/Curve";
import PageTitle from "../componet/UI/PageTitle";
import ftrClint from "../assest/Images/work/ftrClint.png";
import superhost from "../assest/Images/work/superhost.png";
import fintecracy from "../assest/Images/work/fintecracy.png";
import vexlogicbusiness from "../assest/Images/work/p-vexlogic-business-expander.jpg";
import vexlogicaiassistant from "../assest/Images/work/p-vexlogic-ai-assistant.jpg";
import comra from "../assest/Images/work/p-comra.jpg";
import WorkCard from "../componet/Home/Works/WorkCard";
import Magnetic from "../componet/gsap/Magnetic";
import Link from "next/link";
import WorkDsiplay from "../componet/Home/Works/WorkDsiplay";
import { motion } from "framer-motion";
import ButtonEffect from "../componet/UI/ButtonEffect";
import ArrowIcon from "@/assest/Icons/ArrowIcon";
import ScrollReveal from "../componet/gsap/ScrollReveal";
import WordAnimation from "../components/UI/WordAnimation";
import HoverFlipText from "../components/UI/HoverFlipText";
import FlowingMenu from "../componet/UI/FlowingMenu";
// Generate a URL-friendly slug from a project title
const slugify = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const worksObj = [
  {
    title: "VexLogic ai assistant",
    time: 2023,
    bg: "bg-[#ff5a5f]",
    Link: "https://vexlogic.ai/",
    color: "text-[#ff5a5f]",
    img: vexlogicaiassistant,
  },
  {
    title: "VexLogic bussiness expender",
    time: 2023,
    bg: " bg-[#51c18f]",
    Link: "https://vexlogic.com/",
    color: "text-[#51c18f]",
    img: vexlogicbusiness,
  },

  {
    title: "Comra",  
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://comra.ai/",
    color: "text-[#51c18f]",
    img: comra,
  },
];

function Works() {
  const worksRef = useRef(null);
  const [hoveredProject, setHoveredProject] = React.useState(null);
  const [viewMode, setViewMode] = React.useState(() => {
    // Set default based on screen size
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 'flowing' : 'grid';
    }
    return 'grid';
  });

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Set initial view mode based on screen size
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialMode = window.innerWidth >= 768 ? 'flowing' : 'grid';
      setViewMode(initialMode);
    }
  }, []);
  useEffect(() => {
    const sections = gsap.utils.toArray(".animate-section");
    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      // Only animate the works_button elements since h1 is now handled by ScrollReveal
      const worksButtons = section.querySelectorAll(".works_button");
      if (worksButtons.length > 0) {
        tl.fromTo(
          worksButtons,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="works-section works font-righteous relative mt-10  py-20 px-[1rem] md:px-[6rem] "
      ref={worksRef}
    >
      {/* Projects Grid */}
      <div className="max-w-[90vw] mx-auto">
        <WordAnimation
          text="Featured Projects"
          className="font-cabinetGrotesk text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight text-black"
          trigger=".works-section"
          start="top 80%"
          end="bottom 20%"
          stagger={0.1}
          delay={0}
        />
        
          <WordAnimation
            text="Discover my latest work and creative solutions that bring ideas to life"
            className="text-left text-black/70 text-base md:text-lg mb-6 max-w-3xl"
            trigger=".works-section"
            start="top 80%"
            end="bottom 20%"
            stagger={0.01}
            delay={0}
          />

        {/* View Toggle Buttons */}
        <div className="flex justify-end gap-3 mb-10">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
            title="Grid View"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            onClick={() => setViewMode('flowing')}
            className={`p-3 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'flowing'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
            title="Flowing View"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content Area - Conditional Rendering */}
        {viewMode === 'flowing' ? (
          <div style={{ height: '500px', position: 'relative' }}>
            <FlowingMenu height={120} items={worksObj.slice(0, 3).map(item => ({
              link: item.Link || "#",
              text: item.title,
              image: item.img?.src || item.img
            }))} />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Project 1 - Full Width Top Card */}
            <div className="group">
              <Link 
                href={`/project/${worksObj[0]?.slug || slugify(worksObj[0]?.title)}`} 
                className="block relative overflow-hidden rounded-xl  lg:aspect-[21/9] aspect-[4/3] mb-4"
                onMouseEnter={() => setHoveredProject(0)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <img 
                  src={worksObj[0]?.img?.src || worksObj[0]?.img}
                  alt={worksObj[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="text-left">
                <HoverFlipText 
                  isHovered={hoveredProject === 0}
                  className="text-xl md:text-2xl font-bold text-black lg:mb-2 mb-0"
                >
                  {worksObj[0]?.title}
                </HoverFlipText>
                <HoverFlipText 
                  isHovered={hoveredProject === 0}
                  className="text-black/70"
                >
                  AI-powered assistant for modern businesses
                </HoverFlipText>
              </div>
            </div>

            {/* Bottom Two Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Project 2 - Bottom Left */}
              <div className="group">
                <Link 
                  href={`/project/${worksObj[1]?.slug || slugify(worksObj[1]?.title)}`} 
                  className="block relative overflow-hidden rounded-xl aspect-[4/3] mb-4"
                  onMouseEnter={() => setHoveredProject(1)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img 
                    src={worksObj[1]?.img?.src || worksObj[1]?.img}
                    alt={worksObj[1]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                </Link>
                <div className="text-left">
                  <HoverFlipText 
                    isHovered={hoveredProject === 1}
                    className="text-xl md:text-2xl font-bold text-black lg:mb-2 mb-0"
                  >
                    {worksObj[1]?.title}
                  </HoverFlipText>
                  <HoverFlipText 
                    isHovered={hoveredProject === 1}
                    className="text-black/70"
                  >
                    Business expansion and growth solutions
                  </HoverFlipText>
                </div>
              </div>

              {/* Project 3 - Bottom Right */}
              <div className="group">
                <Link 
                  href={`/project/${worksObj[2]?.slug || slugify(worksObj[2]?.title)}`} 
                  className="block relative overflow-hidden rounded-xl aspect-[4/3] mb-4"
                  onMouseEnter={() => setHoveredProject(2)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img 
                    src={worksObj[2]?.img?.src || worksObj[2]?.img}
                    alt={worksObj[2]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                </Link>
                <div className="text-left">
                  <HoverFlipText 
                    isHovered={hoveredProject === 2}
                    className="text-xl md:text-2xl font-bold text-black lg:mb-2 mb-0"
                  >
                    {worksObj[2]?.title}
                  </HoverFlipText>
                  <HoverFlipText 
                    isHovered={hoveredProject === 2}
                    className="text-black/70"
                  >
                    Coming soon. Stay tuned!
                  </HoverFlipText>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Works;

{
  /* <div className={` grid grid-cols-1  md:grid-cols-3 gap-7 pt-10  px-[4.6rem] `}>
  {worksObj.map((item) => (
    <WorkCard
      key={item?.id} // Add a unique key if your items have an id or some unique identifier
      BgColor={item.bg}
      title={item?.title}
      img={item?.img}
      time={item.time}
    />
  ))}
</div> */
}
