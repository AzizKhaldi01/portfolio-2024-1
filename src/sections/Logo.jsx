import React from "react";
import Link from "next/link";
import LogoImg from "../assest/Images/Hero/AzizLogoBlack.png";
import LogoWhiteImg from "../assest/Images/Hero/AzizLogoWhite.png";

function Logo({whiteLogo}) {
  return (
    <Link href="/">
      <img
        className=" target item h-[1.8rem]  z-50 w-[1.7rem] lg:w-[1.9rem] lg:h-[2.3rem] cursor-pointer"
        src={ !whiteLogo ?  LogoImg.src :LogoWhiteImg.src }
        alt="Logo"
      />
    </Link>
  );
}

export default Logo;
