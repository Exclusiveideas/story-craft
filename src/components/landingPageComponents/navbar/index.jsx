"use client";

import "./navbar.css";
import Link from "next/link";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <Link className="logoWrapper" href="#hero">
        <h3 className="logoTxt">FrameFlow</h3>
        <hr />
      </Link>
      <div className="pageSections">
        <Link className="logoWrapper" href="#features">
          <p className="Features">Features</p>
        </Link>
        <Link className="logoWrapper" href="#faqs">
          <p className="Features">FAQs</p>
        </Link>
        <Link className="logoWrapper" href="#contact">
          <p className="Features">Contact Me</p>
        </Link>
        <Link className="logoWrapper" href="#invest">
          <p className="Features">Invest</p>
        </Link>
      </div>
      <div className="socialWrapper">
        <TwitterIcon />
        <LinkedInIcon />
        <div className="menuIconWrapper">
          <Popover>
            <PopoverTrigger asChild>
             <Menu />
            </PopoverTrigger>
            <PopoverContent className="w-full popOverContent">
              <Link href="#features">Features</Link>
              <Link href="#faqs">FAQs</Link>
              <Link href="#contact">Contact Me</Link>
              <Link href="#invest">Invest</Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const TwitterIcon = () => {
  return (
    <div className="socialIcon">
      <a
        href="https://x.com/muftau_dev"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-wrapper"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="20px"
          height="20px"
        >
          <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
        </svg>
      </a>
    </div>
  );
};

export const LinkedInIcon = () => {
  return (
    <div className="socialIcon">
      <a
        href="https://www.linkedin.com/in/muftau/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-wrapper"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="25px"
          height="25px"
        >
          <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
        </svg>
      </a>
    </div>
  );
};
