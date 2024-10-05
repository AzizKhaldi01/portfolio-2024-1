import React, { useEffect } from "react";
import Azizimage from "../../../assest/Images/about/ana.png";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
function MyPic() {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(".pic", {
      height: "75vh",
      backgroundColor: "#1E1E1E",
      scrollTrigger: {
        trigger: ".about-me",
        start: "top bottom",
        end: "center 80%",
        scrub: true,
      },
      duration: 1,
    });
  }, []);

  return (
      <img
      
        className="pic w-full md:w-[65vh] opacity-85  z-[60] md:h-[80vh] h-[50vh]  rounded-md  object-cover "
        src={Azizimage.src} 
        alt=""
      />
  );
}

export default MyPic;
