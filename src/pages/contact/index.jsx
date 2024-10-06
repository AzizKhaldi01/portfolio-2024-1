// pages/contact.js or app/contact/page.js
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Curve from "@/componet/UI/NavCurve";
import Footer from "@/componet/Footer/Footer";
import Navbar from "@/componet/Navbar";
import { useEffect, useState } from "react";
import gsap from "gsap/dist/gsap";
import SocialsLine from "../../componet/UI/SocialsLine.jsx";
import Magnetic from "../../componet/gsap/Magnetic";
import ButtonEffect from "@/componet/UI/ButtonEffect";
import useLocalTime from "@/Hooks/useLocalTime.js";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Import default styles
import LoadingBtn from "@/componet/UI/LoadingBtn.jsx";

// Zod schema for validation
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const localTime = useLocalTime();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".word",
      { y: 250, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        delay: 0.07,
        duration: 1,
      }
    );

    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.7,
        duration: 0.4,
        stagger: 0.01,
        ease: "power1.out",
      }
    );
  }, []);

  // Your EmailJS service and template IDs
  const SERVICE_ID = "service_k6e6vlx";
  const TEMPLATE_ID = "template_ikrj1sd";
  const USER_ID = "pW_eVEA_lhjXgiXXH";

  const onSubmit = async (data) => {
    try {
      const templateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        description: data.description,
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      );
      toast.success("Your message has been sent successfully!", {
        position: "top-center", // Position the toast at the top center
        autoClose: 3000, // Duration for which the toast will be visible
        className: "custom-toast", // Custom class for styling
      });
      reset(); // Clear input fields
    } catch (error) {
      console.log("error");
      console.log(error);
      toast.error("There was an error sending your message.", {
        position: "top-center",
        autoClose: 3000,
        className: "custom-toast",
      });
    }
  };

  return (
    <Curve>
      <Navbar whiteLogo={true} style={"bg-sec text-white "} />
      <div className="  h-full  flex flex-col bg-sec text-white">
        <div className="font-righteous  flex justify-center items-center h-full      lg:px-10 px-[1rem] p-5">
          <div className="   lg:p-8 p-2 rounded-lg   lg:w-[60%] w-[99vw] h-full    ">
            <div className="lg:text-[3.6rem] text-[1.6rem]  font-righteous text-center font-semibold text-white flex flex-col gap-1">
              <div className="  overflow-hidden">
                <h2 className=" word ">Let's Get in Touch and Turn</h2>
              </div>
              <div className="    pb-6  overflow-hidden ">
                <h2 className=" word ">Your Ideas into Reality!</h2>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex text-lg flex-col gap-5 text-white"
            >
              <div>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name"
                  className={` item mt-2 p-3 ring-offset-0 focus:border-b-thr bg-transparent  outline-none ring-0   border-b-2 block  w-full   shadow-sm  sm:text-sm ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm pt-2">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  placeholder="Last Name"
                  type="text"
                  {...register("lastName")}
                  className={` item mt-1 block w-full p-3  focus:border-b-thr  outline-none ring-0  text-white border-b-2 bg-transparent  shadow-sm   sm:text-sm ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm pt-2">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={` item mt-1 block p-3 w-full bg-transparent focus:border-b-thr text-white  outline-none ring-0   border-b-2   border-gray-300 shadow-sm  sm:text-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Description"
                  {...register("description")}
                  className={` item mt-1 block w-full p-2   text-white  focus:border-b-thr  outline-none ring-0   border-b-2   bg-transparent  shadow-sm  sm:text-sm ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  rows="6"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm pt-2">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className=" item   w-full items-center  justify-center flex ">
                <Magnetic>
                  <div>
                    <ButtonEffect
                      disabled={isSubmitting}
                      type="submit"
                      Style={
                        " lg:px-[4rem] relative px-[3rem]  lg:py-7 py-5   bg-white text-lg text-black   "
                      }
                    >
                      <LoadingBtn isLoading={isSubmitting} color={"black"} /> 
                      Submit
                    </ButtonEffect>
                  </div>
                </Magnetic>
              </div>
            </form>
          </div>
        </div>
        <div className="  p-3 pb-5  lg:px-10 px-[1rem] flex lg:flex-row flex-col  justify-between  lg:items-center items-start lg:gap-0 gap-5">
          <span className=" item flex-col flex gap-1">
            <h1 className=" opacity-50 text-xs ">LOCAL TIME</h1>
            {localTime}
          </span>
          <SocialsLine />
        </div>
      </div>
      <ToastContainer
        className="toast-container"
        toastClassName="toast"
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
      />
    </Curve>
  );
};

export default index;
