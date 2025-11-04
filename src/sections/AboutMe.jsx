import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ButtonEffect from "../componet/UI/ButtonEffect";
import Magnetic from "../componet/gsap/Magnetic";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/assest/Icons/ArrowIcon";
import ScrollReveal from "../componet/gsap/ScrollReveal.jsx";
import WordAnimation from "../components/UI/WordAnimation";
import Spline from "@splinetool/react-spline";
import meImage from "@/assest/Images/about/me-sitting.png";
import InfinitTextSlid from "@/componet/UI/InfinitTextSlid";
import LineAnimation from "@/components/UI/LineAnimation";

gsap.registerPlugin(ScrollTrigger);

function AboutMe() {
  const splineRef = useRef(null);

  // Function to handle Spline load and set zoom
  const onSplineLoad = (splineApp) => {
    splineRef.current = splineApp;

    // Set responsive zoom level
    const isMobile = window.innerWidth < 768; // md breakpoint
    const zoomLevel = isMobile ? 0.35 : 0.46;

    splineApp.setZoom(zoomLevel);

    // Also handle window resize
    const handleResize = () => {
      const isMobileResize = window.innerWidth < 768;
      const newZoomLevel = isMobileResize ? 0.35 : 0.46;
      splineApp.setZoom(newZoomLevel);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  useEffect(() => {
    gsap.to(".about_top_curve", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top 90%",
        end: "bottom+=600 top",
        scrub: 3,
      },
      scaleY: 5,
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
      duration: 2,
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


    // Animate main intro text words with scrub
    const introWords = document.querySelectorAll(".intro-word");
    gsap.fromTo(
      introWords,
      {
        opacity: 0,
        y: 30,
        rotateX: -45
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".intro-text",
          start: "top 85%",
          end: "top 50%",
          scrub: 3,
        },
      }
    );

    // Animate description paragraph with scrub
    gsap.fromTo(
      ".about-description",
      {
        opacity: 0,
        x: 80
      },
      {
        opacity: 1,
        x: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-description",
          start: "top 90%",
          end: "top 60%",
          scrub: 2.5,
        },
      }
    );

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

    // Animate profile photo with 3D rotation from bottom
    gsap.fromTo(
      ".profile-photo",
      {
        opacity: 0,
        y: 200,
        rotateY: -45,
        rotateX: -45,
        scale: 0.8,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".profile-photo",
          start: "top bottom",
          marks: true,
          end: "top 20%",
          scrub: 3.5,
        },
      }
    );

    // Animate stat labels with scrub
    gsap.fromTo(
      ".stat-label",
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".stat-label",
          start: "top 90%",
          end: "top 60%",
          scrub: 2.8,
        },
      }
    );

    // Counter animation for numbers with scrub
    const yearsNumber = document.querySelector(".years-number");
    const projectsNumber = document.querySelector(".projects-number");

    if (yearsNumber) {
      gsap.fromTo(yearsNumber,
        {
          textContent: 0
        },
        {
          textContent: 4,
          snap: { textContent: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".years-stat",
            start: "top 90%",
            end: "top 50%",
            scrub: 3.5,
          },
        }
      );
    }

    if (projectsNumber) {
      gsap.fromTo(projectsNumber,
        {
          textContent: 0
        },
        {
          textContent: 30,
          snap: { textContent: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-stat",
            start: "top 90%",
            end: "top 50%",
            scrub: 3.5,
          },
        }
      );
    }

    // Enhanced animation for Services title - coming from underneath
    gsap.fromTo(
      ".services-title",
      {
        opacity: 0,
        y: 180,
        clipPath: "inset(100% 0 0 0)"
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 90%",
          end: "top 40%",
          scrub: 3,
        },
      }
    );
  }, []);


  return (
    <>
      <style jsx>{`
        .intro-text {
          perspective: 1000px;
        }
        .intro-word {
          display: inline-block;
          transform-origin: center bottom;
          opacity: 0;
        }
        .about-header {
          opacity: 0;
        }
        .about-description {
          opacity: 0;
        }
        .years-stat, .projects-stat {
          opacity: 0;
        }
        .profile-photo {
          opacity: 0;
        }
        .stat-label {
          opacity: 0;
        }
      `}</style>
      <div
        id="bgChanged"
        className=" relative  About-me flex flex-col items-center  w-full duration-200 h-full    text-white z-50   gap-[4rem]  -mt-[2rem]    bgChanged about-me   bg-sec "
      >
        <div className="   overflow-hidden  absolute left-[50%]  lg:-top-[3rem] -top-[2rem] transform  translate-x-[-50%] w-[100%] about_top_curve   lg:h-[4rem] h-[2rem]  mb-14 z-40 ">
          <div className="   absolute right-[-10%] rounded-[50%]   h-[150%] w-[120%] bg-sec "></div>
        </div>

        <div className="about-me-section w-full  px-[1rem] md:px-[6rem]  w-full  lg:mt-20 mt-3 z-50">

          <LineAnimation
            text={
              "Full Stack Developer with 4+ Years of Experience building scalable, high-performance web applications, SaaS platforms, and interactive user interfaces. Proficient in React, Next.js, Node.js, Express, and TypeScript, with deep expertise in modern frontend ecosystems and backend architecture. Passionate about crafting immersive digital experiences that merge design precision with technical excellence. Skilled in 3D web technologies like Three.js, GSAP, and Blender,"
            }
            className="text-white/90 lg:text-5xl text-xl font-cabinetGrotesk   text-center  lg:text-left  lg:leading-16 leading-6 "
            start="top 80%"
            scrollTriggerStart="top 80%"
            onScroll={true}
            end="bottom 20%"
            stagger={0.014}
          />

          {/* Three Column Stats with Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-cabinetGrotesk items-center my-20">
            {/* Years Experience */}
            <div className="years-stat text-center lg:text-left">
              <p className="stat-label text-base md:text-lg font-light text-gray-300 mb-4">Years Experience<br />in Full-stack development</p>
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-white">
                <span className="years-number">0</span><span className="text-thr text-5xl md:text-6xl lg:text-7xl">+</span>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center ">
              <div className="profile-photo  relative w-80 h-96 md:w-96 md:h-[28rem] lg:w-[28rem] lg:h-[32rem] rounded-lg overflow-hidden">
                <div className="absolute inset-0 z-10"></div>
                <Image
                  src={meImage}
                  alt="Profile"
                  className="w-full h-full object-cover grayscale"
                  fill

                  priority
                />
              </div>
            </div>

            {/* Projects Count */}
            <div className="projects-stat text-center lg:text-right">
              <p className="stat-label text-base md:text-lg font-light text-gray-300 mb-4">Projects<br />I Worked on</p>
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-white">
                <span className="projects-number">0</span><span className="text-thr text-5xl md:text-6xl lg:text-7xl">+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full width InfinitTextSlid */}
        <div className="w-full">
          <InfinitTextSlid color="#f67216" trigger={".about-description"} />
        </div>

        <div className="font-righteous flex flex-col items-center pt-20 justify-center gap-7 w-full">
          <div className="services-section w-full px-[1rem] md:px-[6rem]">
            <WordAnimation
              text="My Services Here"
              className="text-white font-cabinetGrotesk text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-left mb-1"
              trigger=".services-section"
              start="top 80%"
              end="bottom 20%"
              stagger={0.01}
              delay={0}
            />
            <WordAnimation
              text="Comprehensive solutions tailored to bring your digital vision to life"
              className="text-base font-light md:text-xl text-white/70 mb-20  max-w-3xl"
              trigger=".services-section"
              start="top 80%"
              end="bottom 20%"
              stagger={0.01}
              delay={0}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left Column - Spline 3D Scene */}
              <div className="flex justify-center lg:justify-start w-full">
                <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] rounded-lg bg-[#1e1e1e] overflow-hidden">
                  <Spline
                    scene="/keyboard.splinecode"
                    onLoad={onSplineLoad}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Services Accordion */}
              <ServicesAccordion />
            </div>
          </div>
        </div>
        <div className=" font-righteous exp_item opacity-0 z-50 w-full flex justify-center items-center my-16 ">
          <Magnetic>
            <div>
              <Link href="/about-me" scroll={false}>
                <ButtonEffect
                  strength={3.7}
                  Style={
                    "lg:px-[1.5rem] px-[2.8rem] lg:py-3 py-4 flex gap-2 border-[1px] border-white text-white hover:border-0 lg:text-2xl text-lg text-black"
                  }
                >
                  <span className="flex items-center gap-4">
                    About Me <ArrowIcon className=" h-5 w-5  " />
                  </span>
                </ButtonEffect>
              </Link>
            </div>
          </Magnetic>

        </div>

        <div className=" overflow-hidden   about_bottom_curve rotate-180 absolute  left-[50%]  lg:-bottom-[8rem] -bottom-[6rem]   transform  translate-x-[-50%] w-[100%]    lg:h-[10rem] h-[6rem]  mb-14 z-40 ">
          <div className="   absolute right-[-10%] rounded-[50%]   h-[150%] w-[120%] bg-sec "></div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;

function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState(1); // Web development is open by default

  const services = [
    {
      "title": "Full Stack Development",
      "description": "Building scalable, high-performance web applications using Next.js, React, Node.js, Express, and TypeScript. I design robust backend architectures, develop secure RESTful APIs, and integrate cloud databases for production-grade systems."
    },
    {
      "title": "UI/UX Design & Frontend Engineering",
      "description": "Designing and developing modern, responsive interfaces with Figma, Tailwind CSS, Framer Motion, and Shadcn/UI. I focus on creating intuitive user experiences with clean design systems and seamless interactions."
    },
    {
      "title": "SaaS Platform Development",
      "description": "Developing and maintaining end-to-end SaaS solutions — including subscription systems, billing with Stripe, and multi-tenant management. Ensuring scalability, automation, and secure user management for startups and enterprises."
    },
    {
      "title": "API & System Architecture",
      "description": "Designing structured and maintainable APIs with PostgreSQL, Prisma, and MongoDB. I focus on performance optimization, security, and reliable data flow across distributed services."
    }
  ]

  return (
    <div className="space-y-0">
      {services.map((service, index) => (
        <ServiceAccordionItem
          key={index}
          title={service.title}
          description={service.description}
          cta={service.cta}
          isExpanded={activeIndex === index}
          onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}

function ServiceAccordionItem({ title, description, cta, isExpanded, onClick }) {
  return (
    <div className="border-b border-gray-600 py-8 opacity-0 exp_item">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left group"
      >
        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-medium transition-colors duration-500 ${isExpanded ? 'text-orange-500' : 'text-white group-hover:text-gray-300'
          }`}>
          {title}
        </h3>
        <div className={`text-3xl md:text-4xl font-light transition-all duration-500 ${isExpanded ? 'text-orange-500 rotate-180' : 'text-white rotate-0'
          }`}>
          +
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
        }`}>
        <div className="space-y-6">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {description}
          </p>
          <a
            href="#"
            className="inline-flex items-center text-base md:text-lg text-white hover:text-orange-500 transition-colors duration-300"
          >
            {cta}
          </a>
        </div>
      </div>
    </div>
  );
}
