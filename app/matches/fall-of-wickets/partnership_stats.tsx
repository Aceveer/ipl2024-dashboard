"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "../../commonFunctions/loader";
import { Button } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Partnership{
    balls:number;
    balls1: number;
    balls2: number;
    batter1: string;
    batter2: string;
    contribution1: number;
    contribution2: number;
    extras: number;
    runs: number;
    runs1:number;
    runs2: number;
}

interface PartnershipProps {
    innings1data: Partnership[] | null;
    innings2data: Partnership[] | null;
    innings1batting:string | null;
    innings2batting:string | null;
}

const PartnershipCard: React.FC<PartnershipProps> = ({ innings1data,innings2data,innings1batting,innings2batting }) => {
    const [selectedTeam, setSelectedTeam] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleTeamSwitch = (team: number) => {
      setLoading(true); // Show the loader
      setTimeout(() => {
        setSelectedTeam(team);
        setLoading(false); // Hide the loader after 2 seconds
      }, 1000);
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      );
    }
  
    if (!innings1data || !innings2data || !innings1batting || !innings2batting) {
      return <Loader/>;
    }
  
    const currentInnings = selectedTeam === 1 ? innings1data : innings2data;
  
    return (
      <div className="flex flex-col h-auto m-8 items-center text-center">
        
        {/* Team Selection */}
        <div className="flex flex-row items-center text-center text-xs md:text-xl w-full px-8">
        <Button
          variant={selectedTeam === 1 ? "contained" : "outlined"}
          className="w-full"
          onClick={() => handleTeamSwitch(1)}
        >
          {innings1batting}
        </Button>
        <Button
          variant={selectedTeam === 2 ? "contained" : "outlined"}
          className="w-full"
          onClick={() => handleTeamSwitch(2)}
        >
          {innings2batting}
        </Button>
      </div>
  
        <div className="w-full md:w-3/4 mt-6 relative bg-[#EEEEEE] h-auto p-6 m-4 rounded-2xl text-[#393E46]">
        {/* Partnerships List */}
        {currentInnings.map((d, index) => (
          <div key={index} className="border-b border-gray-300 py-2">
            <div className="flex justify-between text-lg font-semibold text-sm md:text-base">
              <span>{d.batter1}</span>
              <span>{d.batter2}</span>
            </div>
  
            <div className="flex justify-between text-gray-600 text-sm md:text-base">
              <span className="font-bold">{d.runs1} ({d.balls1})</span>
              <span className="font-bold">{d.runs2} ({d.balls2})</span>
            </div>
  
            {/* Bar Representation */}
            <div className="relative mt-2 h-3 w-full bg-gray-200 rounded-full overflow-hidden ">
              <div
                className="absolute left-0 h-full bg-[#4CAF50]"
                style={{ width: `${(d.contribution1 / d.runs) * 100}%` }}
              ></div>
              <div
                className="absolute h-full bg-[#FF9800]"
                style={{ left: `${(d.contribution1 / d.runs) * 100}%`, width: `${(d.extras / d.runs) * 100}%` }}
              ></div>
              <div
                className="absolute right-0 h-full bg-[#2196F3]"
                style={{ width: `${(d.contribution2 / d.runs) * 100}%` }}
              ></div>
            </div>
  
            <div className="text-center mt-2 text-sm md:text-base">
              Partnership - <span className="font-bold">{d.runs} ({d.balls})</span>
            </div>
            {d.extras > 0 && <div className="text-center text-sm text-gray-500">Extras - {d.extras}</div>}
          </div>
        ))}
        </div>
      </div>
    );
  };

export default PartnershipCard;
