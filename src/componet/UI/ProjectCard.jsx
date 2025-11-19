import React, { useState } from "react";

const HoverFlipText = ({ isHovered, className, children }) => (
  <div className={className}>{children}</div>
);

const AnimatedTitle = ({ title, isHovered }) => {
  const chars = title.split('');
  const textSize = !title.length > 6 ? 'text-4xl md:text-6xl' : 'text-2xl md:text-5xl';
  
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {chars.map((char, i) => (
        <span
          key={i}
          className={`inline-block text-thr ${textSize} transition-all duration-500`}
          style={{
            clipPath: isHovered 
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              : 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transitionDelay: `${i * 30}ms`,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            opacity: isHovered ? 1 : 0
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index, hoveredProject, setHoveredProject }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const title = project?.title || "New Project";
  const imgSrc = project?.img?.src || project?.img ;

  return (
    <div className="group">
      <div className="mb-4">
        <HoverFlipText
          isHovered={hoveredProject === index || isImageHovered}
          className="text-2xl  md:hidden block  md:text-4xl font-medium text-gray-800 mb-2"
        >
          {title}
        </HoverFlipText>
        <HoverFlipText
          isHovered={hoveredProject === index || isImageHovered}
          className="text-gray-600 text-base md:text-lg font-light"
        >
          {project?.Subtitle}
        </HoverFlipText>
      </div>

      <a
        href={`/project/${project.slug}`}
        className="block relative overflow-hidden aspect-[4/3] cursor-pointer"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: isImageHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{
            opacity: isImageHovered ? 0.4 : 0
          }}
        />
        
        {/* Animated Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <AnimatedTitle title={title} isHovered={isImageHovered} />
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;