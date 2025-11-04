import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '../../componet/Navbar';
import Curve from '../../componet/UI/NavCurve';
import Footer from '../../componet/Footer/Footer';
import SEO from '../../componet/SEO/Seo';
import { worksObj } from '../../assest/data/WorkObj';
import ArrowIcon from '../../assest/Icons/ArrowIcon';
import CurvedLoop from '../../componet/UI/CurvedLoop';
import FlowingMenu from '../../componet/UI/FlowingMenu';
import MagneticWrapper from '../../componet/gsap/Magnetic';
import ButtonEffect from '../../componet/UI/ButtonEffect';

// Generate a URL-friendly slug from a project title
const slugify = (text) =>
    text
        ?.toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const ProjectDetails = () => {
    const router = useRouter();
    const { id } = router.query; // now accepts slug or legacy numeric id
    const [project, setProject] = useState(null);
    const [nextProject, setNextProject] = useState(null);
    const [prevProject, setPrevProject] = useState(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    console.log(project?.galleryImages);

    const [viewMode, setViewMode] = useState(() => {
        // Set default based on screen size
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768 ? 'flowing' : 'grid';
        }
        return 'grid';
    });

    gsap.registerPlugin(ScrollTrigger);

    // Set initial view mode based on screen size
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initialMode = window.innerWidth >= 768 ? 'flowing' : 'grid';
            setViewMode(initialMode);
        }
    }, []);

    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const images = sectionRef.current.querySelectorAll(".scroll-img");
        const totalImages = images.length;
        const middleIndex = Math.floor(totalImages / 2);

        images.forEach((img, i) => {
            const isMiddle = i === middleIndex;

            // Set initial position
            gsap.set(img, { y: 0 });

            // Middle image goes up, others go down
            const yValue = isMiddle ? -40 : 40;

            // Different speeds by adjusting scroll range
            // Middle image: faster (smaller range)
            // Outer images: slower (larger range)
            let endOffset = "bottom top";
            if (isMiddle) {
                // Middle image completes faster (shorter scroll distance)
                endOffset = "bottom-=400px top";
            } else if (i === 0 || i === totalImages - 1) {
                // Outer images complete slower (longer scroll distance)
                endOffset = "bottom+=200px top";
            } else {
                // Middle images complete at normal speed
                endOffset = "bottom top";
            }

            gsap.to(img, {
                y: yValue,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: endOffset,
                    scrub: 2,
                },
            });
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, [project]);


    useEffect(() => {
        const el = containerRef.current;
        const vid = videoRef.current;

        if (!el || !vid) return;

        // Wait for video to be ready before initializing animation
        const initializeAnimation = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    toggleActions: "play reverse play reverse",
                    scrub: true,
                },
            });

            // Animate container
            tl.fromTo(
                el,
                {
                    borderRadius: "1rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                },
                {
                    borderRadius: "0rem",
                    paddingLeft: "0rem",
                    paddingRight: "0rem",
                    duration: 0.8,
                }
            );
            tl.fromTo(
                vid,
                {
                    borderRadius: "1rem",
                },
                {
                    borderRadius: "0rem",
                    duration: 0.8,
                },
                "<"
            );

            ScrollTrigger.refresh();
            return tl;
        };
        let tl;

        // If there's a video, wait for it to load
        if (vid && project?.video) {
            const handleVideoLoad = () => {
                // Small delay to ensure layout is stable
                setTimeout(() => {
                    tl = initializeAnimation();
                }, 100);
            };

            // Check if video is already loaded
            if (vid.readyState >= 2) {
                // Video metadata is already loaded
                handleVideoLoad();
            } else {
                // Wait for video metadata to load
                vid.addEventListener("loadedmetadata", handleVideoLoad);
            }

            return () => {
                if (vid) {
                    vid.removeEventListener("loadedmetadata", handleVideoLoad);
                }
                if (tl) {
                    tl.scrollTrigger && tl.scrollTrigger.kill();
                    tl.kill();
                }
                ScrollTrigger.getAll().forEach((t) => t.kill());
            };
        } else {
            // No video, initialize immediately
            tl = initializeAnimation();

            return () => {
                if (tl) {
                    tl.scrollTrigger && tl.scrollTrigger.kill();
                    tl.kill();
                }
                ScrollTrigger.getAll().forEach((t) => t.kill());
            };
        }
    }, [project]); // Add project as dependency


    useEffect(() => {
        if (!id) return;
        const slugParam = Array.isArray(id) ? id[0] : id;

        // Prefer explicit slug field; fallback to slugified title; fallback to numeric index
        let projectIndex = worksObj.findIndex((p) => p.slug === slugParam);
        if (projectIndex === -1) {
            projectIndex = worksObj.findIndex((p) => slugify(p.title) === slugParam);
        }
        if (projectIndex === -1 && /^\d+$/.test(slugParam)) {
            projectIndex = parseInt(slugParam, 10);
        }

        const currentProject = worksObj[projectIndex];

        if (currentProject) {
            setProject({ ...currentProject, index: projectIndex });

            // Set next and previous projects
            const nextIndex = (projectIndex + 1) % worksObj.length;
            const prevIndex = projectIndex === 0 ? worksObj.length - 1 : projectIndex - 1;

            setNextProject({ ...worksObj[nextIndex], index: nextIndex });
            setPrevProject({ ...worksObj[prevIndex], index: prevIndex });
        }
    }, [id]);

    // Pin the main hero image section and make it full viewport while pinned
    useEffect(() => {
        if (!imageContainerRef.current || !imageRef.current) return;

        const pinTrigger = ScrollTrigger.create({
            trigger: imageContainerRef.current,
            start: "top bottom",
        });

        const scaleAnim = gsap.to(imageRef.current, {
            scrollTrigger: {
                trigger: imageContainerRef.current,
                start: "top bottom",
                scrub: true
            },

        });

        const paddingAnim = gsap.fromTo(
            imageContainerRef.current,
            { padding: "2rem", borderRadius: "0rem" },
            {
                padding: "0rem",
                ease: "none",
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top bottom+=100px",
                    scrub: true
                }
            }
        );

        // Background color change when Project Overview section is reached
        const projectOverviewSection = document.querySelector('.project-overview-section');
        const lineElement = document.querySelector('.project-line');

        if (projectOverviewSection) {
            // Add smooth transition to body
            document.body.style.transition = 'background-color 0.1s , color 0.1s';

            ScrollTrigger.create({
                trigger: projectOverviewSection,
                start: "top center",
                onEnter: () => {
                    gsap.to('body', {
                        backgroundColor: '#1E1E1E',
                        color: '#e7e7e7',
                    });
                    // Change line color to white
                    gsap.to('.project-line', {
                        backgroundColor: '#ffffff',
                        duration: 0.3
                    });
                    // Change button styles to white background
                    gsap.to('.project-button', {
                        backgroundColor: '#e7e7e7',
                        color: '#000000',
                        duration: 0.3
                    });
                    // Change skill tags to white background
                    gsap.to('.skill-tag', {
                        backgroundColor: '#e7e7e7',
                        color: '#000000',
                        duration: 0.3
                    });
                },
                onLeaveBack: () => {
                    gsap.to('body', {
                        backgroundColor: '#e7e7e7',
                        color: '#000000',
                    });
                    // Change line color back to black
                    gsap.to('.project-line', {
                        backgroundColor: '#000000',
                        duration: 0.3
                    });
                    // Revert button styles to black background
                    gsap.to('.project-button', {
                        backgroundColor: '#000000',
                        color: '#e7e7e7',
                        duration: 0.3
                    });
                    // Revert skill tags to black background
                    gsap.to('.skill-tag', {
                        backgroundColor: '#000000',
                        color: '#e7e7e7',
                        duration: 0.3
                    });
                }
            });
        }

        // Line width animation
        if (lineElement) {
            gsap.fromTo(lineElement,
                { width: "0%" },
                {
                    width: "100%",
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: projectOverviewSection,
                        start: "top center",
                        end: "top center+=200px",
                        scrub: false
                    }
                }
            );
        }

        // Background color change when My Role section is reached
        const myRoleSection = document.querySelector('.my-role-section');

        if (myRoleSection) {
            ScrollTrigger.create({
                trigger: myRoleSection,
                start: "top center",
                onEnter: () => {
                    gsap.to('body', {
                        backgroundColor: '#e7e7e7',
                        color: '#000000',
                        duration: 0.3
                    });
                    // Change line color back to black
                    gsap.to('.project-line', {
                        backgroundColor: '#000000',
                        duration: 0.3
                    });
                    // Revert button styles to black background
                    gsap.to('.project-button', {
                        backgroundColor: '#000000',
                        color: '#e7e7e7',
                        duration: 0.3
                    });
                    // Revert skill tags to black background
                    gsap.to('.skill-tag', {
                        backgroundColor: '#000000',
                        color: '#e7e7e7',
                        duration: 0.3
                    });
                    // Change curved loop text to black
                    gsap.to('.curved-text-white', {
                        fill: '#000000',
                        duration: 0.3
                    });
                },
                onLeaveBack: () => {
                    gsap.to('body', {
                        backgroundColor: '#1E1E1E',
                        color: '#e7e7e7',
                        duration: 0.3
                    });
                    // Change line color to white
                    gsap.to('.project-line', {
                        backgroundColor: '#ffffff',
                        duration: 0.3
                    });
                    // Change button styles to white background
                    gsap.to('.project-button', {
                        backgroundColor: '#e7e7e7',
                        color: '#000000',
                        duration: 0.3
                    });
                    // Change skill tags to white background
                    gsap.to('.skill-tag', {
                        backgroundColor: '#e7e7e7',
                        color: '#000000',
                        duration: 0.3
                    });
                    // Revert curved loop text to white
                    gsap.to('.curved-text-white', {
                        fill: '#e7e7e7',
                        duration: 0.3
                    });
                }
            });
        }

        //     gsap.to(".project-title", {
        //         markers: true,
        //         yPercent: 100,
        //         duration: 1,
        //         markers: true,
        //         ease: "power2.out",
        //         scrollTrigger: {
        //             trigger: ".project-title",
        //             start: "center 20%",
        //             scrub: 2
        //         }
        // });

        return () => {
            pinTrigger.kill();
            if (scaleAnim && scaleAnim.scrollTrigger) {
                scaleAnim.scrollTrigger.kill();
            }
            scaleAnim.kill();
            if (paddingAnim && paddingAnim.scrollTrigger) {
                paddingAnim.scrollTrigger.kill();
            }
            paddingAnim.kill();
        };
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen bg-main flex items-center justify-center">
                <div className="text-2xl ">Loading...</div>
            </div>
        );
    }

    const projectFeatures = [
        "Responsive Design",
        "Modern UI/UX",
        "Performance Optimized",
        "Cross-browser Compatible",
        "Mobile First Approach",
        "SEO Optimized"
    ];

    const techStack = [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
        "Node.js"
    ];

    // Gallery images - using placeholder images for demo
    const galleryImages = [
        project.img?.src || project.img, // Main project image
        `https://picsum.photos/800/600?random=${project.index + 1}`,
        `https://picsum.photos/800/600?random=${project.index + 2}`,
        `https://picsum.photos/800/600?random=${project.index + 3}`,
        `https://picsum.photos/800/600?random=${project.index + 4}`,
        `https://picsum.photos/800/600?random=${project.index + 5}`,
    ];

    return (
        <Curve>
            <SEO
                title={`${project.title} | Project Details`}
                description={`Explore the details of ${project.title}, a creative project showcasing modern web development and design.`}
                image={project.img?.src || project.img}
                url={`https://azizkhaldiportfolio.vercel.app/project/${project.slug || slugify(project.title)}`}
            />

            <div className="project-details font-cabinetGrotesk cursor-default  relative flex flex-col  ">
                <Navbar />

                {/* Hero Header Section */}
                <div className=" relative">
                    {/* Header Content */}
                    <div className="pt-20 pb-8">
                        <div className="max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start justify-between mb-8 lg:mb-12">
                                {/* Left Column - Project Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="w-full lg:w-auto"
                                >
                                    <h1 className="font-cabinetGrotesk text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-bold leading-tight lg:leading-none">
                                        {project.title}
                                    </h1>
                                </motion.div>

                                {/* Right Column - Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="lg:pt-8 space-y-2 text-start lg:text-end w-full lg:w-auto"
                                >
                                    <h2 className="font-cabinetGrotesk text-lg md:text-xl lg:text-2xl font-normal">
                                        Showcasing creativity
                                    </h2>
                                    <p className="font-cabinetGrotesk text-lg md:text-xl lg:text-2xl italic">
                                        Through outstanding project design
                                    </p>
                                </motion.div>
                            </div>

                            {/* Bottom Row - Scroll & Share */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0"
                            >
                                {/* Scroll to Explore */}
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 md:w-5 md:h-5">
                                        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12l7 7 7-7" />
                                        </svg>
                                    </div>
                                    <span className="font-cabinetGrotesk text-sm md:text-base lg:text-lg">Scroll to Explore</span>
                                </div>

                                {/* Share Links */}
                                <div className="flex items-center gap-4 md:gap-8">
                                    <span className="font-cabinetGrotesk text-sm md:text-base lg:text-lg">Share:</span>
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm md:text-base lg:text-lg hover:opacity-60 transition-opacity"
                                        >
                                            Fb
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&text=${encodeURIComponent(project.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm md:text-base lg:text-lg hover:opacity-60 transition-opacity"
                                        >
                                            Tx
                                        </a>
                                        <a
                                            href={`https://www.pinterest.com/pin/create/button/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&description=${encodeURIComponent(project.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm md:text-base lg:text-lg hover:opacity-60 transition-opacity"
                                        >
                                            Pn
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Hero Image Section */}
                    <div ref={imageContainerRef} style={{ padding: '2rem' }} className="relative overflow-hidden w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-screen px-4 md:px-8 lg:px-20 pb-10 md:pb-20">
                        <motion.div
                            ref={imageRef}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.8 }}
                            className="w-full h-[60vh] md:h-[80vh] lg:h-[100vh] rounded-none overflow-hidden"
                        >
                            <img
                                src={project.img?.src || project.img}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>



                {/* Case Description Section */}
                <div className="project-overview-section mt-24 mb-32">
                    <div className='project-line w-screen h-[1px] bg-black mt-24 mb-12'></div>
                    <div className="max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                        {/* Left Column - Project Title */}


                        {/* Right Column - Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-8 flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12"
                        >
                            {/* Project Description */}
                            <div className="space-y-4 w-full lg:w-1/2 flex flex-col gap-4">
                                <p className="text-base md:text-lg leading-relaxed font-cabinetGrotesk">
                                    {project.description || `Being part of the ${project.title} creative team, I contributed to numerous digital projects.
                                    My responsibilities involved designing engaging content for websites, mobile applications,
                                    and marketing campaigns. With a focus on user experience and modern design principles,
                                    I worked on both primary platforms and microsites, utilizing cutting-edge technologies
                                    for each implementation, while also creating content for various channels and social media.`}
                                </p>
                                {project.Link && project.Link !== "#" && (
                                    <div className="isolate" style={{ contain: 'layout style paint' }}>
                                        <a href={project.Link} target="_blank" rel="noopener noreferrer">
                                            <ButtonEffect
                                                strength={3.7}
                                                Style="lg:px-[1.5rem] px-[2.8rem] lg:py-3 py-4 flex gap-2 border-[1px] border-black text-black hover:border-0 lg:text-base text-sm project-button"
                                            >
                                                <span className="flex items-center gap-4">
                                                    Go to Website <ArrowIcon className="h-5 w-5" />
                                                </span>
                                            </ButtonEffect>
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="justify-start flex flex-col gap-4 w-full lg:w-auto">
                                {/* Client Information */}
                                {project.client && (
                                    <div className="space-y-2">
                                        <h3 className="text-base md:text-lg font-semibold font-cabinetGrotesk">Client</h3>
                                        <p className="text-base mix-blend-difference md:text-lg ">
                                            {project.client}
                                        </p>
                                    </div>
                                )}

                                {/* Skill Tags */}
                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {project.techStack.slice(0, 4).map((tech, index) => (
                                            <span key={index} className="skill-tag px-3 md:px-4 py-1.5 md:py-2 bg-black text-white text-xs md:text-sm font-medium rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Two Images Section */}
                    <div className="mt-24 max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="overflow-hidden rounded-lg"
                            >
                                <img
                                    src={project?.galleryImages[0]?.src}
                                    alt="Project detail 1"
                                    className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover"
                                />

                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="overflow-hidden rounded-lg"
                            >
                                <img
                                    src={project?.galleryImages[1].src}
                                    alt="Project detail 2"
                                    className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Tech Stack Section */}
                    {project.techStack && project.techStack.length > 0 && (
                        <div className="mt-24 max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                                {/* Left Column - Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="lg:sticky lg:top-32"
                                >
                                    <h2 className="font-cabinetGrotesk text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                        Tech Stack
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-300 mt-3 leading-relaxed">
                                        Technologies and tools used to bring this project to life
                                    </p>
                                </motion.div>

                                {/* Right Column - Tech Stack */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-wrap gap-3">
                                        {project.techStack.map((tech, index) => (
                                            <motion.div
                                                key={tech}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                                viewport={{ once: true }}
                                                className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
                                            >
                                                {tech}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}

                    {/* Images Before My Role Section */}
                    <div className="mt-24">
                        <div className="grid grid-cols-1 gap-4 md:gap-8">
                            {!project.video && !project.imagesSection && <motion.div
                            >
                                <img
                                    ref={containerRef}
                                    src={project?.imageSection?.src}
                                    alt="VexLogic ai assistant"
                                    className="w-full px-4 md:px-8 h-full object-contain"
                                />
                            </motion.div>}


                            {project.video && (
                                <div
                                    ref={containerRef}
                                    className="w-full h-[50vh] md:h-[70vh] lg:h-[100vh] px-4 md:px-8 rounded-xl overflow-hidden"
                                    style={{ borderRadius: "1rem" }}>
                                    <video
                                        ref={videoRef}
                                        style={{ borderRadius: "1rem" }}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                    >
                                        <source src={project.video} type="video/mp4" />
                                    </video>
                                </div>
                            )}
                        </div>
                    </div>

                    {project.imagesSection && (
                        <div ref={sectionRef} className="flex  lg:gap-8  gap-3  lg:px-8 px-3 mt-24">
                            {project.imagesSection.map((mediaSrc, index) => {
                                // Get the actual source path (handle both string and object with .src)
                                const srcPath = typeof mediaSrc === 'string' ? mediaSrc : (mediaSrc?.src || mediaSrc);
                                
                                // Check if the media is a video by checking the file extension
                                const isVideo = typeof srcPath === 'string' && 
                                    (srcPath.toLowerCase().endsWith('.mp4') || 
                                     srcPath.toLowerCase().endsWith('.webm') || 
                                     srcPath.toLowerCase().endsWith('.ogg'));

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                        className={`w-full overflow-hidden rounded-lg scroll-img ${isVideo ? 'bg-black' : ''}`}
                                    >
                                        {isVideo ? (
                                            <video
                                                src={srcPath}
                                                className="w-full h-[30vh] md:h-[50vh] lg:h-[100vh] object-contain"
                                                controls
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            >
                                                <source src={srcPath} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img
                                                src={srcPath}
                                                alt={`Project detail ${index + 3}`}
                                                className="w-full h-[30vh] md:h-[50vh] lg:h-[100vh] object-cover"
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )
                    }

                    {/* My Role Section */}
                    {(project.role || project.keyResponsibilities || project.impact) && (
                        <div className="my-role-section mt-24 max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-3 items-start">
                                {/* Left Column - Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="lg:sticky lg:top-32"
                                >
                                    <h2 className="font-cabinetGrotesk text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                        My Role
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-700 mt-3 leading-relaxed">
                                        My contributions and responsibilities in this project
                                    </p>
                                </motion.div>

                                {/* Right Column - Role Details */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="space-y-8"
                                >
                                    {/* Role Description */}
                                    {project.role && (
                                        <div className="space-y-4">
                                            <p className="font-cabinetGrotesk text-lg leading-relaxed">
                                                {project.role}
                                            </p>
                                        </div>
                                    )}

                                    {/* Responsibilities */}
                                    {project.keyResponsibilities && project.keyResponsibilities.length > 0 && (
                                        <div className="space-y-2">
                                            <h3 className="font-cabinetGrotesk text-xl font-semibold">Key Responsibilities</h3>
                                            <div className="space-y-3">
                                                {project.keyResponsibilities.map((responsibility, index) => (
                                                    <p key={index} className="font-cabinetGrotesk text-base leading-relaxed">
                                                        • {responsibility}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Role Information */}
                                    {project.impact && project.impact.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="font-cabinetGrotesk text-xl font-semibold">Project Impact</h3>
                                            <div className="space-y-1">
                                                {project.impact.map((impactItem, index) => (
                                                    <p key={index} className="font-cabinetGrotesk text-base leading-relaxed">
                                                        • {impactItem}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    )}

                    {/* Other Projects Section */}
                    <div className="mt-24 mb-32">
                        {/* Curved Loop Animation */}
                        <div className="mb-16">
                            <CurvedLoop
                                marqueeText="Other Projects ✦ Explore More ✦ Creative Work ✦"
                                speed={2}
                                curveAmount={300}
                                direction="left"
                                interactive={true}
                                className="curved-text-white"
                            />
                        </div>

                        {/* View Toggle Buttons */}
                        <div className="flex justify-end gap-3 mb-10 px-[1rem] lg:px-[2rem]">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-full font-semibold transition-all duration-300 ${viewMode === 'grid'
                                    ? 'bg-white text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                title="Grid View"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('flowing')}
                                className={`p-3 rounded-full font-semibold transition-all duration-300 ${viewMode === 'flowing'
                                    ? 'bg-white text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                title="Flowing View"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Content Area - Conditional Rendering */}
                        {viewMode === 'flowing' ? (
                            <div className="max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                                <div style={{ height: '600px', position: 'relative' }}>
                                    <FlowingMenu items={worksObj
                                        .filter((_, index) => index !== project.index)
                                        .slice(0, 6)
                                        .map(item => ({
                                            link: `/project/${slugify(item.title)}`,
                                            text: item.title,
                                            image: item.img?.src || item.img
                                        }))}
                                    />
                                </div>
                                {/* View All Projects Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-center mt-12"
                                >
                                    <Link href="/works">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 text-sec rounded-full font-medium transition-all duration-300 border border-sec hover:border-sec/80"
                                        >
                                            View All Projects
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="max-w-8xl mx-auto px-[1rem] lg:px-[2rem]">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {worksObj
                                        .filter((_, index) => index !== project.index) // Exclude current project
                                        .slice(0, 6) // Show only 6 other projects
                                        .map((otherProject, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ y: -10 }}
                                                className="group cursor-pointer"
                                            >
                                                <Link href={`/project/${slugify(otherProject.title)}`}>
                                                    <div className="bg-white/10 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300">
                                                        {/* Project Image */}
                                                        <div className="aspect-[4/3] overflow-hidden">
                                                            <img
                                                                src={otherProject.img?.src || otherProject.img}
                                                                alt={otherProject.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>

                                                        {/* Project Info */}
                                                        <div className="p-6">
                                                            <h3 className="text-xl font-bold mb-2 group-hover:text-white/80 transition-colors">
                                                                {otherProject.title}
                                                            </h3>
                                                            <p className="text-white/70 text-sm mb-3">
                                                                {otherProject.time}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-white/60 group-hover:text-white/80 transition-colors">
                                                                <span className="text-sm">View Project</span>
                                                                <motion.div
                                                                    className="w-4 h-4"
                                                                    whileHover={{ x: 3 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <ArrowIcon />
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                </div>

                                {/* View All Projects Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-center mt-12"
                                >
                                    <Link href="/works">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 hover:border-white/40"
                                        >
                                            View All Projects
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            <Footer />
        </Curve>
    );
};

export default ProjectDetails;
