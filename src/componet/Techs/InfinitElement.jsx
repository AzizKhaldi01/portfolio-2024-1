import { useTransform, motion } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
function InfinitElement({ data, x }) {
  const scrollContainer = useRef(null);

  return (
    <motion.div
      style={{ x: x }}
      ref={scrollContainer}
      className="flex items-center   font-Megrim   lg:text-[1.7rem] text-[1.2rem]  text-gray-800  gap-6 w-max relative"
    >
      <div className="flex items-center  whitespace-nowrap right-[100%] gap-2">
        {data.map((tech, index) => (
          <Item tech={tech} index={index} />
        ))}
      </div>

      <div className="flex items-center whitespace-nowrap absolute top-0  right-[100%] gap-2">
        {data.map((tech, index) => (
          <Item tech={tech} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function Item({ tech, index   }) {
  return (
    <div key={index} className="flex items-center  whitespace-nowrap rounded-full p-2   ">
      <h1 className=" flex  gap-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#5E5D5D"
          fill="none"
        >
          <path
            d="M3 12C7.5 12 12 7.5 12 3C12 7.5 16.5 12 21 12C16.5 12 12 16.5 12 21C12 16.5 7.5 12 3 12Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M2 19.5C2.83333 19.5 4.5 17.8333 4.5 17C4.5 17.8333 6.16667 19.5 7 19.5C6.16667 19.5 4.5 21.1667 4.5 22C4.5 21.1667 2.83333 19.5 2 19.5Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M16 5C17 5 19 3 19 2C19 3 21 5 22 5C21 5 19 7 19 8C19 7 17 5 16 5Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>{" "}
        {tech.name}{" "}
      </h1>
    </div>
  );
}

export default InfinitElement;
