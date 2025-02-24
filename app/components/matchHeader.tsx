import React from "react";
import formatDateWithDay from "../commonFunctions/matchCardFunctions";

interface MatchHeaderProps {
    date?: string;
    margin?: number;
    matchNo?: number;
    venue?: string;
    winning_team?: string;
    won_by?: string;
  
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ matchNo, venue, date, won_by, winning_team, margin  }) => {
  return (
    <div className="px-3 py-2 rounded-xl shadow-md mt-4 mx-16 bg-[#EEEEEE]">
      {/* Top Row: Match Number & Date */}
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xs md:text-sm lg:text-lg font-extrabold text-[#393e46]">
          Match No: {matchNo}
        </h1>
        <h1 className="text-xs md:text-sm lg:text-lg font-extrabold text-[#393e46]">
          {formatDateWithDay(date ? date : "")}
        </h1>
      </div>

      {/* Middle Row: Venue */}
      <div className="mt-2 text-center">
        <h1 className="text-xs md:text-sm lg:text-lg font-bold text-[#393e46]">
          Venue: {venue}
        </h1>
      </div>

      {/* Bottom Row: Winning Team, Margin, Won By */}
      <div className="mt-2 flex flex-1 justify-between items-center space-x-4">
        <h1 className="text-xs md:text-sm lg:text-lg font-bold text-[#393e46]">
          🏆 {winning_team}
        </h1>
        <h1 className="text-xs md:text-sm lg:text-lg font-bold text-[#393e46]">
          <span className="italic">Won by</span> {margin} {won_by}
        </h1>
      </div>
    </div>
  );
};


export default MatchHeader;
