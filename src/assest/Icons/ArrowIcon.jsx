export const ArrowIcon = ({ className = "h-6 w-6 ml-2 text-current" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_1460_2346)">
          <path
            d="M31.7261 15.9148C25.2964 15.9148 20.0781 10.5769 20.0781 3.99988"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M31.7261 15.9149C25.2964 15.9149 20.0781 21.2528 20.0781 27.8298"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M32 15.9147L0 15.9147"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
        </g>
        <defs>
          <clipPath id="clip0_1460_2346">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };
  
  export default ArrowIcon;