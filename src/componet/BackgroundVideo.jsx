import assest3d from "../assest/glassyObj.mp4";

const BackgroundVideo = () => {
  return (
    <span className=" item  relative overflow-hidden ">
      <span className=" item  w-full h-[5rem] bg-main absolute  -bottom-[8rem] right-0 z-20  "></span>
      <video
        loop
        className=" item obj3d  w-full h-full   lg:scale-105 scale-[2] object-cover"
        autoPlay
        muted
      >
        <source src={assest3d} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </span>
  );
};

export default BackgroundVideo;
