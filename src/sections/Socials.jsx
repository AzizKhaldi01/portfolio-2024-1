import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Magnetic from "../componet/gsap/Magnetic";

function Socials() {
  return (
    <div className="flex item flex-col gap-6">
      <Magnetic>
        <a
          href="https://www.linkedin.com/in/aziz-khaldi-b28207261/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="duration-100 hover:text-thr lg:scale-[1.7] scale-[1.6]"
          />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href="https://wa.me/213779577865"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="duration-100 hover:text-thr lg:scale-[1.7] scale-[1.6]"
          />
        </a>
      </Magnetic>
      {/* <Magnetic>
        <a href="mailto:aziz.khaldi100@gmail.com">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="duration-100 hover:text-thr lg:scale-[1.7] scale-[1.5]"
          />
        </a>
      </Magnetic> */}
      <Magnetic>
        <a
          href="https://github.com/AzizKhaldi01" // Replace with your actual GitHub URL
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="duration-100 hover:text-thr lg:scale-[1.7] scale-[1.6]"
          />
        </a>
      </Magnetic>
    </div>
  );
}

export default Socials;
