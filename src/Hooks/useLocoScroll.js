// import { useEffect } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import gsap from 'gsap';

// gsap.registerPlugin(ScrollTrigger);

// const useLocomotiveScroll = () => {
//   useEffect(() => {
//     const scroll = new LocomotiveScroll({
//       el: document.querySelector('[data-scroll-container]'),
//       smooth: true,
//     });

//     // Update ScrollTrigger with Locomotive Scroll
//     ScrollTrigger.scrollerProxy('[data-scroll-container]', {
//       scrollTop(value) {
//         return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight
//         };
//       },
//     });

//     ScrollTrigger.addEventListener('refresh', () => scroll.update());
//     ScrollTrigger.refresh();

//     // Cleanup on unmount
//     return () => {
//       scroll.destroy();
//       ScrollTrigger.removeEventListener('refresh', () => scroll.update());
//     };
//   }, []);
// };

// export default useLocomotiveScroll;
