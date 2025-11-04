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
        delay: 0.7,
        duration: 0.4,
        stagger: 0.05,
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
          <ScrollReveal
            baseOpacity={0.1}
            delay={0.5}
            enableBlur={true}
            baseRotation={5}
            duration={1}
            blurStrength={8}
            containerClassName="overflow-hidden"
            textClassName="works-title text-5xl md:text-6xl lg:text-8xl font-cabinetGrotesk leading-tight text-black "
          >
            My Work
          </ScrollReveal>
          <div className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl font-cabinetGrotesk">
            <p className="mb-1">
              Discover my latest projects—where design, technology, and creativity come together to craft engaging digital experiences. Below is a collection of my favourites. 
            </p>
          </div>

        </div>

        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap gap-3 px-[1rem] lg:px-[2rem]">
          {['all', 'web', 'native app', 'prototyping', 'saas'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-green-200 text-black'
                  : 'bg-transparent text-black border-2 border-dashed border-gray-400 hover:border-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div> */}

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
            {/* Filtered Projects */}
            {(() => {
              const filteredWorks = activeFilter === 'all'
                ? worksObj
                : worksObj.filter(item => item.category === activeFilter);

              // Show first 3 projects prominently
              const featuredWorks = filteredWorks.slice(0, 3);
              const remainingWorks = filteredWorks.slice(3);

              return (
                <>
                  {/* Featured Three Cards Layout */}
                  {featuredWorks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                      {featuredWorks.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 100 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <Link
                            href={`/project/${item.slug || slugify(item.title)}`}
                            className="block relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 shadow-lg"
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                          >
                            {/* Category Tag */}
                            <div className="absolute top-4 left-4 z-10">
                              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                                {item.category}
                              </span>
                            </div>

                            <img
                              src={item.img?.src || item.img}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <div className="text-left px-2">
                            <h3 className="text-2xl font-cabinetGrotesk font-bold text-black mb-2 group-hover:text-gray-600 transition-colors leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 font-cabinetGrotesk text-sm leading-relaxed">
                              {item.description || `${item.time} • Creative Project`}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Additional Projects Grid */}
                  {remainingWorks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {remainingWorks.map((item, index) => (
                        <motion.div
                          key={index + 3}
                          initial={{ opacity: 0, y: 100 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <Link
                            href={item.Link || "#"}
                            className="block relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 shadow-lg"
                            onMouseEnter={() => setHoveredProject(index + 3)}
                            onMouseLeave={() => setHoveredProject(null)}
                          >
                            <img
                              src={item.img?.src || item.img}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <div className="text-left px-2">
                            <h3 className="text-xl font-cabinetGrotesk font-bold text-black mb-2 group-hover:text-gray-600 transition-colors leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 font-cabinetGrotesk text-sm leading-relaxed">
                              {item.description || `${item.time} • Creative Project`}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* No results message */}
                  {filteredWorks.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-gray-500 text-lg">No projects found for this category.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
      <Footer />
    </Curve>
  );
}

export default Page;
