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
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    time: 2024,
    bg: "#8B5CF6",
    Link: "#",
    color: "text-[#8B5CF6]",
    img: superhostLap,
    galleryImages: [
      "../../assest/Images/project/e-commerce-platform-01.jpeg",
      "../../assest/Images/project/e-commerce-platform-02.jpeg",
      "../../assest/Images/project/e-commerce-platform-03.jpeg",
    ],
  },
  {
    slug: "vexlogic-ai-assistant",
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
    title: "VexLogic Business Expender",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://vexlogic.com/",
    color: "text-[#51c18f]",
    img: vexlogicbusiness,
    galleryImages: [vexlogicBusinessImage01, vexlogicBusinessImage02],
    video: vexlogicBusinessVideo,
  },
  {
    slug: "techivation",
    title: "Techivation",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://techivation.com/",
    color: "text-[#51c18f]",
    img: techivationImage01,
    galleryImages: [techivationImage02, techivationImage03],
    imageSection: techivationImage04,
  },
  {
    slug: "comra",
    title: "Comra",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://comra.ai/",
    color: "text-[#51c18f]",
    img: comraImage01,
    video: comraVideo,
    galleryImages: [comraImage03, comraImage02],

  },
  {
    slug: "comra-dashboard",
    title: "Comra Dashboard",
    time: 2023,
    bg: "bg-[#51c18f]",
    Link: "https://comra.ai/",
    color: "text-[#51c18f]",
    galleryImages: [comraDashImage01, comraDashImage02],
    img: comraDashboard,
    video: comraDashboardVideo,
  },
  {
    slug: "siradatia-cv-builder",
    title: "SiraDatia CV Builder",
    time: 2024,
    bg: "#10B981",
    Link: "#",
    color: "text-[#10B981]",
    img: siraDatiaImage01, // replace with your thumbnail image
    video: siraDatiaVideo, // optional
    galleryImages: [
      siraDatiaImage02,
      siraDatiaImage03,
    ],
  },
  {
    slug: "reservado",
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
    title: "Superhost",
    time: 2024,
    bg: "#51c18f",
    Link: "https://superhost.com.tn/",
    color: "text-[#51c18f]",
    img: superHostImage01,
    galleryImages: [superHostImage02, superHostImage03],
    video: superhostVideo,
  },
  {
    slug: "fintechracy",
    title: "Fintechracy",
    time: 2023,
    bg: "#08C66C",
    Link: "https://fintechracy.org/",
    color: "text-[#08C66C]",
    img: FintechracyImage03,
    galleryImages: [FintechracyImage01, FintechracyImage02],
    imagesSection: [
      FintechracyImage04,
      FintechracyImage05,
      FintechracyImage06
    ]
  },
  {
    slug: "ftr-client",
    title: "FTR-Client",
    time: 2023,
    bg: "#ff5a5f",
    Link: "https://ftrclient.fintechracy.org/",
    color: "text-[#ff5a5f]",
    img: ftrClientImage01,
    galleryImages: [ftrClientImage03, ftrClientImage02],
    imagesSection: [ftrClientImage04, ftrClientVideo, ftrClientImage05],
  },
  {
    slug: "vexlogic-ai-assistant-website",
    title: "VexLogic AI Assistant Website",
    time: 2023,
    bg: "#ff5a5f",
    Link: "https://vexlogic.ai/",
    color: "text-[#ff5a5f]",
    img: vexlogicAiAssistantWebsiteImage01,
    galleryImages: [vexlogicAiAssistantWebsiteImage02, vexlogicAiAssistantWebsiteImage03],
    imageSection: vexlogicAiAssistantWebsiteImage04,
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

