import React, { useEffect, useRef, useState } from "react";
import CursorBtn from "../../UI/CursorBtn";
import Magnetic from "../../../componet/gsap/Magnetic";
import Link from "next/link";

function WorkDsiplay({ item }) {
  const cardRef = useRef(null);

  return (
    <div className="   animate-section flex mt-8  font-bold items-center justify-center h-screen relative">
      <Link
        href={item?.Link}
        ref={cardRef}
        target="_blank"
        className="relative cursor-pointer target  Item z-50"
      >
        <img
          className="opacity-90 cursor-pointer md:scale-110 scale-150 w-full md:h-[80vh]  sm:h-[45vh]  z-30"
          src={item.img?.src}
          alt={item?.title}
        />
        <CursorBtn elementRef={cardRef} Bg={item.bg} />
      </Link>
      <div className="  cursor-default   top-[12%] md:top-[0%]  right-[50%] translate-x-[50%] transform absolute ">
        <h1
          className={`  work_title lg:text-[10rem] md:text-[6rem] text-[4rem] ${item.color} font-righteous whitespace-nowrap  `}
        >
          {item.title}
        </h1>
      </div>

      <Magnetic>
        <Link
          style={{
            y: 50,
          }}
          className={` works_button   opacity-50 lg:hidden btn absolute z-50 bottom-10 right-10 flex items-center justify-center h-[8rem]   w-[8rem] ${item.bg} text-white rounded-[50%] `}
          key={item.Link}
          target="_blank"
          href={item.Link}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Link>
      </Magnetic>
    </div>
  );
}

export default WorkDsiplay;
