"use client";
import React from "react";
import { motion } from "framer-motion";

function HoverFlipText({ children, isHovered, className = "" }) {
  return (
    <motion.div
      animate={isHovered ? "hovered" : "initial"}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: "-100%" },
        }}
        className="inline-block"
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          initial: { y: "100%" },
          hovered: { y: 0 },
        }}
        className="absolute inset-0 inline-block"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default HoverFlipText;

