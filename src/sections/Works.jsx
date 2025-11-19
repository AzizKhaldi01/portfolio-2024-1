"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/dist/ScrollTrigger";
import ButtonNew from "../componet/UI/ButtonNew";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import vexlogicaiassistant from "../assest/Images/work/p-vexlogic-ai-assistant.jpg";
import comra from "../assest/Images/work/p-comra.jpg";
import Link from "next/link";
import WordAnimation from "../components/UI/WordAnimation";
import HoverFlipText from "../components/UI/HoverFlipText";
import FlowingMenu from "../componet/UI/FlowingMenu";
import vexlogicbusiness from "../assest/Images/work/p-vexlogic-business-expander.jpg";
import superHostImage01 from "../assest/Images/work/super-host-phone.jpg";
import ProjectCard from "@/componet/UI/ProjectCard";
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
    slug: "vexlogic-ai-assistant",
    title: "VexLogic ai",
    time: 2023,
    Subtitle: "AI Assistant",
    bg: "bg-[#ff5a5f]",
    Link: "https://vexlogic.ai/",
    color: "text-[#ff5a5f]",
    img: vexlogicaiassistant,
  },
  {
    slug: "vexlogic-business-expender",
    title: "VexLogic bussiness",
    time: 2023,
    Subtitle: "Bussiness",
    bg: " bg-[#51c18f]",
    Link: "https://vexlogic.com/",
    color: "text-[#51c18f]",
    img: vexlogicbusiness,
  },

  {
    slug: "comra",
    title: "Comra",
    time: 2023,
    Subtitle: "3D Visualisation",
    bg: "bg-[#51c18f]",
    Link: "https://comra.ai/",
    color: "text-[#51c18f]",
    img: comra,
  },
  {
    slug: "superhost",
    title: "Superhost",
    time: 2024,
    Subtitle: "Property Booking",
    bg: "bg-[#51c18f]",
    Link: "https://superhost.com.tn/",
    color: "text-[#51c18f]",
    img: superHostImage01,
  },
];

function Works() {
  const worksRef = useRef(null);
  const [hoveredProject, setHoveredProject] = React.useState(null);
  const [viewMode, setViewMode] = React.useState("grid");

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


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
      className="works-section works font-righteous relative mt-10  px-[1rem] md:px-[4rem] "
      ref={worksRef}
    >
      {/* Projects Grid */}
      <div className="max-w-[90vw] mx-auto works-section">
        <WordAnimation
          text="Discover my latest work and creative solutions that bring ideas to life"
          className="text-sec lg:w-[70%] w-full  text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl  mb-8 sm:mb-12 leading-[1.1] lg:px-4 px-1"
          trigger=".works-section"
          start="top 90%"
          end="bottom 50%"
          stagger={0.015}
          delay={0.2}
        />

        
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
      <div className=" relative z-10 w-full mt-16 flex items-center justify-center ">
        <ButtonNew text="Check all projects" onClick={() => { window.location.href = "/works"; }} />
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
