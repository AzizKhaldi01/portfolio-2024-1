import React from "react";
import FlipLink from "./FlipLink";

const ButtonNew = ({
  text = "Live Website",
  onClick,
  link,
  className = ""
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={() => {
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        } else if (onClick) {
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center cursor-pointer select-none"
    >
      {/* Main Button */}
      <button
        className={`group relative inline-flex items-center gap-3 bg-thr  text-black  font-medium text-lg px-8 py-4 rounded-full transition-all duration-300 hover:gap-4 ${className}`}
      >
        <FlipLink isHovered={isHovered}>{text}</FlipLink>
      </button>

      {/* Arrow Circle */}
      <div
  className="hidden md:flex w-14 h-14 bg-thr rounded-full items-center justify-center overflow-hidden relative"
>
  {/* Arrow 1 – default, moves to top-right */}
  <svg
    className={`w-5 h-5 text-black absolute transition-all duration-300 ${
      isHovered
        ? "-translate-y-full translate-x-full opacity-0"
        : "translate-y-0 translate-x-0 opacity-100"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7 17L17 7M17 7H7M17 7v10"
    />
  </svg>

  {/* Arrow 2 – comes from bottom-left */}
  <svg
    className={`w-5 h-5 text-black absolute transition-all duration-300 ${
      isHovered
        ? "translate-y-0 translate-x-0 opacity-100"
        : "translate-y-full -translate-x-full opacity-0"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7 17L17 7M17 7H7M17 7v10"
    />
  </svg>
</div>

    </div>
  );
};

export default ButtonNew;
