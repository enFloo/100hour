import React, { useState } from 'react';
import Link from 'next/link'


export function Navbar() {
  return (
    <nav className="grid gap-x-60 grid-cols-2 navbar border-2 border-rose-500">
      <div>
        <h1>CircuitFlo</h1>
      </div>
      <div id='toggleMenu'>
        <div className="mb-1 w-9 h-1 bg-black rounded-full before:content-[‘’] before:absolute before:w-16 before:h-2 before:bg-black before:rounded-full before:-translate-y-4 after:content-[‘’] after:absolute after:w-16 after:h-2 after:bg-black after:rounded-full after:translate-y-4"></div>
        <div className="mb-1 w-9 h-1 bg-black rounded-full before:content-[‘’] before:absolute before:w-16 before:h-2 before:bg-black before:rounded-full before:-translate-y-4 after:content-[‘’] after:absolute after:w-16 after:h-2 after:bg-black after:rounded-full after:translate-y-4"></div>
        <div className="mb-1 w-9 h-1 bg-black rounded-full before:content-[‘’] before:absolute before:w-16 before:h-2 before:bg-black before:rounded-full before:-translate-y-4 after:content-[‘’] after:absolute after:w-16 after:h-2 after:bg-black after:rounded-full after:translate-y-4"></div>
      </div>
    </nav>
  );
}


{/* <ul>
  <li><Link href="/">Dashboard</Link></li>
  <li><Link href="/Timers">Timers</Link></li>
  <li><Link href="/Login/Logout">Login/Logout</Link></li>
</ul> */}