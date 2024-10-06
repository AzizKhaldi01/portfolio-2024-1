import React from "react";
import FlipLink from "./FlipLink";

function SocialsLine() {
  // Array of social links
  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/aziz-khaldi-b28207261/",
    },
    { name: "WhatsApp", href: "https://wa.me/213779577865" },
    { name: "Email", href: "mailto:azizkhaldi0210@gmail.com" },
  ];

  return (
    <div className=" item flex flex-col text-white gap-3">
      <h1 className="opacity-50 text-xs">SOCIALS</h1>
      <div className="flex gap-3">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlipLink>{social.name}</FlipLink>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialsLine;
