"use client";

import React, { useState } from 'react';
import Link from 'next/link';


export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="content-center bg-white h-14 grid gap-x-45 grid-cols-2 navbar">
        <div>
          <h1 className="ml-5 text-xl">CircuitFlo</h1>
        </div>
        <div className="hidden sm:block justify-end pr-0">
          <ul  className="grid grid-flow-col auto-cols-max gap-4 border-2 border-rose-500">
            <li><Link href="/">Dashboard</Link></li>
            <li><Link href="/Timers">Timers</Link></li>
            <li><Link href="/Login/Logout">Login/Logout</Link></li>
          </ul>
        </div>
        <div id='toggleMenu' className="md:hidden ml-3" onClick={() => setIsOpen(!isOpen)}>
          {/* three-barred hamburger menu */}
          <div className="mb-1 w-9 h-1 bg-black rounded-full"></div>
          <div className="mb-1 w-9 h-1 bg-black rounded-full"></div>
          <div className="mb-1 w-9 h-1 bg-black rounded-full"></div>
        </div>
      </nav>
      {/* slideout that shows mobile nav links */}
      <div
      className={`bg-neutral-800 text-white 
                    fixed h-screen right-0 transition-all 
                    duration-300 z-10 
                    ${isOpen ? 'w-48' : 'w-0 overflow-hidden'
          }`}>
        <div className="flex flex-col items-center">
          <div className="mt-4">
            <a href="#"
              className="text-white 
                          hover:text-gray-300">
              Dashboard
            </a>
          </div>
          <div className="mt-4">
            <a href="#"
              className="text-white 
                          hover:text-gray-300">
              My Timers
            </a>
          </div>
          <div className="mt-4">
            <a href="#"
              className="text-white 
                          hover:text-gray-300">
              Logout
            </a>
          </div>
          {/* Add more sidebar items here */}
        </div>    
      </div>
    </div>

    
  );
}


