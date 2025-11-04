"use client";

import Navbar from "../componet/Navbar";
import Hero1 from "../sections/Hero1";
import AboutMe from "../sections/AboutMe";
import { useEffect } from "react";
import Works from "../sections/Works";
import FAQ from "../sections/FAQ.jsx";
import SlidingBars from "../componet/Home/SlidingBars";
import Curve from "@/componet/UI/NavCurve";
import Footer from "../componet/Footer/Footer";
import SEO from "@/componet/SEO/Seo";
import me from "../assest/Images/about/ana.jpeg";
import ExperienceSection from "../sections/ExperienceSection";
import Testimonials from "@/sections/Testimonials";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  return (
    <Curve>
      <SEO
        title="Aziz Khaldi | Frontend Developer Portfolio"
        description="Explore Aziz Khaldi's portfolio showcasing innovative frontend development projects, UI/UX designs, and creative web solutions."
        image={me.src}
        url="https://azizkhaldiportfolio.vercel.app/"
      />
      <div className="home cursor-default bg-main relative flex flex-col overflow-y-hidden h-full">
        {/* <CursorMask /> */}
        <Navbar />
        <Hero1 />
        <AboutMe />
        <Works />
        <ExperienceSection />
        <Testimonials />
        <SlidingBars />
        {/* <FAQ /> */}
        <Footer />
      </div>
    </Curve>
  );
};

export default Home;
