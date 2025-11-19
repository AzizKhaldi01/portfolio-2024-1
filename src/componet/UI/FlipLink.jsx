import React, { useState } from "react";
import { motion } from "framer-motion";

function FlipLink({ children, isHovered }) {
  const [internalHovered, setInternalHovered] = useState(false);
  
  // Use isHovered prop if provided, otherwise use internal hover state
  const isActive = isHovered !== undefined ? isHovered : internalHovered;

  return (
    <motion.div
      animate={isActive ? "hovered" : "initial"}
      transition={{
        staggerChildren: 0.005,
      }}
      className="relative overflow-hidden select-none cursor-pointer"
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
    >
      <div className="inline-block">
        {children.split("").map((child, index) => (
          <motion.span
            key={`flip-top-${index}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{ duration: !isHovered ? 0.3 : 0.005 }}
            className="inline-block whitespace-pre"
          >
            {child}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((child, index) => (
          <motion.span
            key={`flip-bottom-${index}`}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="inline-block whitespace-pre"
          >
            {child}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default FlipLink;
