import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';

// Sample data for demo
const menuItems = [
  {
    link: '#home',
    text: 'Home',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    link: '#about',
    text: 'About',
    image: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400'
  },
  {
    link: '#work',
    text: 'Work',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400'
  },
  {
    link: '#contact',
    text: 'Contact',
    image: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400'
  }
];

function FlowingMenu({ items = menuItems, height }) {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        margin: 0,
        padding: 0
      }}>
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} height={height} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, height }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const linkTextRef = React.useRef(null);

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !linkTextRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const duration = 1;
    const marquee = marqueeRef.current;
    const marqueeInner = marqueeInnerRef.current;
    const linkText = linkTextRef.current;

    marquee.style.transition = 'none';
    marqueeInner.style.transition = 'none';
    marquee.style.transform = edge === 'top' ? 'translate3d(0, -101%, 0)' : 'translate3d(0, 101%, 0)';
    marqueeInner.style.transform = edge === 'top' ? 'translate3d(0, 101%, 0)' : 'translate3d(0, -101%, 0)';

    requestAnimationFrame(() => {
      marquee.style.transition = `transform ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`;
      marqueeInner.style.transition = `transform ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`;
      linkText.style.transition = `opacity 0.3s`;
      
      marquee.style.transform = 'translate3d(0, 0%, 0)';
      marqueeInner.style.transform = 'translate3d(0, 0%, 0)';
      linkText.style.opacity = '0';
    });
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !linkTextRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const duration = 1;
    const marquee = marqueeRef.current;
    const marqueeInner = marqueeInnerRef.current;
    const linkText = linkTextRef.current;

    marquee.style.transition = `transform ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`;
    marqueeInner.style.transition = `transform ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`;
    linkText.style.transition = `opacity 0.3s`;

    marquee.style.transform = edge === 'top' ? 'translate3d(0, -101%, 0)' : 'translate3d(0, 101%, 0)';
    marqueeInner.style.transform = edge === 'top' ? 'translate3d(0, 101%, 0)' : 'translate3d(0, -101%, 0)';
    linkText.style.opacity = '1';
  };

  // Calculate image size based on height prop
  const getImageStyles = () => {
    const baseStyles = { backgroundImage: `url(${image})` };
    if (height) {
      const heightValue = parseInt(height);
      const imageHeight = heightValue * 0.6;
      const imageWidth = imageHeight * 1.5;
      return {
        ...baseStyles,
        height: `${imageHeight}px`,
        width: `${imageWidth}px`,
        margin: `0 ${getSpacing()}`
      };
    }
    return { ...baseStyles, margin: `0 ${getSpacing()}` };
  };

  // Calculate font size based on height prop
  const getFontSize = () => {
    if (height) {
      const heightValue = parseInt(height);
      return `${Math.max(heightValue * 0.15, 24)}px`;
    }
    return undefined;
  };

  // Calculate repetitions based on text length
  const getRepetitions = () => {
    const textLength = text.length;
    if (textLength < 5) return 30;
    if (textLength < 10) return 20;
    if (textLength < 15) return 15;
    return 12;
  };

  // Calculate spacing based on text length
  const getSpacing = () => {
    const textLength = text.length;
    if (textLength < 5) return '4vw';
    if (textLength < 10) return '3vw';
    return '2vw';
  };

  const repeatedMarqueeContent = Array.from({ length: getRepetitions() }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span style={getFontSize() ? { fontSize: getFontSize() } : undefined}>{text}</span>
      <div style={{
        ...getImageStyles(),
        width: '200px',
        height: '7vh',
        padding: '1em 0',
        borderRadius: '50px',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
      }} />
    </React.Fragment>
  ));
  

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.7,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
      }
    );
  }, []);


  return (
    <div
      ref={itemRef}
      className='relative item '
      style={{
        backgroundColor: 'transparent',
        flex: height ? 'none' : 1,
        height: height || undefined,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <span className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-black to-black'></span>
      <a
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
          textTransform: 'uppercase',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 600,
          color: '#000',
          fontSize: getFontSize() || '4vh',
          zIndex: 2,
          transition: 'color 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
        onMouseOut={(e) => e.currentTarget.style.color = '#000'}
      >
        <span ref={linkTextRef} style={{ transition: 'opacity 0.3s' }}>{text}</span>
      </a>
      <div
        ref={marqueeRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: '#000',
          transform: 'translate3d(0, 101%, 0)',
          transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          ref={marqueeInnerRef}
          style={{
            height: '100%',
            display: 'flex',
            transform: 'translateX(0)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            height: '100%',
            flexShrink: 0,
            willChange: 'transform',
            animation: 'marquee 40s linear infinite'
          }}>
            {repeatedMarqueeContent.map((content, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                fontWeight: 400,
                fontSize: '4vh',
                lineHeight: 1.2,
                paddingTop: '1vh'
              }}>
                {content}
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            height: '100%',
            flexShrink: 0,
            willChange: 'transform',
            animation: 'marquee 40s linear infinite'
          }}>
            {repeatedMarqueeContent.map((content, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                fontWeight: 400,
                fontSize: '4vh',
                lineHeight: 1.2,
                paddingTop: '1vh'
              }}>
                {content}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

export default FlowingMenu;