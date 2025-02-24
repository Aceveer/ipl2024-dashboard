import React from "react";
import Image from "next/image";

const Footer = () => {
  const teams = [
    {
      team: "Chennai Super Kings",
      link: "https://www.chennaisuperkings.com/",
      path: "/teamLogo/CSK.png",
    },
    {
      team: "Mumbai Indians",
      link: "https://www.mumbaiindians.com/",
      path: "/teamLogo/MI.png",
    },
    {
      team: "Delhi Capitals",
      link: "https://www.delhicapitals.in/",
      path: "/teamLogo/DC.png",
    },
    {
      team: "Punjab Kings",
      link: "https://www.punjabkingsipl.in/",
      path: "/teamLogo/PBKS.png",
    },
    {
      team: "Gujrat Titans",
      link: "https://www.gujarattitansipl.com/",
      path: "/teamLogo/GT.png",
    },
    {
      team: "Rajasthan Royals",
      link: "https://www.rajasthanroyals.com/",
      path: "/teamLogo/RR.png",
    },
    {
      team: "Kolkata Knight Riders",
      link: "https://www.kkr.in/",
      path: "/teamLogo/KKR.png",
    },
    {
      team: "Royal Challengers Bangalore",
      link: "https://www.royalchallengers.com/",
      path: "/teamLogo/RCB.png",
    },
    {
      team: "Lucknow Super Giants",
      link: "https://www.lucknowsupergiants.in/",
      path: "/teamLogo/LSG.png",
    },
    {
      team: "Sunrisers Hyderabad",
      link: "https://www.sunrisershyderabad.in/",
      path: "/teamLogo/SRH.png",
    },
  ];

  return (
    <footer className="bg-[#2892D7] p-6">
      {/* Title */}
      <p className="text-[#222831] text-xl font-bold text-left mb-4">
        Visit Team Websites
      </p>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-8">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Image
              src={team.path}
              alt={`${team.team} Logo`}
              width={32}
              height={32}
              className="rounded-full"
            />
            <a
              href={team.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#222831] hover:text-white hover:underline font-semibold"
            >
              {team.team}
            </a>
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="text-[#222831] md:hidden grid grid-cols-2 justify-center gap-4">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Image
              src={team.path}
              alt={`${team.team} Logo`}
              width={24}
              height={24}
              className="rounded-full"
            />
            <a
              href={team.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#222831] hover:text-white hover:underline font-semibold"
            >
              {team.team}
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
