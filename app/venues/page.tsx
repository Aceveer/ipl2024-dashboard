"use client";

import React from "react";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import {venues} from "@/app/commonFunctions/venues"

export default function TeamsPage() {
  const router = useRouter();

  // Function to navigate to team details page
  const handleTeamClick = (venueName: string) => {
    sessionStorage.setItem("venueName", venueName);
    router.push(`/venues/${encodeURIComponent(venueName)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content Wrapper */}
    <div className="flex flex-col flex-grow items-center p-4 w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 w-full max-w-sm md:max-w-md lg:max-w-6xl justify-between">
            {venues.map((venue) => (
            <Button
                key={venue.code}
                onClick={() => handleTeamClick(venue.name)} // Navigate on click
                className="relative flex flex-col items-center justify-center p-6 rounded-xl shadow-md transition-transform duration-300 transform group overflow-hidden w-full"
                sx={{
                minHeight: "140px",
                backgroundColor: "white",
                position: "relative",
                "&:hover": {
                    backgroundColor: "white",
                    transform: "scale(1.1)",
                    transition: "0.3s ease-in-out",
                },
                }}
            >
                {/* Team Logo */}
                <Image
                src={`/teamLogo/${venue.team}.png`}
                alt={venue.display}
                width={80}
                height={100}
                className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain transition-opacity duration-300 group-hover:opacity-20"
                />

                {/* Team Name - Centered, Large on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-black text-lg font-bold">{venue.display}</span>
                </div>
            </Button>
            ))}
        </div>
    </div>


      {/* Footer Sticks to Bottom */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
