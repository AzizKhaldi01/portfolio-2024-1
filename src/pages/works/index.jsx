"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Curve from "../../componet/UI/NavCurve";
import { worksObj } from "../../assest/data/WorkObj";
import Footer from "../../componet/Footer/Footer";
import Navbar from "../../componet/Navbar";
import ScrollReveal from "../../componet/gsap/ScrollReveal";
import Link from "next/link";
import FlowingMenu from "../../componet/UI/FlowingMenu";
import Projects from "@/componet/Projects";
import WordAnimation from "@/components/UI/WordAnimation";
import ProjectCard from "@/componet/UI/ProjectCard";

function Page() {
  const worksRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState(() => {
    // Set default based on screen size
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 'flowing' : 'grid';
    }
    return 'grid';
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  // Update view mode on resize
  useEffect(() => {
    const handleResize = () => {
      const newMode = window.innerWidth >= 768 ? 'flowing' : 'grid';
      setViewMode(newMode);
    };

    // Only set initial mode, don't listen to resize after user interaction
    if (typeof window !== 'undefined') {
      const initialMode = window.innerWidth >= 768 ? 'flowing' : 'grid';
      setViewMode(initialMode);
    }
  }, []);

  // Title animation is now handled by ScrollReveal component

  useEffect(() => {
    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.6,
        duration: 0.6,
        stagger: 0.06,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <Curve>
      <div
        className="works cursor-default overflow-hidden relative pb-20 bg-main flex  flex-col"
        ref={worksRef}
      >
        <Navbar />
        {/* Title Section */}
        <div className="pt-12 pb-7 px-[1rem] lg:px-[2rem]">
          <WordAnimation
            className="works-title text-5xl md:text-6xl lg:text-8xl font-cabinetGrotesk leading-tight  text-black"
            stagger={0.05}
            once={true}
            delay={1.2}
            text="My Work"
          />
          <div className=" text-lg md:text-xl leading-relaxed max-w-3xl font-cabinetGrotesk">
            <WordAnimation
              delay={1.2}
              once={true}
              stagger={0.02}
              text="Discover my latest projects—where design, technology, and creativity come together to craft engaging digital experiences. Below is a collection of my favourites."
            />

          </div>

        </div>

        {/* View Toggle Buttons */}
        <div className="flex justify-end gap-3 pb-10 px-[1rem] lg:px-[2rem]">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-full font-semibold transition-all duration-300 ${viewMode === 'grid'
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
            className={`p-3 rounded-full font-semibold transition-all duration-300 ${viewMode === 'flowing'
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
          <div className="pt-10 pb-44 w-full lg:px-[2rem] px-[1rem]">
            <FlowingMenu height={100} items={worksObj.map(item => ({
              link: `/project/${item.slug}` || "#",
              text: item.title,
              image: item.img?.src || item.img
            }))} />
          </div>
        ) : (
          <div className="pt-10 w-full lg:px-[2rem] px-[1rem]">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {worksObj.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Curve>
  );
}

export default Page;
