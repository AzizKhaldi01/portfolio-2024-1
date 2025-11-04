import React, { useState } from 'react'
import LineAnimation from '../components/UI/LineAnimation'

const testimonials = [
  {
    id: 1,
    name: "Mark Ramirez",
    role: "Owner of Luna's Inc",
    company: "Luna's Inc",
    quote: "Quality work delivered consistently. The team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding. They've helped us create a cohesive and compelling brand identity. What sets them apart is their passion for storytelling through design. They work swiftly and demonstrate professionalism throughout.",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Job Ghadzi",
    role: "CEO of Glow Co.",
    company: "Glow Co",
    quote: "Quality Geek LLC has delivered a concept prototype and implemented QA on time, earning positive remarks from the client. The team can quickly understand the client's unique and complex product and offer high-quality solutions. They work swiftly and demonstrate professionalism throughout.",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "Thomas Gala",
    role: "Founder ZenTech Wellness",
    company: "ZenTech",
    quote: "As a fellow creative professional, I have high standards when it comes to design. The team not only met but exceeded those standards. Their approach to our website redesign was nothing short of brilliant and also optimized it for a seamless user experience. They work swiftly and demonstrate professionalism throughout.",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 4,
    name: "Smith Mo",
    role: "CEO of Animance",
    company: "Animance",
    quote: "In the fast-paced world of tech, it's crucial to have a creative partner who can keep up with our innovative ideas. The team helped transform our digital presence with stunning visuals and intuitive design. They work swiftly and demonstrate professionalism throughout.",
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 5,
    name: "Bianca Kamal",
    role: "Senior Freelancer",
    company: "Freelance",
    quote: "Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched in the industry. Highly recommended for anyone looking for top-tier creative work. They work swiftly and demonstrate professionalism throughout.",
    avatar: "/api/placeholder/60/60"
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full py-20 px-6 text-sec bg-mains z-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[400px]">
          
          {/* Left Side - Review Label */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
                REVIEW /
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sec">
                Clutch
              </h2>
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className="lg:col-span-9 relative">
            <div className="space-y-6">
              {/* Quote */}
              <LineAnimation 
                key={currentIndex}
                text={currentTestimonial.quote}
                className="text-sec text-lg md:text-xl font-bold font-cabinetGrotesk lg:text-2xl leading-relaxed font-normal"
                stagger={0.01}
                delay={0}
                duration={1}
                enableBlur={true}
                baseOpacity={0.1}
                blurStrength={4}
              />

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0">
                    <img 
                      src={currentTestimonial.avatar} 
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sec font-cabinetGrotesk font-semibold text-base">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-400 font-cabinetGrotesk text-xs">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-gray-400 transition-colors bg-transparent text-gray-400 hover:text-gray-300"
                    aria-label="Previous testimonial"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-gray-400 transition-colors bg-transparent text-gray-400 hover:text-gray-300"
                    aria-label="Next testimonial"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Testimonials