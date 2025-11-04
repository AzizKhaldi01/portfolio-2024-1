import React from 'react';
import { gsap } from 'gsap';
import styles from './FlowingMenu.module.css';

function FlowingMenu({ items = [], height }) {
  return (
    <div className={styles.menuWrap}>
      <nav className={styles.menu}>
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

  const animationDefaults = { duration: 0.6, ease: 'expo' };

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

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
      .to(linkTextRef.current, { opacity: 0, duration: 0.3 }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !linkTextRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to(linkTextRef.current, { opacity: 1, duration: 0.3 }, 0);
  };

  // Calculate image size based on height prop
  const getImageStyles = () => {
    const baseStyles = { backgroundImage: `url(${image})` };
    if (height) {
      const heightValue = parseInt(height);
      const imageHeight = heightValue * 0.6; // 60% of container height
      const imageWidth = imageHeight * 1.5; // Maintain aspect ratio
      return {
        ...baseStyles,
        height: `${imageHeight}px`,
        width: `${imageWidth}px`,
        margin: '0 2vw'
      };
    }
    return baseStyles;
  };

  // Calculate font size based on height prop
  const getFontSize = () => {
    if (height) {
      const heightValue = parseInt(height);
      return `${Math.max(heightValue * 0.15, 24)}px`; // 15% of height, minimum 24px
    }
    return undefined;
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span style={getFontSize() ? { fontSize: getFontSize() } : undefined}>{text}</span>
      <div className={styles.marqueeImg} style={getImageStyles()} />
    </React.Fragment>
  ));

  return (
    <div
      className={`${styles.menuItem} font-cabinetGrotesk`}
      ref={itemRef}
      style={height ? { height, flex: 'none' } : undefined}
    >
      <a
        className={styles.menuItemLink}
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={getFontSize() ? { fontSize: getFontSize() } : undefined}
      >
        <span ref={linkTextRef}>{text}</span>
      </a>
      <div className={styles.marquee} ref={marqueeRef}>
        <div className={styles.marqueeInnerWrap} ref={marqueeInnerRef}>
          <div className={styles.marqueeInner} aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;