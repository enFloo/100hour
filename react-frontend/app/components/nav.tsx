import React, { useState } from 'react';
import Link from 'next/link'


export function Navbar() {
  return (
    <nav className="content-center bg-white h-14 grid gap-x-60 grid-cols-2 navbar border-2 border-rose-500">
      <div>
        <h1 className="ml-5 text-xl">CircuitFlo</h1>
      </div>
      <div id='toggleMenu' className="ml-3">
        <div className="mb-1 w-9 h-1 bg-black rounded-full"></div>
        <div className="mb-1 w-9 h-1 bg-black rounded-full"></div>
        <div className="mb-1 w-9 h-1 bg-black rounded-full"></div>
      </div>
    </nav>
  );
}


{/* <ul>
  <li><Link href="/">Dashboard</Link></li>
  <li><Link href="/Timers">Timers</Link></li>
  <li><Link href="/Login/Logout">Login/Logout</Link></li>
</ul> */}