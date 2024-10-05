import React from "react";
import Logo from "../assest/Images/Hero/AzizLogoBlack.png";
function Navbar() {
  return (
    <div className="  w-full justify-between z-[1000]  fixed top-3 right-3 ">
      <img src={Logo.src} alt="" />
    </div>
  );
}

export default Navbar;
