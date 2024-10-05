import { useEffect, useState } from "react";
import styles from "./cursorStyle.module.css";
import { motion } from "framer-motion";
function CursorBtn({ elementRef, Bg }) {
  const [isHovering, setIsHovering] = useState(false); // State to track if hovering
  const [x, setX] = useState();
  const [y, setY] = useState();

  console.log("isHovering");
  console.log(isHovering);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const clientX = event.clientX;
      const clientY = event.clientY;
      setX(clientX);
      setY(clientY);

      checkHover(clientX, clientY);
    };

    const handleScroll = () => {
      // Re-check if the mouse is hovering after a scroll event
      checkHover(x, y); // Use the latest x and y state
    };

    const checkHover = (clientX, clientY) => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          setIsHovering(true); // Cursor is inside the element
        } else {
          setIsHovering(false); // Cursor is outside the element
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef, x, y]); // Dependencies include x and y

  return (
    <motion.div
      className={`fixed  hidden w-[100px] h-[100px]  rounded-[50%]  lg:flex items-center justify-center font-bold text-sm shadow-xl pointer-events-none ${
        Bg ? `${Bg} text-white` : "bg-thr text-white"
      }`}
      style={{
        left: `${x - 50}px`, // Adjust the offset to center the item on the cursor
        top: `${y - 50}px`,
      }}
      animate={{
        scale: isHovering ? 1 : 0.5, // Scale down slightly instead of 0 when not hovering for a subtle effect
        opacity: isHovering ? 1 : 0,
      }}
      transition={{
        type: "spring", // Use spring for a smooth follow effect
        stiffness: 300, // Control how fast the item follows the cursor
        damping: 30, // Controls the bounciness
        duration: 1, // Overall duration for animation
        opacity: { duration: 0.2 }, // Control opacity transition
      }}
    >
      View
    </motion.div>
  );
}

export default CursorBtn;
