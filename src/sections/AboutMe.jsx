import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ButtonNew from "@/componet/UI/ButtonNew";
import InfinitTextSlid from "@/componet/UI/InfinitTextSlid";
import Image from "next/image";
import meImage from "@/assest/Images/about/me-sitting.png";
import WordAnimation from "@/components/UI/WordAnimation";
gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textRef = useRef(null);

  // Story texts that will change on scroll
  const storyTexts = [
    { number: "01", text: "Hi" },
    { number: "02", text: "I'm Aziz Khaldi" },
    { number: "03", text: "I have around 4 years of experience" },
    { number: "04", text: "Building exceptional digital experiences" },
    { number: "05", text: "Let's create something remarkable together" }
  ];

  useEffect(() => {
    const storySection = document.getElementById('first-story-section');

    if (storySection) {
      gsap.fromTo(storySection, {
        width: '80%',
        borderRadius: '34px',
        y: 120,
      },
        {
          y: -0,
          width: '100%',
          borderRadius: '0px',
          scrollTrigger: {
            trigger: '#first-story-section',
            start: 'top 80%',
            end: 'top 10%',
            scrub: 1,
          }
        });

      // Animate SVG line drawing
      const svgPath = document.querySelector('#animated-line-path');
      if (svgPath) {
        const pathLength = svgPath.getTotalLength();

        // Set initial state
        gsap.set(svgPath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // Animate on scroll
        gsap.to(svgPath, {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: '#first-story-section',
            start: 'top 10%',
            end: 'bottom+=2200px top',
            scrub: true,
          }
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    gsap.to(".about_top_curve", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top 90%",
        end: "bottom+=600 top",
        scrub: 1,
      },
      scaleY: 6,
      ease: "power3.inOut",
      duration: 3,
    });

    gsap.to(".about_bottom_curve", {
      scrollTrigger: {
        trigger: ".About-me",
        start: "25% top",
        end: "bottom+=1000 top",
        scrub: true,
      },
      scaleY: 0,
      ease: "power3.inOut",
      duration: 3,
    });

    gsap.to(".exp_item", {
      scrollTrigger: {
        trigger: ".exp_item",
        start: "top 90%",
        scrub: 1.5,
      },
      y: -50,
      opacity: 1,
      stagger: 0.05,
      ease: "power3.inOut",
      duration: 2.3,
    });

    // Animate stats with scrub
    gsap.fromTo(
      ".years-stat, .projects-stat",
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".years-stat",
          start: "top 90%",
          end: "top 50%",
          scrub: 3.5,
        },
      }
    );

    const isMobile = window.innerWidth <= 768;

    gsap.fromTo(
      ".profile-photo",
      {
        width: isMobile ? "80%" : "60%",
        scale: 0.95,
      },
      {
        width: isMobile ? "95%" : "85%",
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".profile-photo",
          start: "top bottom",
          end: "top 20%",
          scrub: 3.5,
        },
      }
    );

    // Animate counter numbers
    gsap.fromTo(
      ".years-counter",
      { innerText: 0 },
      {
        innerText: 4,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".more-about-me",
          start: "top 70%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText) + "+";
        }
      }
    );

    gsap.fromTo(
      ".projects-counter",
      { innerText: 0 },
      {
        innerText: 30,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".more-about-me",
          start: "top 70%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText) + "+";
        }
      }
    );
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');

      // Reset and animate each word
      gsap.set(words, {
        y: 100,
        opacity: 0,
      });

      gsap.to(words, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      });
    }
  }, [currentTextIndex]);

  useEffect(() => {
    const storySection = document.getElementById('story-container');

    if (storySection) {
      // Create a container height based on number of story texts
      const containerHeight = storyTexts.length * window.innerHeight;

      // Pin the story section
      ScrollTrigger.create({
        trigger: storySection,
        start: 'top top',
        end: `+=200vh`,
        pin: true,
        pinSpacing: true,
        // markers: true, // Uncomment to debug
      });

      // Text change animation with better scroll handling
      ScrollTrigger.create({
        trigger: storySection,
        start: 'top top',
        end: `+=200vh`,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate index based on progress, ensuring it works both forward and backward
          const newIndex = Math.max(0, Math.min(
            Math.floor(progress * storyTexts.length),
            storyTexts.length - 1
          ));
          setCurrentTextIndex(newIndex);
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [storyTexts.length]);




  // Split text into words with wrapper for clip effect
  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word-wrapper">
        <span className="word inline-block">
          {word}
        </span>
      </span>
    ));
  };

  return (
    <>
      <style jsx>{`
        .years-stat, .projects-stat {
          opacity: 0;
        }
        .stat-label {
          opacity: 0;
        }
        .word {
          display: inline-block;
          white-space: pre;
        }
        .text-container {
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }
        .word-wrapper {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          margin-right: 0.5rem;
        }
        @media (min-width: 768px) {
          .word-wrapper {
            margin-right: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .word-wrapper {
            margin-right: 1.5rem;
          }
        }
      `}</style>
      <div className="relative About-me flex flex-col items-center w-full duration-200 h-full text-white z-50 gap-[4rem] -mt-[2rem] bg-sec font-cabinetGrotesk ">
        <div className="overflow-hidden absolute left-[50%] lg:-top-[3rem] -top-[2rem] transform translate-x-[-50%] w-[100%] about_top_curve lg:h-[4rem] h-[2rem] mb-14 z-40">
          <div className="absolute right-[-10%] rounded-[50%] h-[150%] w-[120%] bg-sec"></div>
        </div>
        {/* SVG Line - Outside overflow context */}
        <WordAnimation trigger=".About-me"
          className=" z-[60] text-white text-xl leading-2 md:text-4xl lg:text-5xl text-center  lg:mb-4 pt-10  lg:max-w-6xl w-full mx-auto px-4"
          stagger={0.01}
          start="top center"
          end="bottom center"
          text="I'm Aziz — a Full Stack Developer crafting fast, scalable, and immersive digital experiences that merge creativity with engineering precision."
        />
        {/* Subheading */}
        <WordAnimation trigger=".About-me"
          className="text-white text-lg md:text-2xl lg:text-3xl text-center mb-1 max-w-5xl mx-auto px-4"
          stagger={0.01}
          start="top 40%"
          end="bottom center"
          text="I specialize in developing SaaS platforms, AI-driven products, and interactive 3D web experiences using technologies like Next.js, Node.js, and Three.js." />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <ButtonNew text="About Me" link="/about-me" />
        </div>


        {/* Content Inside */}
        <div className="flex overflow-hidden justify-between items-center text-sm text-main  px-4 w-full max-w-5xl">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>Scroll to Explore</span>
          </div>
          <span>My Short Story</span>
        </div>
            <div className="w-full z-[9999] h-[1px] bg-main/30 "></div>

        <div className=" overflow-hidden -mt-[4rem] w-full relative">
          {/* SVG Line - Outside overflow context */}
          <div className="absolute top-[10rem] left-10 w-full h-full pointer-events-none z-[30]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full min-w-[200vw] md:min-w-[150vw] lg:min-w-full h-auto"
              viewBox="0 0 2100 2850"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                id="animated-line-path"
                d="M2049.4 7.12338C2050.34 7.09245 2051.23 6.69369 2051.88 6.00967C2052.53 5.32571 2052.88 4.41341 2052.86 3.47254C2052.83 2.53168 2052.44 1.63823 2051.75 0.987824C2051.07 0.337364 2050.16 -0.0158818 2049.22 0.000643925C2049.22 0.000643925 2049.22 0.000643925 2049.22 0.000643925C1943.26 1.94307 1840.2 5.90331 1736.44 14.9286C1580.5 35.1176 1395.04 34.2702 1278.58 166.757C1227.87 238.526 1236.8 327.455 1207.7 401.188C1180.83 477.082 1123.39 535.224 1055.61 580.079C1016.79 606.535 979.953 634.166 955.567 675.911C927.749 717.393 946.265 778.123 980.727 808.354C1075.88 894.744 1195.98 932.824 1306.11 986.278C1361.73 1012.48 1416.74 1038.53 1465.3 1075.04C1488.69 1093.15 1510.8 1114.41 1519.8 1140.6C1529.12 1166.7 1519.29 1194.56 1500.7 1217.79C1404.12 1339.78 1268.09 1422.61 1139.05 1511.49C1075.88 1557.11 1005.55 1600.46 966.359 1674.6C923.616 1757.92 996.115 1837.3 1055.35 1883.24C1199.52 1951.53 1354.08 1931.18 1501.68 1955.38C1575.8 1965.1 1650.06 1977.47 1718.74 2004.79C1786.41 2030.3 1851.14 2084.87 1848.19 2160.07C1857.77 2265.2 1741.97 2306.5 1650.44 2305.64C1554.37 2308.8 1458.26 2296.72 1361.83 2287.47C1176.37 2275.98 949.392 2224.12 804.589 2378.02C676.379 2541.45 504.322 2672.42 307.757 2741.09C210.014 2775.13 106.864 2796.58 3.77395 2795.01C2.83192 2794.95 1.90584 2795.27 1.19933 2795.9C0.492818 2796.52 0.0637703 2797.4 0.00655131 2798.35C-0.0506677 2799.29 0.268607 2800.21 0.89412 2800.92C1.51963 2801.63 2.40016 2802.06 3.3419 2802.12C3.3419 2802.12 3.3419 2802.12 3.3419 2802.12C108.263 2804.24 211.744 2783.12 310.615 2749.26C509.168 2680.97 683.528 2549.47 813.527 2385.11C949.697 2239.53 1175.36 2287.99 1360.46 2300.99C1456.84 2310.54 1553.01 2323.05 1651 2320.16C1699.48 2317.99 1750.07 2312.84 1794.89 2288.18C1840.96 2264.57 1865.28 2210.14 1863.58 2160.07C1867.3 2076.9 1794.14 2015.79 1724.76 1989.98C1653.64 1961.52 1578.54 1948.99 1503.79 1938.98C1356.97 1915.39 1194.32 1930.71 1066.23 1869.57C1007.37 1823.57 945.361 1752.48 982.498 1682.27C1017.2 1615.88 1086.61 1571.25 1149.4 1526.47C1277.87 1438.09 1415.69 1354.9 1515.42 1229.34C1535.99 1204.15 1549.65 1167.96 1537.6 1134.63C1526.1 1101.89 1501.37 1079.39 1476.77 1060.11C1425.62 1021.67 1370.11 995.587 1314.1 969.12C1203.78 915.863 1082.67 875.787 994.272 795.03C962.857 765.637 949.342 721.103 972.099 685.095C993.13 648.632 1028.32 621.198 1065.96 595.585C1135.46 549.434 1196.38 487.653 1224.35 407.229C1254.02 328.852 1245.71 240.903 1291.77 176.154C1396.46 53.001 1582.9 47.2325 1737.51 26.2786C1840.75 16.0276 1943.59 10.6447 2049.4 7.12338Z"
                stroke="#d4f534"
                strokeWidth="40"
                opacity="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div
            id="first-story-section"
            className="story-section flex items-center flex-col justify-start relative bg-gradient-to-br absolute top-0 left-0 w-full h-full text-sec bg-main via-orange-600 to-orange-500 overflow-hidden"
            style={{
              margin: '0 auto',
              borderRadius: '60px',
              paddingBottom: '100px',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
              backgroundBlendMode: 'overlay'
            }}
          >

            <div className="my-28 w-full " >
              <InfinitTextSlid color={"black"} isFlower={true} />
            </div>

            <div className="  profile-photo text-sec  z-[20] flex flex-col items-center justify-center rounded-lg overflow-hidden">
              <div className="inset-0 z-10"></div>
              <Image
                src={meImage.src}
                quality={100}
                alt="Profile"
                className="object-cover grayscale h-[100vh] lg:w-full w-[100vw] mx-auto"
                priority
                width={320}
                height={320}
              />

            </div>

            {/* Results Section */}
            <div className="relative more-about-me z-[380] w-full  text-sec py-10 mt-5 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {/* Left side - Title and Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
                  <WordAnimation
                    className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium "
                    stagger={0.015}
                    lineHeight="0.8"
                    start="top 90%"
                    end="bottom center"
                    text="Driving measurable growth and engagement through thoughtful design and engineering."
                  />
                  <div className="flex items-center">
                    <WordAnimation
                      className="text-sm sm:text-base md:text-lg leading-relaxed"
                      stagger={0.015}
                      lineHeight="0.8"
                      start="top 90%"
                      end="bottom center"
                      text="Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences. From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact."
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                  {/* Stat 1 */}
                  <div className="border-t border-gray-600 pt-6 sm:pt-8">
                    <p className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
                      YEARS OF EXPERIENCE
                    </p>
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold years-counter">
                      0
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="border-t border-gray-600 pt-6 sm:pt-8">
                    <p className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
                      PROJECTS COMPLETED
                    </p>
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold projects-counter">
                      0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-main w-full px-4 px-[1rem] lg:px-24 py-20 sm:py-32 lg:py-40 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-[50]">
              {/* Header */}
              <div className="flex flex-col text-left items-center justify-center">
                <WordAnimation
                  className="text-sec text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl  mb-8 sm:mb-12 leading-[1.1] lg:px-4 px-1 "
                  stagger={0.01}
                  delay={0.1}
                  start="top 90%"
                  end="bottom center"
                  text="Transforming ideas into exceptional digital experiences through expertise and innovation"
                />
              </div>
              <ServicesGrid />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AboutMe;

function ServicesGrid() {
  const containerRef = useRef(null);
  const servicesRef = useRef(null);

  const services = [
    {
      number: "01",
      title: "Full Stack Development",
      description: "Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript, with robust backend architectures, secure RESTful APIs, and clean code practices.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="ml-2 mt-2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
          <path d="M12 18L22 12L32 18L42 12V38L32 44L22 38L12 44V18Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 12V38M32 18V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      number: "02",
      title: "UI/UX Design & Frontend",
      description: "Designing modern, responsive interfaces with Figma, Tailwind CSS, and Framer Motion. Creating intuitive experiences with clean design systems and pixel-perfect implementations.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
          <rect x="10" y="10" width="44" height="44" rx="6" stroke="currentColor" strokeWidth="2.5" />
          <path d="M10 22H54M22 10V54" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="38" cy="38" r="6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      )
    },
    {
      number: "03",
      title: "SaaS Platform Development",
      description: "Developing end-to-end SaaS solutions with subscription systems, Stripe billing, and multi-tenant management. Ensuring scalability and secure user management.",
      icon: (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mt-2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
          <path d="M32 10L46 18V38L32 46L18 38V18L32 10Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 10V46M18 18L46 38M46 18L18 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      number: "04",
      title: "API & System Architecture",
      description: "Designing maintainable APIs with PostgreSQL, Prisma, and MongoDB. Focusing on performance optimization, security best practices, and reliable data flow.",
      icon: (
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
          <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="46" cy="18" r="6" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="18" cy="46" r="6" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="46" cy="46" r="6" stroke="currentColor" strokeWidth="2.5" />
          <path d="M24 18H40M24 46H40M18 24V40M46 24V40" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const servicesContainer = servicesRef.current;

    if (container && servicesContainer) {
      // Check if screen is large enough for horizontal scroll
      const isLargeScreen = window.innerWidth >= 1024;

      if (isLargeScreen) {
        const totalScrollWidth = servicesContainer.scrollWidth - window.innerWidth + 200;

        // Pin the container
        ScrollTrigger.create({
          trigger: container,
          start: 'top 20%',
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Horizontal scroll animation
        gsap.to(servicesContainer, {
          x: () => -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 20%',
            end: () => `+=${totalScrollWidth}`,
            scrub: 1,
          },
        });
      }

      // Refresh ScrollTrigger after layout
      ScrollTrigger.refresh();
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <div ref={containerRef} className="relative lg:h-[70vh] gap-10 flex flex-col justify-center items-center h-auto ">
      <div className="lg:absolute relative left-0 top-0 w-full h-full flex items-center">
        <div
          ref={servicesRef}
          className="flex lg:flex-row flex-col"
        >
          {/* <div className="text-sec/70 text-sm sm:text-base md:text-lg max-w-xs flex-shrink-0 self-center px-4 lg:px-24 leading-relaxed mb-8 lg:mb-0">
            Achieving measurable impact with global client partners...
          </div> */}
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isLast={index === services.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index, isHovered, onHover, onLeave, cardRef, isLast }) {
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in'
        });
      }
    }
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* Main Card */}
      <div className={`
        relative text-sec 
        w-full sm:w-[350px] md:w-[450px] lg:w-[480px]
        h-auto sm:h-[350px] md:h-[450px] lg:h-[480px]
        border-t border-b border-l border-r
        ${isLast ? 'border-r' : ' md:border-r-0'}
        border-black 
        p-6 sm:p-8 md:p-10
        transition-all duration-500 cursor-pointer overflow-hidden
        mb-4 lg:mb-0
      `}
        onClick={() => setIsExpanded(!isExpanded)}
      >


        {/* Content */}
        <div className="relative flex flex-col justify-between z-10 h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sec absolute -top-3 sm:-top-5 -right-3 sm:-right-5 text-base sm:text-lg md:text-2xl font-light">
                {service.number}
              </span>
              <div className={`
                transition-all bg-thr 
                h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20
                rounded-full flex items-center justify-center duration-500
                ${isCardHovered ? 'text-sec scale-110' : 'text-sec/60'}
              `}>
                {service.icon}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className={`
            text-xl sm:text-2xl md:text-3xl lg:text-4xl 
            font-bold mb-3 w-full lg:w-[70%] leading-tight
            transition-colors duration-500
            ${isCardHovered ? 'text-sec' : 'text-sec/90'}
          `}>
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-sec/50 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
            {service.shortDesc}
          </p>

          {/* Tags - Always Visible */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {service?.tags?.map((tag, i) => (
              <span
                key={i}
                className={`
                  px-2 sm:px-3 py-1 sm:py-1.5 
                  text-xs sm:text-sm rounded-full
                  transition-all duration-300
                  ${isCardHovered
                    ? 'bg-thr/20 text-thr border border-thr/30'
                    : 'bg-sec/5 text-sec/60 border border-sec/10'
                  }
                `}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expanded Content */}
          <div className="pt-4 sm:pt-6 border-t border-sec/10">
            <p className="text-sec/70 text-sm sm:text-base md:text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Corner Accent */}
        <div className={`
          absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32
          transition-opacity duration-500
          ${isCardHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-thr/10 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}