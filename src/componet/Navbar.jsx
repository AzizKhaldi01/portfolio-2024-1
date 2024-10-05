import React from "react";
import { usePathname } from "next/navigation"; // Use usePathname for App Router
import Sidebar from "./Navigation/SidBar";
import Logo from "../sections/Logo";
import Link from "next/link";
import { motion } from "framer-motion";
import FlipLink from "./UI/FlipLink";
import Magnetic from "../componet/gsap/Magnetic";

function Navbar({style , whiteLogo}) {
  const pathname = usePathname(); // Get the current path
  
  const Links = [
    {
      text: "Home",
      Link: "/",
    },
    {
      text: "About",
      Link: "/about-me",
    },
    {
      text: "Works",
      Link: "/works",
    },
    {
      text: "Expereince",
      Link: "/expereince",
    },
    {
      text: "Contact",
      Link: "/contact",
    },
 
  ];

  const linkVariants = {
    hidden: { y: 115, rotate: 20 },
    visible: { y: 0, rotate: 0, opacity: 1 },
    exit: { y: 115, rotate: 20 },
  };

  return (
    <div className={` ${style} w-full justify-between items-center flex z-[60] p-4 lg:p-8 pt-[1.5rem] lg:pt-[3rem]`}>
      <Logo whiteLogo={whiteLogo} />

      <div className="hidden lg:flex items-end w-full gap-6 justify-end">
        {Links.map((link) => {
          const isActive = pathname === link.Link; // Check if the current path matches the link
          return (
            <Magnetic key={link.text}>
              <Link href={link.Link} prefetch={true}>
                <motion.div
                  className={`${
                    link.text === "Contact" ? "hidden" : ""
                  } overflow-hidden cursor-pointer duration-150 font-Megrim font-bold text-xl 
                    ${
                      isActive ? "  text-gray-400 " : "hover:text-gray-400"
                    }`} // Add active class when the link is the current page
                >
                  <motion.div
                    variants={linkVariants}
                    initial="hidden"
                    transition={{
                      duration: 1.5,
                      delay: 0.2,
                      ease: [0.76, 0, 0.24, 1],
                      staggerChildren: 0.3,
                    }}
                    animate="visible"
                    exit="exit"
                    className="Navtext"
                  >
                    <FlipLink>{link.text}</FlipLink>
                  </motion.div>
                </motion.div>
              </Link>
            </Magnetic>
          );
        })}
      </div>
      <Sidebar Links={Links} />
    </div>
  );
}

export default Navbar;
