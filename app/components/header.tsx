import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#9BCBD7] text-black py-4 px-8 rounded-3xl mt-4 shadow-md mx-4 md:mx-16">
      {/* Desktop/Tablet Display */}
      <nav className="hidden md:flex justify-between items-center">
        <Link href="/matches" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Matches
        </Link>
        <Link href="#players" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Players
        </Link>
        <Link href="/teams" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Teams
        </Link>
        <Link href="#table" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Table
        </Link>
        <Link href="#venues" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Venues
        </Link>
      </nav>

      {/* Mobile Display */}
      <nav className="md:hidden flex justify-between overflow-x-auto space-x-4 items-center py-2">
        <Link href="/matches" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Matches
        </Link>
        <Link href="#players" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Players
        </Link>
        <Link href="/teams" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Teams
        </Link>
        <Link href="#table" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Table
        </Link>
        <Link href="#venues" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Venues
        </Link>
      </nav>
    </header>
  );
};

export default Header;
