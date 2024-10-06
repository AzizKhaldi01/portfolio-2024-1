"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./menu.module.css";

import Curve from "./Curve";
import gsap from "gsap";
import Link from "next/link";
import FlipLink from "../UI/FlipLink";
import Magnetic from "../../componet/gsap/Magnetic";
import SocialsLine from "../UI/SocialsLine";
import GrayLine from "../UI/GrayLine";

function Sidebar({ Links }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollPosition = window.scrollY;

    if (isOpen && scrollPosition < 200) {
      setIsVisible(true);
    } else if (scrollPosition < 200) {
      setIsVisible(false);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Trigger appearance when user scrolls down 200px
      if (scrollPosition > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  console.log("isOpen");
  console.log(isOpen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const linkVariants = {
    hidden: { y: 115, rotate: 20 },
    visible: { y: 0, rotate: 0, opacity: 1 },
    exit: { y: 0, rotate: 0 },
  };

  return (
    <div className=" p-3 ">
      <div
        onClick={toggleSidebar}
        className={`md:hidden block  absolute top-5 right-3   font-righteous px-3 py-2  ${
          isOpen ? " opacity-0" : " opacity-100"
        } z-[50]  `}
      >
        Menu
      </div>

      <div className="fixed  z-[40]  md:top-10 top-5  right-5 md:right-10 h-[3rem] rounded-[50%] w-[3rem] flex items-center justify-center">
        <AnimatePresence>
          <Magnetic style={{ zIndex: 100 }}>
            <div>
              {isVisible && (
                <motion.div
                  className={` items-center p-2  rounded-[50%] justify-center ${
                    isOpen ? " bg-transparent " : "bg-[#cdcdcd]"
                  } `}
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <label
                    checked={isOpen}
                    onChange={toggleSidebar}
                    className={` ${styles.hamburger}  hamburger   ${
                      isOpen ? "stroke-white" : "stroke-black"
                    }    z-[60]`}
                  >
                    <input checked={isOpen} id="hamburger" type="checkbox" />
                    <svg viewBox="0 0 32 32">
                      <path
                        className={` ${styles.lineTopBottom}  ${styles.line}   bg-white`}
                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                      ></path>
                      <path className={styles.line} d="M7 16 27 16"></path>
                    </svg>
                  </label>
                </motion.div>
              )}
            </div>
          </Magnetic>
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              onClick={toggleSidebar}
              className="  fixed top-0 right-0 h-full w-full bg-black   z-10 opacity-50 "
            ></motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "calc(100%  + 100px)" }}
              animate={{ x: 0 }}
              exit={{ x: "calc(100%  + 100px)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className=" h-full   w-full sm:w-[75%] md:w-[60%] lg:w-[40%] xl:w-[35%]   z-50 fixed top-0 right-0  bg-sec"
            >
              <Curve />
              <div className="p-4 py-8 pb-16 px-10 flex flex-col h-full justify-between">
                <div className=" text-white  items-s justify-center  pt-28 flex flex-col gap-5 ">
                  {Links.map((link, index) => (
                    <Link
                      onClick={toggleSidebar}
                      key={link.text}
                      href={link.Link}
                    >
                      <motion.div className="overflow-hidden cursor-pointer hover:text-gray-400 duration-150 font-righteous font-bold text-5xl md:text-6xl">
                        <motion.div
                          variants={linkVariants}
                          initial="hidden"
                          transition={{
                            duration: 1.5,
                            ease: [0.76, 0, 0.24, 1],
                            staggerChildren: 0.15,
                          }}
                          animate="visible"
                          exit="exit"
                          className="Navtext"
                        >
                          <FlipLink>{link.text}</FlipLink>
                        </motion.div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                <div className=" w-full flex gap-5 flex-col">
                  <GrayLine />
                  <SocialsLine />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Sidebar;
