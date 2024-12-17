"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import PageTitle from "../../componet/UI/PageTitle.jsx";
import Navbar from "../../componet/Navbar.jsx";
import Footer from "../../componet/Footer/Footer.jsx";
import Curve from "../../componet/UI/NavCurve.jsx";
import { paragraphData } from "../../assest/data/expData.js";

function Page() {
  useEffect(() => {
    gsap.fromTo(
      ".item",
      { y: 150 },
      {
        y: 0,
        delay: 0.7,
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.out",
      }
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []); 

  useEffect(() => {
    // Page load animation
    gsap.fromTo(
      ".text-item",
      { y: 115 },
      {
        y: 0,
        stagger: 0.07,
        delay: 1,

        duration: 0.5,
        ease: "power1.out",
      }
    );
  }, []);

  const svgRef = useRef(null);
  const pathRef = useRef(null);

  return (
    <Curve>
      <div className=" cursor-default page relative">
        <Navbar />
        <div className=" flex items-center w-full">
          <PageTitle title={"Experience"} />
        </div>

        <div className=" item flex flex-col  pt-10  pb-20  px-[1rem] lg:px-[5rem]   lg:gap-[7rem] gap-[3rem]   ">
          {paragraphData.map((company) => (
            <div className=" exp   flex flex-col  gap-6">
              <div className=" flex items-center  gap-2 ">
                <div
                  style={{
                    borderColor: company.color,
                  }}
                  className="  lg:h-20 h-[4rem]  lg:w-20 w-[4rem] rounded-[50%] flex items-center justify-center   border-2 border-green-400 bg-white  "
                >
                  <img src={company.logo} />
                </div>
                <span className=" flex flex-col ">
                  <h1
                    style={{
                      color: company.color,
                    }}
                    className="  font-righteous  lg:text-[1.7rem] text-[1.4rem] font-semibold"
                  >
                    {company.companyName}
                  </h1>
                  <p className="   text-gray-500 text-xs  ">{company.date}</p>
                  <p className="   text-gray-500 text-xs ">{company.role}</p>
                </span>
              </div>
              <div className="  lg:px-10 px-0  lg:text-lg   ">
                {company.desc} 
              </div>
              <div className=" pt-5 px-0 lg:px-12">
                <h1 className=" text-xl ">Role :</h1>
                <ul className="list-none  space-y-1 pt-3">
                  {company.roles.map((role, index) => (
                    <div className=" overflow-hidden">
                      <li
                        key={index}
                        className="flex text-item  lg:text-lg items-start"
                      >
                        <span className="  mr-2 lg:text-lg">•</span>
                        {role}
                      </li>
                    </div>
                  ))}
                  <div className="   "></div>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* <div className=" w-full h-screen"></div> */}

        <Footer />
      </div>
    </Curve>
  );
}

export default Page;
