import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Curve() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: '-99px',
        width: '100px',
        height: '100%',
        fill: '#1E1E1E',
        stroke: 'none',
      }}
    >
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
    </svg>
  );
}