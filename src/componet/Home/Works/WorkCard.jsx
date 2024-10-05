import React, { useEffect, useRef, useState } from "react";
import GrayLine from "../../../componet/UI/GrayLine.jsx";
import { motion, AnimatePresence } from "framer-motion";
import CursorBtn from "../../UI/CursorBtn.jsx";
import Link from "next/link.js";

function WorkCard({ BgColor, title, img, time, UrlLink }) {
  const ElementRef = useRef();

  return (
    <Link target="_blank" href={UrlLink} ref={ElementRef} className="relative">
      <div className=" targetItema  item cursor-pointer flex    flex-col w-full h-full">
        <span className="rounded-md  lg:h-[60vh] h-[20rem] bg-opacity-50 bg-black">
          <img
            className=" object-cover rounded-md w-full h-full"
            src={img?.src}
            alt=""
          />
        </span>
        <div className="w-full flex flex-col gap-2 pt-5">
          <GrayLine />
          <div className="flex text-gray-600 text-sm px-1 justify-between w-full">
            <h1>{title}</h1>
            <h1>{time}</h1>
          </div>
        </div>
      </div>

      <CursorBtn elementRef={ElementRef} />
      {/* Custom Cursor */}
    </Link>
  );
}

export default WorkCard;
