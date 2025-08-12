'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navlinks } from '@/constant/constant';
import { Menu } from 'lucide-react';

type Props = {
  openNav: () => void;
};

const Navbar = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  const bgStyle = navBg ? 'bg-gray-950 shadow-md' : '';

  return (
    <div
      className={`flex items-center justify-between h-[12vh] fixed z-[100] w-full mx-auto transition-all duration-200 ${bgStyle}`}
    >
      <h1 className="text-3xl text-white font-bold ml-8 md:ml-16">IMIAI</h1>

      <div className="md:flex items-center space-x-10 hidden">
        {Navlinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="relative text-white text-base w-fit block
              after:block after:content-[''] after:absolute
              after:h-[3px] after:bg-yellow-300 after:w-full
              after:scale-x-0 after:origin-left after:left-0 after:bottom-0
              after:transition-transform after:duration-300
              hover:after:scale-x-100"
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-center text-white mr-8 md:mr-16">
        <Menu onClick={openNav} className="w-6 h-6 cursor-pointer md:hidden" />
      </div>
    </div>
  );
};

export default Navbar;
