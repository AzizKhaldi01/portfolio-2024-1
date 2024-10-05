"use client";
import styles from "./CustomCursor.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "@/Hooks/useMosePosition";

export default function CustomCursor({ elementRef }) {
  const [isHovering, setIsHovering] = useState(false); // State to track if hovering
    const [x, setX] = useState();
    const [y, setY] = useState();
//   const { x, y } = useMousePosition();
  const size = isHovering ? 400 : 40;

  console.log("isHovering");
  console.log(isHovering);

  useEffect(() => {
    const element = elementRef.current;

    const handleMouseEnter = () => {
      setIsHovering(true); // Cursor enters the element
    };

    const handleMouseLeave = () => {
      setIsHovering(false); // Cursor leaves the element
    };

    const handleMouseMove = (event) => {
      setX(event.clientX); // Update X position
      setY(event.clientY); // Update Y position
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    // Clean up the event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [elementRef]);
  return (
    <motion.div
      className={styles.mask}
      animate={{
        scale:isHovering ? 2 : 1,
        mixBlendMode:"difference",
        y:y,
        x:x,
      }}
      transition={{ type: "tween", duration: 0.5 }}
    ></motion.div>
  );
}
