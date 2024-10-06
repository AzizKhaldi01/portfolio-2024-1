function LoadingBtn({ isLoading, BgColor , color , scale  , rounded }) {
  return (
    <span
      className={ ` ${
        isLoading ? "flex " : " hidden"
      } absolute  items-center justify-center  ${
        BgColor || "bg-main"
      }  ${rounded ? "rounded-full":"rounded-lg"}   w-full h-full top-0 right-0`}
    >
      <span className= {`${scale || 'scale-[.3]' }   w-full`} >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          fill={ color || "white"}
          stroke={ color || "white"}
          strokeWidth="15"
          r="15"
          cx="40"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill={ color || "white"}
          stroke={ color || "white"}
          strokeWidth="15"
          r="15"
          cx="100"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill={ color || "white"}
          stroke={ color || "white"}
          strokeWidth="15"
          r="15"
          cx="160"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
      </span>
      
    </span>
  );
}

export default LoadingBtn;
