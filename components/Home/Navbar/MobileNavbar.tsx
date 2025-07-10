'use client';

import React from 'react';
import Link from 'next/link';  
import { Navlinks } from '@/constant/constant';
import { XIcon } from 'lucide-react';
type Props={
  showNav: boolean;
  closeNav: () => void;
}
const MobileNavbar = ({closeNav,showNav}:Props) => {
  const navOpen=showNav ? 'translate-y-0' : '-translate-y-[-200%]';
  return (
<div className={`text-white ${navOpen} fixed flex flex-col justify-center h-screen transform transition-all duration-100 w-full bg-gray-950 space-y-6 z-[1050] top-0`}>

      {Navlinks.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.url}
          >
            <p className="text-white w-fit text-xl ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
              {link.label}
            </p>
          </Link>
        );
      })}
      <XIcon onClick={closeNav} className="w-8 h-8 cursor-pointer absolute top-[0.7rem] right-[1.4rem] sm:w-8" />
    </div>
  );
};

export default MobileNavbar;
