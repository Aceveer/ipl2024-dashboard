import React from "react";

const Header = () => {
  return (
    <header className="bg-[#9BCBD7] text-black py-4 px-8 rounded-3xl mt-4 shadow-md mx-4 md:mx-16">
      {/* Desktop/Tablet Display */}
      <nav className="hidden md:flex justify-between items-center">
        <a href="/matches" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Matches
        </a>
        <a href="#players" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Players
        </a>
        <a href="#teams" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Teams
        </a>
        <a href="#table" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Table
        </a>
        <a href="#venues" className="text-lg font-semibold hover:underline hover:text-[#ffffff]">
          Venues
        </a>
      </nav>

      {/* Mobile Display */}
      <nav className="md:hidden flex justify-between overflow-x-auto space-x-4 items-center py-2">

        <a href="/matches" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Matches
        </a>
        <a href="#players" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4">
          Players
        </a>
        <a href="#teams" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4"
        > 
        Teams
        </a>
        <a href="#table" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4"
        > 
        Table
        </a>
        <a href="#venues" className="flex-shrink-0 text-sm font-semibold hover:underline hover:text-[#ffffff] px-4"
        > 
        Venues
        </a>
      </nav>
    </header>
  );
};

export default Header;
