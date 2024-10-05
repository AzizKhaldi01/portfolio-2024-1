"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
  useEffect(() => {
    // Initialize Lenis with smoothTouch enabled
    const lenis = new Lenis({
      smooth: true,        // Enable smooth scroll
      smoothTouch: true,   // Enable smooth scroll for touch devices7
      duration:1.5,
      lerp:0.5
    });

  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
