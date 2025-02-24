"use client"
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#393E46] text-[#EEEEEE] py-4 px-8 rounded-3xl mt-4 shadow-md mx-4 md:mx-16">
      {/* Desktop/Tablet Display */}
      <nav className="hidden md:flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold hover:underline hover:text-[#2892D7]">
          Home
        </Link>
        <Link href="/matches" className="text-lg font-semibold hover:underline hover:text-[#2892D7]">
          Matches
        </Link>
        <Link href="/stats" className="text-lg font-semibold hover:underline hover:text-[#2892D7]">
          Stats
        </Link>
        <Link href="/teams" className="text-lg font-semibold hover:underline hover:text-[#2892D7]">
          Teams
        </Link>
        <Link href="/venues" className="text-lg font-semibold hover:underline hover:text-[#2892D7]">
          Venues
        </Link>
      </nav>

      {/* Mobile Display */}
      <nav className="md:hidden flex justify-between overflow-x-auto space-x-4 items-center py-2">
        <Link href="/" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#2892D7] px-4">
          Home
        </Link>
        <Link href="/matches" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#2892D7] px-4">
          Matches
        </Link>
        <Link href="/stats" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#2892D7] px-4">
          Stats
        </Link>
        <Link href="/teams" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#2892D7] px-4">
          Teams
        </Link>
        <Link href="/venues" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#2892D7] px-4">
          Venues
        </Link>
      </nav>
    </header>
  );
};

export default Header;
