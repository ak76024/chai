"use client";
import { useSession, signOut } from "next-auth/react";
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  return (<>
    <nav className='bg-black gap-2 lg:gap-0 px-8 py-4 flex lg:flex-row flex-col items-center justify-between'>
      <Link href="/" className='font-bold lg:w-1/3 flex gap-3 items-center text-2xl'><img src="/tea.gif" width={40} alt="" />Ak76024</Link>
      <div className="flex items-center gap-4 lg:w-1/3">
        <ul className='flex gap-5 text-[18px]'>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/about'>About</Link></li>
          <li><Link href='/project'>Project</Link></li>
          {session ? <li><Link href='/profile'>Profile</Link></li> : <li><Link href='/login'>Login</Link></li>}
          {session ? <li><Link href={`/user/${session.user.username}`}>Your Page</Link></li> : ""}
        </ul>
      </div>
        {session ? <div className="flex items-center justify-end lg:w-1/3 gap-3">
          <img src={session.user.image} alt="Profile Picture" className="w-8 h-8 rounded-full" />
          <span>{session.user.name}</span>
          <button onClick={() => signOut()} className="!m-0 px-3 py-1 bg-red-500 rounded">Sign Out</button>
        </div> : null}
    </nav>
  </>
  );
}

export default Navbar;