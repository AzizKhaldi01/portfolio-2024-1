"use client";

import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageTitle from "../../componet/UI/PageTitle";
import WorkCard from "../../componet/Home/Works/WorkCard";
import Curve from "../../componet/UI/NavCurve";
import { worksObj } from "../../assest/data/WorkObj";
import Footer from "../../componet/Footer/Footer";
import Navbar from "../../componet/Navbar";
import CustomCursor from "@/components/UI/CustomCursor";

function Page() {
  const worksRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.7,
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <Curve>
      <div
        className="works cursor-default overflow-hidden relative pb-20 bg-main flex items-center flex-col"
        ref={worksRef}
      >
        <Navbar />
        <PageTitle title={"my work"} />
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 w-full lg:px-[7%] px-[1rem]`}
        >
          {worksObj.map((item) => (
            <motion.div
              key={item?.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 1 }}
              viewport={{ once: true }}
            >
              <WorkCard
                BgColor={item.bg}
                title={item?.title}
                img={item?.img}
                time={item.time}
                UrlLink={item.Link}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </Curve>
  );
}

export default Page;
