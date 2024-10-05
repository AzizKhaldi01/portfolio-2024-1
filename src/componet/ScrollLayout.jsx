// components/Layout.js
"use client";
import useLocoScroll from '../Hooks/useLocoScroll'
import { useState, useEffect } from 'react';

const ScrollLayout = ({ children }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  useLocoScroll(start);

  return (
    <div id="main-container">
      {children}
    </div>
  );
};

export default ScrollLayout;
