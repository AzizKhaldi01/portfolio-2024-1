import superhostLap from "../../assest/Images/WorksPage/superHost.jpg";
import vexlogicaiassistant from "../../assest/Images/work/p-vexlogic-ai-assistant.jpg";
import vexlogicbusiness from "../../assest/Images/work/p-vexlogic-business-expander.jpg";


import comraDashboard from "../../assest/Images/work/comra-dash-image-01.jpg";
import comraDashImage01 from "../../assest/Images/work/comra-dash-image-02.jpg";
import comraDashImage02 from "../../assest/Images/work/comra-dash-image-03.jpg";

import ftrClientImage01 from "../../assest/Images/work/ftr-client-image-03.jpg";
import ftrClientImage02 from "../../assest/Images/work/ftr-client-image-01.jpg";
import ftrClientImage03 from "../../assest/Images/work/ftr-client-image-02.jpg";
import ftrClientImage04 from "../../assest/Images/work/ftr-client-screenshot-02.png";
import ftrClientImage05 from "../../assest/Images/work/ftr-client-screenshot-04.png";


import superHostImage02 from "../../assest/Images/work/super-host-image-02.jpg";
import superHostImage03 from "../../assest/Images/work/super-host-image-03.jpg";
import superHostImage01 from "../../assest/Images/work/super-host-phone.jpg";

import vexlogicAiAssistantImage01 from "../../assest/Images/work/vexlogic_ai_phone_mockup_01.jpg";
import vexlogicAiAssistantImage02 from "../../assest/Images/work/vexlogic_ai_phone_mockup.jpg";

import vexlogicAiAssistantWebsiteImage01 from "../../assest/Images/work/vexlogic-ai-image-01.jpg";
import vexlogicAiAssistantWebsiteImage02 from "../../assest/Images/work/vexlogic-ai-image-02.jpg";
import vexlogicAiAssistantWebsiteImage03 from "../../assest/Images/work/vexlogic-ai-image-03.jpg";
import vexlogicAiAssistantWebsiteImage04 from "../../assest/Images/work/vexlogic-ai-image-04.jpeg";

import vexlogicBusinessImage01 from "../../assest/Images/work/vexlogic_business_laptop.jpg";
import vexlogicBusinessImage02 from "../../assest/Images/work/vexlogic_business_phone.jpg";

import reservadoImageO1 from "../../assest/Images/work/reservado-image-01.png";
import reservadoImageO2 from "../../assest/Images/work/reservado-image-02.jpg";
import reservadoImageO3 from "../../assest/Images/work/reservado-image-03.png";

import siraDatiaImage01 from "../../assest/Images/work/siraDatia-image-01.png";
import siraDatiaImage02 from "../../assest/Images/work/siraDatia-image-02.png";
import siraDatiaImage03 from "../../assest/Images/work/siraDatia-image-03.png";

import comraImage01 from "../../assest/Images/work/comra-image-01.jpg";
import comraImage02 from "../../assest/Images/work/comra-image-04.png";
import comraImage03 from "../../assest/Images/work/comra-image-05.png";

import techivationImage01 from "../../assest/Images/work/techivation-image-01.jpg";
import techivationImage02 from "../../assest/Images/work/techivation-image-02.jpg";
import techivationImage03 from "../../assest/Images/work/techivation-image-03.jpg";
import techivationImage04 from "../../assest/Images/work/techivation-image-04.png";


import FintechracyImage01 from "../../assest/Images/work/fintechracy-image-01.png";
import FintechracyImage02 from "../../assest/Images/work/fintechracy-image-02.png";
import FintechracyImage03 from "../../assest/Images/work/fintechracy-image-03.png";
import FintechracyImage04 from "../../assest/Images/work/fintechracy-image-04.jpg";
import FintechracyImage05 from "../../assest/Images/work/fintechracy-image-05.png";
import FintechracyImage06 from "../../assest/Images/work/fintechracy-image-06.png";




// Video
import superhostVideo from "../../../public/videos/super-host.mp4";
import vexlogicBusinessVideo from "../../../public/videos/vexlogic-business-video.mp4";
import comraDashboardVideo from "../../../public/videos/comra-dash.mp4";
import siraDatiaVideo from "../../../public/videos/siraDatia-video.mp4";
import reservadoVideo from "../../../public/videos/reservado-video.mp4";
import comraVideo from "../../../public/videos/comra-video.mp4";
import vexlogicAiVideo from "../../../public/videos/vexlogic-ai-video.mp4";
import ftrClientVideo from "../../../public/videos/ftr-client-video.mp4";

export const worksObj = [
  {
    slug: "vexlogic-ai-assistant",
    Subtitle: "AI Assistant",
    title: "VexLogic AI Assistant",
    time: 2023,
    bg: "bg-[#ff5a5f]",
    Link: "https://vexlogic.ai/",
    color: "text-[#ff5a5f]",
    img: vexlogicaiassistant,
    galleryImages: [vexlogicAiAssistantImage01, vexlogicAiAssistantImage02],
    video: vexlogicAiVideo,
    description: `An AI-powered SaaS platform that enables businesses to deploy intelligent chat assistants capable of contextual reasoning, document understanding, and real-time user engagement. Built with a high-performance Go backend and a modern React frontend, the platform combines advanced AI integration with a clean, responsive UI.`,
    client: "VexLogic – AI SaaS Platform",
    role: "Full-Stack Developer & AI Integrator",
    keyResponsibilities: [
      "Collaborated with a team of 2 developers using Git and GitHub for version control, code reviews, and feature-based branching.",
      "Developed a scalable backend in Go (Golang) with RESTful APIs for authentication, AI processing, and subscription management.",
      "Implemented a Retrieval-Augmented Generation (RAG) system using vector embeddings for contextual knowledge retrieval.",
      "Integrated OpenAI API for dynamic conversational logic and intelligent document summarization.",
      "Integrated Stripe for subscription and payment management with automated webhook handling.",
      "Built an interactive frontend using React, Shadcn/UI, and Tailwind CSS, ensuring design consistency and responsiveness.",
      "Managed state efficiently with React Query and Zustand for seamless user experience.",
      "Optimized performance and API routing with OpenRoute and serverless deployment.",
      "Implemented secure authentication and authorization using JWT and refresh tokens.",
      "Deployed and maintained Dockerized Go microservices with CI/CD pipelines for continuous delivery."
    ],
    impact: [
      "Implemented real-time document cleaning and organization updates using WebSockets, enabling live feedback as the AI processes user data.",
      "Engineered advanced prompt templates that guide the AI to structure and clean uploaded documents intelligently and contextually.",
      "Reduced AI response latency by over 40% through optimized RAG retrieval and Go concurrency patterns.",
      "Enabled automated subscription lifecycle management and billing via Stripe webhooks.",
      "Enhanced collaboration efficiency and development velocity through Git-based team workflows and code reviews.",
      "Delivered a smooth, minimal, and highly responsive interface using Shadcn and Tailwind.",
      "Established a scalable, modular architecture ready for multi-tenant SaaS deployment."
    ],
    techStack: [
      "Go (Golang)",
      "React",
      "Next.js",
      "RAG (Retrieval-Augmented Generation)",
      "OpenAI API",
      "Stripe API",
      "WebSockets",
      "Tailwind CSS",
      "Shadcn/UI",
      "React Query",
      "Zustand",
      "Docker",
      "PostgreSQL",
      "OpenRoute",
      "CI/CD Pipelines",
      "Git & GitHub (Team Collaboration)"
    ]
  }
  ,
  {
    slug: "vexlogic-bussiness-expender",
    Subtitle: "Bussiness",
    title: "VexLogic Business Expender",
    time: 2024,
    bg: "bg-[#51c18f]",
    Link: "https://vexlogic.com/",
    color: "text-[#51c18f]",
    img: vexlogicbusiness,
    galleryImages: [vexlogicBusinessImage01, vexlogicBusinessImage02],
    video: vexlogicBusinessVideo,
    description: `A powerful SaaS platform for lead generation, AI-powered research, and automated email campaigns. Built as a multi-tenant system, it helps businesses expand their reach by automating the entire process — from discovering leads to launching personalized email workflows, tracking engagement, and managing subscriptions in real time.`,
    client: "VexLogic – Internal SaaS Platform",
    role: "Full-Stack Developer (Frontend & Backend)",
    keyResponsibilities: [
      "Architected a scalable monorepo setup with Fastify, tRPC, and React.",
      "Developed type-safe backend APIs using Drizzle ORM with PostgreSQL.",
      "Implemented AI-powered lead research using OpenAI API and BullMQ queues.",
      "Built a real-time dashboard using WebSocket subscriptions and TanStack Query.",
      "Integrated Stripe for subscription and payment automation with secure webhook handling.",
      "Designed a responsive UI using Tailwind CSS, ShadCN UI, and Radix UI primitives.",
      "Created modular and reusable frontend components with full TypeScript type safety.",
      "Implemented JWT authentication, role-based access control, and secure token refresh flow.",
      "Developed background job queues for automation workflows and email sending.",
      "Configured Redis caching, session management, and graceful queue shutdown handling.",
      "Led deployment and server configuration using VPS, PM2 process manager, and Nginx reverse proxy.",
      "Collaborated with a small team of two developers using Git version control and code reviews.",
    ],
    impact: [
      "Reduced manual lead processing time by over 80% through background job automation.",
      "Improved data consistency and scalability with fully type-safe end-to-end communication (tRPC).",
      "Enabled real-time updates via WebSockets for live campaign tracking and job progress.",
      "Delivered a production-ready SaaS infrastructure supporting multi-tenancy and subscriptions.",
      "Enhanced performance and reliability through optimized server deployment and monitoring.",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Fastify",
      "tRPC",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "BullMQ",
      "Stripe API",
      "OpenAI API",
      "Tailwind CSS",
      "ShadCN UI",
      "Radix UI",
      "TanStack Query",
      "Jotai",
      "Zod",
      "PM2",
      "Nginx",
      "VPS Deployment",
    ],
  },


  {
    slug: "techivation",
    Subtitle: "3D Visualisation",
    title: "Techivation",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://techivation.com/",
    color: "text-[#51c18f]",
    img: techivationImage01,
    galleryImages: [techivationImage02, techivationImage03],
    imageSection: techivationImage04,
    description: `Techivation is a professional audio-plugin company that provides advanced sound processing tools for music producers and engineers. The website acts as the central hub for plugin showcases, sales, and educational content, offering a seamless and responsive user experience.`,
    client: "Techivation – Audio Plugin Company",
    role: "Lead Full-Stack Developer (Maintenance, Optimization & DevOps)",
    keyResponsibilities: [
      "Led the ongoing maintenance, optimization, and feature development of the existing Techivation web platform.",
      "Enhanced UI/UX smoothness by refactoring critical components and optimizing client-side rendering performance.",
      "Implemented automated workflows to handle content updates, plugin data synchronization, and cache regeneration.",
      "Integrated PostgreSQL with Prisma ORM for reliable and efficient data querying.",
      "Improved Sanity CMS workflows for streamlined blog and product updates by the marketing team.",
      "Configured Supabase for authentication, storage, and user management operations.",
      "Integrated and managed Stripe and PayPal APIs for secure one-time plugin and bundle purchases.",
      "Set up and maintained a complete CI/CD pipeline using GitHub + Vercel for continuous integration and deployment.",
      "Configured automated build previews for pull requests, production checks, and error monitoring.",
      "Collaborated with another developer using Git flow, pull requests, and code reviews to ensure code quality and consistency.",
      "Optimized backend endpoints and caching mechanisms to improve site reliability and performance.",
    ],
    impact: [
      "Improved page performance, asset loading, and animation smoothness for a better customer experience.",
      "Reduced deployment friction through an automated CI/CD process that ensures instant previews and stable production releases.",
      "Enhanced SEO and performance metrics using ISR (Incremental Static Regeneration) and optimized images.",
      "Increased operational efficiency through workflow automation and reliable data synchronization pipelines.",
      "Delivered a secure, scalable, and continuously deployed platform that aligns with Techivation’s global audience and brand quality.",
    ],
    techStack: [
      "Next.js",
      "React",
      "Express.js",
      "JavaScript",
      "PostgreSQL",
      "Prisma ORM",
      "Supabase",
      "Sanity CMS",
      "Stripe API",
      "PayPal API",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel Deployment",
      "GitHub CI/CD",
      "Redux Toolkit",
    ],
  },

  {
    slug: "comra",
    Subtitle: "3D Visualisation",
    title: "Comra",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://comra.ai/",
    color: "text-[#51c18f]",
    img: comraImage01,
    video: comraVideo,
    galleryImages: [comraImage03, comraImage02],
    description: `Comra AI is a PropTech platform that converts standard video scans into immersive 3D virtual models of indoor and outdoor spaces using advanced AI — helping real estate and space-visualisation teams create 3D tours without specialist hardware or expertise. :contentReference[oaicite:1]{index=1}`,
    client: "Comra AI – 3D Virtual Tour Platform",
    role: "Frontend 3D Developer (3D Visualisation & Interaction)",
    keyResponsibilities: [
      "Built interactive 3D scenes using Three.js and React Three Fiber to present virtual-tour style environments.",
      "Implemented Gaussian Splatting techniques and optimized mesh/point-cloud rendering to display high-fidelity 3D models on the web.",
      "Used GSAP for smooth transitions and scroll/cursor-driven animations between scene states, enabling fluid user flows across the platform.",
      "Collaborated with designers to translate real-space visual data into immersive web experiences, ensuring brand consistency and intuitive UX.",
      "Optimised WebGL performance for cross-device compatibility, reducing load time, and improving frame rate of 3D scenes.",
      "Created modular 3D-component architecture to enable reuse across various property models and space types.",
    ],
    impact: [
      "Delivered a visually immersive, interactive 3D web experience aligning with Comra’s mission of turning videos into virtual spaces.",
      "Improved rendering performance and user engagement through optimized 3D pipelines and smooth animation flows.",
      "Enabled scalable reuse of 3D modules across multiple property types, thus reducing time to build new models for the marketing team.",
    ],
    techStack: [
      "React",
      "Three.js",
      "React Three Fiber",
      "Gaussian Splatting",
      "GSAP",
      "WebGL",
      "Tailwind CSS",
    ],
  },

  {
    slug: "comra-dashboard",
    Subtitle: "3D Visualisation",
    title: "Comra Dashboard",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://comra.ai/",
    color: "text-[#51c18f]",
    galleryImages: [comraDashImage01, comraDashImage02],
    img: comraDashboard,
    video: comraDashboardVideo,
    description: `Comra Dashboard is the internal management and analytics system powering Comra AI’s operations. It enables teams to manage users, AI-generated 3D models, and large data sets efficiently — providing real-time insights, scalable data processing, and secure role-based access.`,
    client: "Comra AI – Internal Platform",
    role: "Full-Stack Developer",
    keyResponsibilities: [
      "Worked as part of a team of three full-stack developers to build and maintain the Comra internal dashboard.",
      "Developed RESTful APIs using Node.js, Prisma ORM, and PostgreSQL to manage large volumes of project and user data.",
      "Integrated Auth0 for secure authentication, authorization, and role-based access control for multiple user levels.",
      "Implemented data pagination, filtering, and search functionalities to handle big data efficiently across multiple views.",
      "Built interactive, data-driven interfaces in React for analytics, user management, and project tracking.",
      "Deployed backend services and cloud infrastructure on Google Cloud Platform (GCP) to ensure scalability and uptime.",
      "Collaborated on code reviews, feature planning, and CI/CD deployment workflows to maintain a consistent and reliable codebase.",
      "Optimized Prisma queries and database indexes for high-performance data retrieval under heavy usage.",
      "Contributed to backend automation scripts for task scheduling, report generation, and data synchronization.",
    ],
    impact: [
      "Enabled the Comra operations team to handle thousands of AI-generated 3D assets and user records through a fast, organized interface.",
      "Improved backend performance and scalability through optimized Prisma queries and GCP-hosted deployments.",
      "Enhanced security and collaboration across internal teams with robust role-based access via Auth0.",
      "Reduced manual work by automating data tracking and analytics reporting tasks.",
      "Delivered a stable and scalable full-stack system that streamlined Comra’s internal data and operations pipeline.",
    ],
    techStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma ORM",
      "Auth0",
      "Google Cloud Platform (GCP)",
      "Tailwind CSS",
      "Big Data Handling",
      "Pagination & Filtering",
      "RESTful APIs",
      "CI/CD Workflow",
      "Git Collaboration",
    ],
  },

  {
    slug: "siradatia-cv-builder",
    Subtitle: "CV Builder",
    title: "SiraDatia CV Builder",
    time: 2024,
    bg: "bg-[#10B981]",
    Link: "#",
    color: "text-[#10B981]",
    img: siraDatiaImage01,
    video: siraDatiaVideo,
    galleryImages: [
      siraDatiaImage02,
      siraDatiaImage03,
    ],
    description: `
      SiraDatia CV Builder is an AI-powered web application that allows users to create professional CVs dynamically using smart templates and multilingual support. 
      The platform combines an intuitive drag-and-drop interface with real-time customization, document generation, and advanced PDF rendering.
    `,
    techStack: [
      "Next.js 14",
      "React 18",
      "Tailwind CSS",
      "TypeScript",
      "Zustand",
      "Prisma",
      "PostgreSQL",
      "Auth0",
      "GSAP",
      "React Hook Form",
      "Zod",
      "React PDF Renderer",
      "Three.js",
      "LangChain",
      "Google Generative AI",
      "i18next",
      "DND Kit"
    ],
    role: "Full Stack Developer",
    team: "Worked with a small cross-functional team of developers and designers.",
    keyResponsibilities: [
      "Developed AI-assisted CV content generation using LangChain and Google Generative AI",
      "Implemented drag-and-drop resume sections with DND Kit",
      "Built PDF export functionality with React PDF Renderer and html2pdf.js",
      "Created real-time text editing and validation using React Hook Form + Zod",
      "Integrated dynamic theme and language switching with i18next",
      "Designed interactive 3D gradient backgrounds with Three.js and ShaderGradient",
      "Managed data with Prisma and PostgreSQL"
    ],
    impact: [
      "Delivered a polished, production-ready AI CV Builder with an interactive and multilingual user experience",
      "Helped streamline the CV creation process through smart automation and advanced UI motion design",
      "Improved user productivity with AI-powered content suggestions and real-time validation"
    ]
  }
  ,
  {
    slug: "reservado",
    Subtitle: "Property Booking",
    title: "Reservado – Airbnb Clone",
    time: 2024,
    bg: "#25c1ffff",
    Link: "#",
    color: "text-[#F59E0B]",
    img: reservadoImageO1, // replace with your thumbnail image
    galleryImages: [
      reservadoImageO3,
      reservadoImageO2,
    ],
    video: reservadoVideo, // optional
    description: `A full-stack accommodation booking platform inspired by Airbnb, enabling users to explore listings, make reservations, manage properties, and process secure payments. Built using the MERN stack with a modern, responsive UI.`,
    client: "Personal / Full-stack Development Project",
    role: "Full-Stack Developer & UI/UX Designer",
    keyResponsibilities: [
      "Developed RESTful APIs with Express.js and MongoDB",
      "Designed and implemented a responsive React frontend with Tailwind CSS",
      "Integrated Stripe for secure payment processing",
      "Implemented JWT authentication and cookie-based sessions",
      "Created CRUD operations for property listings with image uploads",
      "Built advanced filtering logic for dynamic property search",
      "Optimized app performance using lazy loading and pagination",
    ],
    impact: [
      "Improved UX with smooth booking flow and fast load times",
      "Enhanced data security with encrypted passwords and tokens",
      "Scalable backend architecture for multi-user expansion",
      "Achieved responsive performance across devices",
    ],
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "MUI",
      "Framer Motion",
      "Formik & Yup",
      "JWT",
      "Bcrypt",
      "Multer",
      "Stripe API",
    ],
  },
  {
    slug: "superhost",
    Subtitle: "Property Booking",
    title: "Superhost",
    time: 2024,
    bg: "bg-[#51c18f]",
    Link: "https://superhost.com.tn/",
    color: "text-[#51c18f]",
    img: superHostImage01,
    galleryImages: [superHostImage02, superHostImage03],
    video: superhostVideo,
    description: `
      Superhost is a full-featured property booking platform inspired by Airbnb, built to simplify property management and online reservations.
      It provides both client-facing pages for booking experiences and a robust admin panel for property owners to manage listings and availability.
    `,
    role: "Frontend Developer",
    team: "Worked with one designer and two backend developers.",
    techStack: [
      "React",
      "Tailwind CSS",
      "Google Maps API",
      "Framer Motion",
      "Axios",
      "React Hook Form",
      "React Router",
      "Lazy Loading"
    ],
    keyResponsibilities: [
      "Built client booking pages with dynamic property search and filters",
      "Developed admin dashboard for property creation and management",
      "Implemented advanced multi-step property creation flow similar to Airbnb",
      "Integrated interactive Google Maps with draggable pins to select coordinates",
      "Created date-based pricing management and booking blocking system",
      "Implemented visitor analytics per property for owners",
      "Designed reusable and scalable frontend architecture for maintainability",
      "Optimized performance through code-splitting and lazy loading"
    ],
    impact: [
      "Delivered a responsive, fast, and visually engaging interface that provided a seamless Airbnb-like experience",
      "Improved frontend architecture and code reusability across multiple pages",
      "Enhanced UX optimization and efficient collaboration with backend and design teams to achieve production-quality results"
    ]
  },
  {
    slug: "fintechracy",
    Subtitle: "Digital Receipt",
    title: "Fintechracy",
    time: 2023,
    bg: "bg-[#08C66C]",
    Link: "https://fintechracy.org/",
    color: "text-[#08C66C]",
    img: FintechracyImage03,
    galleryImages: [FintechracyImage01, FintechracyImage02],
    imagesSection: [FintechracyImage04, FintechracyImage05, FintechracyImage06],
    description: `
      Fintechracy is a fintech startup focused on eliminating paper receipts and shifting businesses to digital-receipt and POS solutions. The platform emphasises sustainability, seamless integration into existing infrastructure and modernising retail checkout systems. :contentReference[oaicite:1]{index=1}
    `,
    role: "Frontend Developer",
    team: "Collaborated closely with a designer to implement UI/UX and front-end features.",
    techStack: [
      "React",
      "Tailwind CSS",
      "React Helmet",
      "HTML5",
      "CSS3",
      "EmailJS"
    ],
    keyResponsibilities: [
      "Built responsive landing pages and product showcase highlighting digital receipt solutions",
      "Implemented SEO and meta management using React Helmet",
      "Created interactive UI sections and animations for user engagement",
      "Integrated contact form and email integration via EmailJS for lead capture and outreach",
      "Delivered pixel-perfect design implementation from mockups and design assets"
    ],
    impact: [
      "Delivered a modern, performance-oriented website aligning with Fintechracy's mission to digitise receipts and improve checkout experiences",
      "Enhanced communication and conversion via automated email workflows and improved UX"
    ]
  }
  ,
  {
    slug: "ftr-client",
    Subtitle: "Digital Receipt",
    title: "FTR-Client",
    time: 2023,
    bg: "bg-[#ff5a5f]",
    Link: "https://ftrclient.fintechracy.org/",
    color: "text-[#ff5a5f]",
    img: ftrClientImage01,
    galleryImages: [ftrClientImage03, ftrClientImage02],
    imagesSection: [ftrClientImage04, ftrClientVideo, ftrClientImage05],
    description: `
      FTR-Client is a Progressive Web App (PWA) developed for end-users within the Fintechracy ecosystem. 
      It connects with store POS systems to digitize receipts, deliver real-time notifications, and provide powerful analytics on user spending behavior.
    `,
    role: "Frontend Developer",
    techStack: [
      "React",
      "Tailwind CSS",
      "PWA",
      "Firebase Cloud Messaging",
      "Dexie.js (IndexedDB)",
      "Chart.js",
      "React Context API",
      "i18next (Localization)",
      "Barcode Scanner & Generator",
      "JavaScript (ES6+)"
    ],
    keyResponsibilities: [
      "Developed Progressive Web App with offline support via Dexie for local storage",
      "Implemented barcode scanning and generation for unique client identification",
      "Integrated real-time receipt delivery through Firebase push notifications when POS scans client barcode",
      "Built automatic syncing of digital receipts to user account",
      "Created ability to scan physical receipts and convert them into digital versions stored on the server",
      "Developed spending and financial analytics dashboard powered by Chart.js",
      "Implemented multi-language support with i18next for international users",
      "Added Dark and Light mode for accessibility and personalization",
      "Built advanced spending analysis including Spending Overview, Billing Status, Merchant Analysis, Spending Trends, Receipt Type Overview, Environmental Impact, and Total Credit Summary"
    ],
    impact: [
      "Created a user-centric, mobile-ready PWA that enables clients to receive, store, and analyze their receipts digitally",
      "Enhanced user convenience and eco-sustainability by integrating receipt scanning, real-time synchronization, and multilingual accessibility",
      "Improved user engagement with comprehensive spending analytics and environmental impact tracking"
    ]
  }
,  
  {
    slug: "vexlogic-ai-assistant-website",
    Subtitle: "AI Assistant",
    title: "VexLogic AI Assistant Website",
    time: 2024,
    bg: "#131212",
    Link: "https://vexlogic.ai/",
    color: "text-[#00E5FF]",
    img: vexlogicAiAssistantWebsiteImage01,
    galleryImages: [
      vexlogicAiAssistantWebsiteImage02,
      vexlogicAiAssistantWebsiteImage03
    ],
    imageSection: vexlogicAiAssistantWebsiteImage04,
    description: `An enterprise-level AI assistant website built with a performance-first architecture using Next.js, React, and TypeScript. The project demonstrates advanced SEO, accessibility, and security practices while integrating a headless CMS, real-time animations, and modern UI frameworks.`,
    client: "VexLogic – AI Assistant Platform",
    role: "Full-Stack Developer & UI/UX Engineer (Team of 2 developers with Git collaboration)",
    keyResponsibilities: [
      "Developed the website architecture using Next.js App Router and React with TypeScript",
      "Integrated Sanity CMS for blog and content management with GROQ queries and custom schemas",
      "Implemented structured data, Open Graph tags, and sitemap automation for SEO excellence",
      "Developed dynamic components using ShadCN UI, Radix UI, Tailwind CSS, and Framer Motion",
      "Built 3D and shader-based animations using Three.js, React Three Fiber, and GSAP",
      "Implemented real-time content update features using WebSocket connections",
      "Engineered AI prompt workflows that organize and clean documents efficiently",
      "Integrated Nodemailer for contact form submissions with custom HTML templates",
      "Configured strict Content Security Policy headers and input sanitization with DOMPurify",
      "Optimized performance with ISR, code splitting, image optimization, and aggressive caching"
    ],
    impact: [
      "Improved SEO ranking through advanced metadata and structured schema.org implementation",
      "Enhanced performance with ISR and static generation, achieving near-instant load times",
      "Delivered seamless accessibility and keyboard navigation using Radix primitives",
      "Boosted productivity with CMS-driven workflows and reusable component architecture",
      "Enabled real-time document synchronization via WebSocket integration",
      "Secured communication channels and forms with validation and HTTPS enforcement"
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Radix UI",
      "Framer Motion",
      "GSAP",
      "Three.js",
      "React Three Fiber",
      "Sanity CMS",
      "React Hook Form",
      "Zod",
      "Nodemailer",
      "DOMPurify",
      "next-sitemap",
      "Lucide React",
      "Tabler Icons",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ]
  },

  // {
  //   slug: "fashion",
  //   title: "Fashion",
  //   time: 2022,
  //   bg: "#000000",
  //   Link:
  //     "https://647a9a5d1de3802bb76b0dcc--adorable-panda-b90c31.netlify.app/?fbclid=IwAR3hcXG0VOoafcBepb2iXr09flok0NzKsXzfSXkCld7xpcdvNKpygvNhY8k",
  //   color: "",
  //   img: fashion,
  // },
];

