"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Curve from "../componet/Home/Works/Curve";
import PageTitle from "../componet/UI/PageTitle";
import ftrClint from "../assest/Images/work/ftrClint.png";
import superhost from "../assest/Images/work/superhost.png";
import fintecracy from "../assest/Images/work/fintecracy.png";
import WorkCard from "../componet/Home/Works/WorkCard";
import Magnetic from "../componet/gsap/Magnetic";
import Link from "next/link";
import WorkDsiplay from "../componet/Home/Works/WorkDsiplay";
import { motion } from "framer-motion";
import ButtonEffect from "../componet/UI/ButtonEffect";
import ArrowIcon from "@/assest/Icons/ArrowIcon";

const worksObj = [
  {
    title: "Fintechracy",
    time: 2023,
    bg: " bg-[#51c18f]",
    Link: "https://fintechracy.org/",
    color: "text-[#51c18f]",
    img: fintecracy,
  },
  {
    title: "SuperHost",
    time: 2023,
    bg: "bg-[#ff5a5f]",
    Link: "https://superhost.com.tn/",
    color: "text-[#ff5a5f]",
    img: superhost,
  },
  {
    title: "FTR-Client",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://ftrclient.fintechracy.org/",
    color: "text-[#51c18f]",
    img: ftrClint,
  },
];

function Works() {
  const worksRef = useRef(null);

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

      tl.fromTo(
        [
          section.querySelector("h1"),
          ...section.querySelectorAll(".works_button"),
        ],
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
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="works font-righteous relative bg-main mt-5   flex items-center flex-col"
      ref={worksRef}
    >
      <div className="Pinnedworks gap-20  relative overflow-hidden w-full py-16 pt-24   ">
        <PageTitle title={"My Work"} />

        {worksObj.map((item) => (
          <WorkDsiplay item={item} />
        ))}
      </div>

      <Magnetic>
        <Link href={"/works"}>
          <ButtonEffect
            strength={3.7}
            Style={
              "  lg:px-[2rem]  px-[2.8rem]    py-4   lg:py-5     border-2 border-sec text-sec hover:border-0  lg:text-2xl text-lg text-black   "
            }
          >
            <span className=" flex items-center  gap-1">
              More <ArrowIcon />
            </span>
          </ButtonEffect>
        </Link>
      </Magnetic>
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
