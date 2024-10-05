import React from "react";
import { motion } from "framer-motion";

function FlipLink({ children }) {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      transition={{
        staggerChildren: 0.012,
      }}
      className="  relative overflow-hidden "
    >
      <div className=" inline-block ">
        {children.split("").map((child) => (
          <motion.div
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            className="inline-block"
          >
            {child}
          </motion.div>
        ))}
      </div>

      <div className=" absolute    text-thr   inset-0">
        {children.split("").map((child) => (
          <motion.div
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            className="inline-block"
          >
            {child}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default FlipLink;
