import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import InfinitElement from "../componet/Techs/InfinitElement.jsx";
import { techs, techs1, techs2, techs3 } from "../assest/data/techs.js";
import { useScroll, useTransform } from "framer-motion";

function Teches() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className=" mb-10 h-full flex flex-col  items-center justify-center + bg-main overflow-hidden">
      <div
        ref={container}
        className=" flex flex-col py-4  relative w-full gap-8  overflow-hidden"
      >
        <InfinitElement data={techs} x={x} />
        <InfinitElement data={techs1} x={x1} />
        <InfinitElement data={techs2} x={x} />
        <InfinitElement data={techs3} x={x1} />

        <div className=" flex flex-row  justify-between absolute top-0 right-0 w-full h-full ">
          <div className=" h-full  w-[40%] bg-gradient-to-l from-transparent via-transparent to-main    "></div>
          <div className=" h-full  w-[40%] bg-gradient-to-r from-transparent via-transparent to-main    "></div>
        </div>
      </div>
    </div>
  );
}

export default Teches;
