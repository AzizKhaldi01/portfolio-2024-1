import React from "react";
import Link from "next/link";
import LogoImg from "../assest/Images/Hero/AzizLogoBlack.png";
import LogoWhiteImg from "../assest/Images/Hero/AzizLogoWhite.png";

function Logo({whiteLogo}) {
  return (
    <Link href="/">
      <img
        className=" target item h-[2rem]  z-50 w-[1.7rem] lg:w-[2rem] lg:h-[2.6rem] cursor-pointer"
        src={ !whiteLogo ?  LogoImg.src :LogoWhiteImg.src }
        alt="Logo"
      />
    </Link>
  );
}

export default Logo;
