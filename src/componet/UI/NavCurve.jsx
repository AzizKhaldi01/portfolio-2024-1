"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { text, curve, translate } from "./anim";
import styles from "./curve.module.css";
import { useRouter } from "next/router";

const routes = {
  "/": "Home",
  "/about-me": "About",
  "/contact": "Contact",
  "/works": "Work",
  "/expereince": "Expereince",
};

const anim = (variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export default function Curve({ children, backgroundColor }) {
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });
  const router = useRouter();

  // Get the current route
  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="page curveRoute  relative " style={{ backgroundColor }}>
      <div
        style={{
          opacity: dimensions.width == null ? 1 : 0,
          zIndex: dimensions.width == null ? 100 : -100,
        }}
        className={`    ${styles.background}   h-[100vh] w-full fixed top-0  z-50 right-0 bg-[#111111]`}
      />

      <div className=" overflow-hidden">
        <motion.p
          {...anim(text)}
          className={
            " fixed top-[40%]  font-righteous translate-x-[50%] translate-y-[40%] right-[50%] z-[100000] text-6xl text-white "
          }
        >
          {routes[router.pathname]}
        </motion.p>
      </div>
      {dimensions.width != null && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg
      style={{
        position: "fixed",
        height: "calc(100vh + 600px)",
        width: "100vw",
        zIndex: 70,
        fill: "#111111",
        pointerEvents: "none",
        left: 0,
        top: "-300px",
      }}
      {...anim(translate)}
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
