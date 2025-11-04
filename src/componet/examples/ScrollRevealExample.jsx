import React from 'react';
import ScrollReveal from '../gsap/ScrollReveal';

const ScrollRevealExample = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Basic Usage */}
        <section>
          <h1 className="text-2xl font-bold mb-8 text-center">ScrollReveal Component Examples</h1>
          
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            When does a man die? When he is hit by a bullet? No! When he suffers a disease?
            No! When he ate a soup made out of a poisonous mushroom?
            No! A man dies when he is forgotten!
          </ScrollReveal>
        </section>

        {/* Custom Styling */}
        <section>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={false}
            baseRotation={2}
            containerClassName="my-custom-container"
            textClassName="text-blue-600 font-light"
          >
            This is a custom styled ScrollReveal with no blur effect and custom colors.
            Perfect for descriptions and important text sections.
          </ScrollReveal>
        </section>

        {/* Portfolio Description */}
        <section>
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={6}
            textClassName="text-gray-800"
          >
            I'm a passionate frontend developer who specializes in creating beautiful, 
            interactive web experiences. With expertise in React, Next.js, and modern 
            animation libraries, I bring designs to life with smooth transitions and 
            engaging user interfaces.
          </ScrollReveal>
        </section>

        {/* Skills Section */}
        <section>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={4}
            blurStrength={8}
            textClassName="text-purple-700 font-semibold"
          >
            My skills include React development, GSAP animations, Three.js 3D graphics, 
            responsive design, and creating pixel-perfect implementations from Figma designs.
          </ScrollReveal>
        </section>

        {/* Quote Section */}
        <section>
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={6}
            blurStrength={12}
            containerClassName="border-l-4 border-indigo-500 pl-6"
            textClassName="text-gray-700 italic"
          >
            "The best way to predict the future is to create it. Every line of code, 
            every animation, every user interaction is a step towards building 
            something extraordinary."
          </ScrollReveal>
        </section>

        <div className="h-96"></div> {/* Spacer for scroll testing */}
      </div>
    </div>
  );
};

export default ScrollRevealExample; 