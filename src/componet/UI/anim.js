export const text = {
  initial: {
    opacity: 1,
    x: "-50%",
    y: "-50%",
    scale: 1,
  },
  enter: {
    opacity: 0,
    x: "-50%",
    y: "calc(-50% - 50px)",
    scale: 0.9,
    transition: { 
      duration: 0.5, 
      delay: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
  exit: {
    opacity: 1,
    x: "-50%",
    y: "-50%",
    scale: 1,
    transition: { 
      duration: 0.3, 
      delay: 0.1, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};


export const curve = (initialPath, targetPath) => {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  };
};

export const translate = {
  initial: {
    top: "-300px",
  },
  enter: {
    top: "-100vh",
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: "100vh",
    },
  },
  exit: {
    top: "-300px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};
