import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticWrapper({ children, style }) {
  const magnetic = useRef(null);

  useEffect(() => {
    // Only apply the magnetic effect on desktop (screen width >= 1024px)
    if (window.innerWidth >= 1024) {
      const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      magnetic.current.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = magnetic.current.getBoundingClientRect();
        const x = clientX - (left + width / 2) ;
        const y = clientY - (top + height / 2);
        xTo(x);
        yTo(y);
      });

      magnetic.current.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    }
  }, []);

  return React.cloneElement(children, {
    ref: magnetic,
    style: { ...children.props.style, ...style }, // Merge existing styles with the new ones
  });
}
