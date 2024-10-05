"use client";

import Navbar from "../componet/Navbar";
import Hero1 from "../sections/Hero1";
import AboutMe from "../sections/AboutMe";
import { useEffect, useState } from "react";
import Works from "../sections/Works";
import Teches from "../sections/Teches";
import Footer from "../componet/Footer/Footer";
import FAQ from "../sections/FAQ.jsx";
import SlidingBars from "../componet/Home/SlidingBars";
import Curve from "@/componet/UI/NavCurve";
import CursorMask from "@/componet/UI/CursorMask";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  return (
    <Curve>
      <div className=" home   bg-main  relative  flex flex-col overflow-y-hidden h-full ">
        {/* <CursorMask /> */}
        <Navbar />
        <Hero1 />
        <AboutMe />
        <Works />
        <SlidingBars />
        {/* <Teches /> */}
        <FAQ />
        <Footer />
      </div>
    </Curve>
  );
};

export default Home;
