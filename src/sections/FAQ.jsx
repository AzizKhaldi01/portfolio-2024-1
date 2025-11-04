import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import PageTitle from "@/componet/UI/PageTitle";
import { AnimatePresence, motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);
  const answerRefs = useRef([]);

  const toggleAnswer = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqItems = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in Full-stack technologies such as HTML, CSS, JavaScript, React.js, and Next.js. Additionally, I have experience working with tools like GSAP, Framer Motion, and Tailwind CSS.",
    },
    {
      question: "Can you work with back-end technologies?",
      answer:
        "Yes, while my focus is on Full-stack development, I have a basic understanding of back-end technologies such as Node.js and can collaborate with back-end teams efficiently.",
    },
    {
      question: "Do you have experience with responsive design?",
      answer:
        "Yes, I create fully responsive web applications that work seamlessly across all devices, including desktops, tablets, and mobile phones.",
    },
    {
      question: "Can you implement animations and interactivity?",
      answer:
        "Absolutely! I use GSAP and Framer Motion to implement smooth animations and interactivity for better user experience.",
    },
    {
      question: "Do you follow best practices for performance optimization?",
      answer:
        "Yes, I prioritize performance optimization using techniques like lazy loading, code splitting, and minimizing render blocking resources to ensure fast and smooth experiences.",
    },
    {
      question: "Are you open to freelance or contract work?",
      answer:
        "Yes, I'm open to both freelance and contract work, and I'm always excited to take on new projects and challenges.",
    },
    {
      question: "Do your projects contain inappropriate or explicit content?",
      answer:
        "No, I uphold a professional standard in all my work, aligned with my personal and ethical values. My projects do not include any sexual or inappropriate content, ensuring they remain respectful and suitable for all audiences.",
    },
  ];

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".FAQ", // Element to trigger the scroll animation
        start: "top 60%", // When to start the animation (adjust as needed)
        scrub: true, // If true, the animation follows the scroll progress
      },
    });

    faqRefs.current.forEach((item, index) => {
      timeline.fromTo(
        ".faqitem",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: index * 0.1,
        },
        0 // Start all animations at the same time
      );
    });

    gsap.to(".faq_item", {
      scrollTrigger: {
        trigger: ".faq_item",
        start: "top 90%",
      },
      y: -20,
      opacity: 1,

      stagger: 0.05,
      ease: "power3.inOut",
      duration: 1,
    });

    return () => {
      timeline.kill(); // Clean up the timeline on component unmount
    };
  }, []);

  const handleToggleAnswer = (index) => {
    if (index == openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="  w-full items-center justify-center flex flex-col  mb-10  mx-auto p-6">
      <div className=" w-[70vw] ">
        <PageTitle 
          title={"FAQ"} 
          subtitle="Find answers to common questions about my services and process"
        />
      </div>
      <div className=" w-[97vw] pt-10  lg:w-[60vw] rounded-lg  p-4">
        {faqItems.map((itemData, index) => (
          <div
            style={{
              y: 50,
            }}
            key={index}
            className=" faq_item opacity-0 border-b border-gray-200"
            ref={(el) => (faqRefs.current[index] = el)} // Save refs for animation
          >
            <button
              onClick={() => handleToggleAnswer(index)}
              className="w-full text-left flex justify-between items-center py-4  lg:text-lg font-semibold text-gray-700 hover:text-thr transition-colors"
            >
              {itemData.question}
              <span className={`text-2xl`}>
               
                <svg
                className={`   duration-150 text-black  h-6 w-6 ${openIndex === index ? "rotate-[135deg]" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="text-gray-600 pb-4">{itemData.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
