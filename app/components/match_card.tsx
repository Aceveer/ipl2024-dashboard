import React from "react";
import formatDateWithDay from "../commonFunctions/matchCardFunctions";
import convertOvers from "../commonFunctions/allFunctions";
import { useRouter } from "next/navigation";

interface MatchCardProps {
    matchNo: number;
    venue: string;
    date: string;
    team1: string;
    team2: string;
    innings1Score: number;
    innings1Overs: number;
    innings2Score: number;
    innings2Overs: number;
    innings1_wickets: number;
    innings2_wickets: number;
    tossWinner: string;
    tossDecision: string;
    winningTeam: string;
    margin: number;
    wonBy: string;
    playerOfTheMatch: string;
  }

  const MatchCard: React.FC<MatchCardProps> = ({
    matchNo,
    venue,
    date,
    team1,
    team2,
    innings1_wickets,
    innings2_wickets,
    innings1Score,
    innings1Overs,
    innings2Score,
    innings2Overs,
    tossWinner,
    tossDecision,
    winningTeam,
    margin,
    wonBy,
    playerOfTheMatch,
  }) => {


    const router = useRouter(); // Initialize the router

    const handleRedirect = () => {
      sessionStorage.setItem("matchNo",matchNo.toString())
      router.push(`/matches/analysis`); // Redirect to the analysis page for the match
    };

  return (
    <div className="flex flex-col bg-[#9BCBD7] h-auto px-6 m-16 rounded-2xl py-4 flex-wrap">

        {/* Header Section */}
        <div className="flex flex-row border-b-4 border-black w-full pb-2">
            <div className="text-m font-bold flex-1 text-left">
                Match No: {matchNo}
            </div>

            <div className="text-m font-bold flex-1 text-center">
                Venue: {venue}
            </div>

            <div className="text-m font-bold flex-1 text-right">
                Date: {formatDateWithDay(date)}
            </div>
        </div>

        <div className="flex flex-row">

            {/* Left Section: Teams */}
            <div className="flex flex-col justify-evenly border-black border-b-4 w-1/2 py-2 pr-4">
                {/* Team 1 (Top) */}
                <div className="flex flex-row items-center">
                <img
                    src={`./teamLogo/${team1}.png`}
                    alt="KKR"
                    className="bg-white h-24 w-24 py-2 rounded-full border-4 border-black object-contain"
                />
                <div className="flex flex-col text-center p-2 text-lg font-semibold">
                    <div>Score: {innings1Score} - {innings1_wickets}</div>
                    <div>Overs: {convertOvers(innings1Overs.toString())}</div>
                </div>
                </div>

                {/* Team 2 (Bottom) */}
                <div className="flex flex-row items-center">
                <img
                    src={`./teamLogo/${team2}.png`}
                    alt="SRH"
                    className="bg-white h-24 w-24 py-2 rounded-full border-4 border-black object-contain"
                />
                <div className="flex flex-col text-center p-2 text-lg font-semibold">
                <div>Score: {innings2Score} - {innings2_wickets}</div>
                <div>Overs: {convertOvers(innings2Overs.toString())}</div>
                </div>
                </div>
            </div>

            {/* Middle Section: Match Details */}
            <div className="flex flex-col justify-evenly items-center border-black border-b-4 w-full py-4 px-4">
                <div className="text-lg font-bold">Toss: {tossWinner} opt to {tossDecision}</div>
                <div className="text-lg font-bold">Result: {winningTeam} won by {margin} {wonBy}</div>
                <div className="text-lg font-bold">Man Of The Match: {playerOfTheMatch}</div>
            </div>

            {/* Right Section: Analysis */}
            <div className="flex flex-col justify-evenly border-black border-b-4 w-full py-4 px-4">
                <div className="grid grid-cols-4">
                    {/* Scorecard */}
                    <div className="flex flex-col items-center cursor-pointer hover:bg-white hover:rounded-xl" onClick={handleRedirect}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M8 8h8M8 12h5M8 16h4" />
                        </svg>
                        <div className="text-center text-lg font-medium mt-2">Scorecard</div>
                    </div>

                    {/* Fall of Wickets */}
                    <div className="flex flex-col items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <path d="M4 20L10 10l4 6 6-14" />
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="14" cy="16" r="1.5" fill="currentColor" />
                        <circle cx="20" cy="6" r="1.5" fill="currentColor" />
                        </svg>
                        <div className="text-center text-lg font-medium mt-2">
                        Wickets
                        </div>
                    </div>

                    {/* Overs Analysis */}
                    <div className="flex flex-col items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <circle cx="12" cy="12" r="8" />
                        <path d="M8 12a4 4 0 018 0M12 8a4 4 0 010 8" />
                        </svg>
                        <div className="text-center text-lg font-medium mt-2">
                        Overs
                        </div>
                    </div>

                    {/* Partnership */}
                    <div className="flex flex-col items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <circle cx="8" cy="8" r="3" />
                        <circle cx="16" cy="8" r="3" />
                        <path d="M5 21v-4a4 4 0 014-4h6a4 4 0 014 4v4" />
                        </svg>
                        <div className="text-center text-lg font-medium mt-2">Partnership</div>
                    </div>
                </div>
            </div>
        </div>

        


    </div>

  );
};

export default MatchCard;
