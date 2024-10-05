import React from "react";
import { motion } from "framer-motion";
import MagneticWrapper from "../gsap/Magnetic";

function ButtonEffect({ children, Style, type, disabled }) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      initial="initial"
      whileHover="hovered"
      transition={{
        staggerChildren: 0.012,
      }}
      className={` ${Style} cursor-pointer px-6 py-3 rounded-full  w-fit  relative overflow-hidden`}
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: "-120%" },
        }}
        transition={{
          duration: 0.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        className=" inline-block  "
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          initial: { y: "100%", scale: 0.3 },
          hovered: { y: 0, scale: 1 },
        }}
        transition={{
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="  text-white  flex items-center rounded-full justify-center absolute  bg-thr inset-0"
      >
        <MagneticWrapper>
          <div>{children}</div>
        </MagneticWrapper>
      </motion.div>
    </motion.button>
  );
}

export default ButtonEffect;
