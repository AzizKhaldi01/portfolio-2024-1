import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from './SVG.module.css'
import gsap from "gsap";
import useWindowSize from "@/Hooks/useWindowSize";

export default function Curve({ section, mainColor, end, start }) {
  const svgRef = useRef(null);
  const windowSize = useWindowSize()
    const initialPath = `M0 50 Q${windowSize.width / 2} 150 ${windowSize.width} 50 L${windowSize.width} 0 L0 0 Z`;
    const targetPath = `M0 50 Q${windowSize.width / 2} 50 ${windowSize.width} 50 L${windowSize.width} 0 L0 0 Z`

  useEffect(() => {
    gsap.to(svgRef.current, {
      scrollTrigger: {
        trigger: section,
        start: start || "top 50%",
        end: end || "bottom top",
        scrub: true,
      },
      attr: { d: targetPath },
      duration: 1,
    });
  }, []);

  return (
    <svg
      className={ styles.svgCurve `svgCurve   w-full z-[40]    ${
        mainColor ? "fill-main" : "fill-sec"
      } `}
    >
      <path ref={svgRef} d={initialPath}></path>
    </svg>
  );
}
