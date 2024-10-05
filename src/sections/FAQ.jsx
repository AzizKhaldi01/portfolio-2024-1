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
      question: "What technologies do you specialize in as a front-end developer?",
      answer: "I specialize in HTML, CSS, and JavaScript, with a strong focus on frameworks like React and Next.js. I also have experience with Tailwind CSS for styling and GSAP for animations.",
    },
    {
      question: "What is your approach to responsive design?",
      answer: "I believe in creating mobile-first designs that adapt seamlessly to various screen sizes. I use flexible grid layouts, media queries, and responsive units to ensure a consistent user experience across devices.",
    },
    {
      question: "How do you ensure your web applications are accessible?",
      answer: "I prioritize accessibility by following WCAG guidelines, using semantic HTML, providing alt text for images, and ensuring keyboard navigation. I also conduct usability testing with diverse user groups to gather feedback.",
    },
    {
      question: "Can you describe a challenging project you've worked on?",
      answer: "One challenging project involved creating a complex dashboard with real-time data visualization. I utilized React for the UI and integrated APIs to fetch data dynamically. It was rewarding to see users interact with the application smoothly.",
    },
    {
      question: "Do you include sexual content or images of naked or half-naked individuals in your projects?",
      answer: "No, I maintain a professional and respectful approach in all my work, in line with my personal values. I avoid including any sexual content or inappropriate images, ensuring that my projects remain suitable for all audiences.",
    },
  ];

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".FAQ", // Element to trigger the scroll animation
        start: "top 60%", // When to start the animation (adjust as needed)
        scrub: true, // If true, the animation follows the scroll progress
      }
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
      <PageTitle title={"FAQ"} />
     
    </div>
      <div className=" w-[97vw]  lg:w-[60vw] rounded-lg  p-4">
        {faqItems.map((itemData, index) => (
          <div
            key={index}
            className=" faqitem border-b border-gray-200"
            ref={(el) => (faqRefs.current[index] = el)} // Save refs for animation
          >
            <button
              onClick={() => handleToggleAnswer(index)}
              className="w-full text-left flex justify-between items-center py-4  lg:text-lg font-semibold text-gray-700 hover:text-thr transition-colors"
            >
              {itemData.question}
              <span className= { `text-2xl`}>
                {openIndex === index ? "−" : "+"}
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
