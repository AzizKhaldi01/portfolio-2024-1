import { useEffect, useState, useRef } from "react";
import assest3d from "../assest/glassyObj.mp4";

const BackgroundVideo = () => {
  const videoRef = useRef(null);
  
  // Calculate initial scale immediately
  const getScale = (width) => {
    if (width < 640) {
      return 1;
    } else if (width < 768) {
      return 1.2;
    } else if (width < 1024) {
      return 1.1;
    } else if (width < 1280) {
      return 1.1;
    } else {
      return 1.08;
    }
  };

  const [videoScale, setVideoScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setVideoScale(getScale(width));
        setMounted(true);
      }
    }, 50);

    const handleResize = () => {
      const width = window.innerWidth;
      setVideoScale(getScale(width));
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <span className="item relative overflow-hidden w-full h-full block">
      <span className="item w-full h-[5rem] bg-main absolute -bottom-[8rem] right-0 z-20"></span>
      <video
        ref={videoRef}
        key={`video-${mounted}`}
        loop
        className="item obj3d w-full h-full object-cover"
        style={{ 
          transform: `scale(${videoScale}) translate3d(0, 0, 0)`,
          transformOrigin: 'center center',
          height: '100vh',
          width: '100vw',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000,
          transition: 'transform 0.1s ease-out',
        }}
        autoPlay
        muted
        playsInline
      >
        <source src={assest3d} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </span>
  );
};

export default BackgroundVideo;