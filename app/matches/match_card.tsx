import React from "react";
import formatDateWithDay from "../commonFunctions/matchCardFunctions";
import convertOvers from "../commonFunctions/allFunctions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconButton } from '@mui/material';
import { FileText, BarChart2, Clock, Users } from "lucide-react";

const analysisOptions = [
    { name: "Scorecard", icon: FileText, path: "/analysis" },
    { name: "Fall Of Wickets", icon: BarChart2, path: "/fall-of-wickets" },
    { name: "Overs", icon: Clock, path: "/overs" },
    { name: "Partnerships", icon: Users, path: "/partnerships" },
  ];

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

    const redirectTo = (route:string) => {
      sessionStorage.setItem("matchNo",matchNo.toString())
      router.push(`/matches/${route}`); // Redirect to the analysis page for the match
    };

  return (
    <div className="flex flex-col bg-[#EEEEEE] h-auto px-4 m-4 rounded-2xl py-2 flex-wrap md:m-16 text-[#222831]">

    {/* Header Section */}
    <div className="flex flex-row border-b-2 border-black w-full">
        <div className="text-xs md:text-sm font-bold flex-1 text-left">
            Match No: {matchNo}
        </div>

        <div className="text-xs md:text-sm font-bold flex-1 text-right">
            Date: {formatDateWithDay(date)}
        </div>
    </div>

    <div className="flex flex-col">
        {/* DESKTOP VIEW (Side-by-Side Layout) */}
        <div className="hidden lg:flex flex-row border-black border-b-2 w-full py-2 justify-evenly">
            {/* Team 1 (Left) */}
            <div className="flex flex-row flex-1 items-start">
                <Image
                    src={`/teamLogo/${team1}.png`}
                    alt={team1}
                    height={100}
                    width={100}
                    className="bg-[#FDFFF7] h-24 w-24 py-2 rounded-full object-contain mx-4"
                />
                <div className={`flex flex-col flex-1 text-left text-sm font-semibold gap-3 ${winningTeam === team1 ? "text-[#0B6623]" : "text-[#D72638]"}`}>
                    <div>{team1}</div>
                    <div>Score: {innings1Score} - {innings1_wickets}</div>
                    <div>Overs: {convertOvers(innings1Overs.toString())}</div>
                </div>
            </div>

            {/* Middle Section */}
            <div className="flex flex-col justify-evenly items-center gap-3">
                <div className="text-sm"> <span className="font-bold">Venue: </span>{venue}</div>
                <div className="text-sm"> <span className="font-bold">Toss:  </span> {tossWinner} opt to {tossDecision}</div>
                <div className="text-sm"> <span className="font-bold">Result: </span> {winningTeam} won by {margin} {wonBy}</div>
                <div className="text-sm"> <span className="font-bold">Man Of The Match: </span> {playerOfTheMatch}</div>
            </div>

            {/* Team 2 (Right) */}
            <div className={`flex flex-row-reverse flex-1 items-start ${winningTeam === team2 ? "text-[#0B6623]" : "text-[#D72638]"}`}>
                <Image
                    src={`/teamLogo/${team2}.png`}
                    alt={team2}
                    height={100}
                    width={100}
                    className="bg-[#FDFFF7] h-24 w-24 py-2 rounded-full object-contain mx-4"
                />
                <div className="flex flex-col flex-1 text-right text-sm font-semibold gap-3">
                    <div>{team2}</div>
                    <div>Score: {innings2Score} - {innings2_wickets}</div>
                    <div>Overs: {convertOvers(innings2Overs.toString())}</div>
                </div>
            </div>
        </div>

        {/* Analysis Section */}
        <div className="hidden lg:flex flex-row justify-evenly pt-2">
            {analysisOptions.map(({ name, icon: Icon, path }) => (
                <IconButton
                key={name}
                className="flex flex-col items-center rounded-2xl p-2"
                onClick={() => redirectTo(path)}
                >
                <Icon size={28} className="text-[#222831]" />
                <div className="text-xs font-semibold text-[#222831]">{name}</div>
                </IconButton>
            ))}
        </div>

    </div>

    {/* MOBILE VIEW (Stacked Teams, Details on Right) */}
    <div className="flex flex-row lg:hidden border-black border-b-2 w-full py-2">
        {/* Left Side - Teams Stacked */}
        <div className="flex flex-col items-start">
            {/* Team 1 */}
            <div className={`flex flex-col items-center mb-4 ${winningTeam === team1 ? "text-[#0B6623]" : "text-[#D72638]"}`}>
                <Image
                    src={`/teamLogo/${team1}.png`}
                    alt={team1}
                    height={80}
                    width={80}
                    className="bg-[#FDFFF7] h-16 w-16 py-2 rounded-full object-contain"
                />
                <div className="text-sm font-semibold text-center mt-2">{team1}</div>
                <div className="text-xs text-center font-bold">Score: {innings1Score} - {innings1_wickets} ({convertOvers(innings1Overs.toString())})</div>
            </div>

            {/* Team 2 */}
            <div className={`flex flex-col items-center ${winningTeam === team2 ? "text-[#0B6623]" : "text-[#D72638]"}`}>
                <Image
                    src={`/teamLogo/${team2}.png`}
                    alt={team2}
                    height={80}
                    width={80}
                    className="bg-[#FDFFF7] h-16 w-16 py-2 rounded-full object-contain"
                />
                <div className="text-sm font-semibold text-center mt-2">{team2}</div>
                <div className="text-xs text-center font-bold">Score: {innings2Score} - {innings2_wickets} ({convertOvers(innings2Overs.toString())})</div>
            </div>
        </div>

        {/* Right Side - Match Details (Centered) */}
        <div className="flex flex-col  justify-center items-center text-center gap-5 w-3/4 pl-2 ">
            <div className="text-xs"> <span className="font-bold">Venue: </span>{venue}</div>
            <div className="text-xs"> <span className="font-bold">Toss: </span>{tossWinner} opt to {tossDecision}</div>
            <div className="text-xs"> <span className="font-bold">Result: </span>{winningTeam} won by {margin} {wonBy}</div>
            <div className="text-xs"> <span className="font-bold">Man Of The Match: </span>{playerOfTheMatch}</div>
        </div>

        {/* Analysis Section */}
        <div className="lg:hidden flex flex-col pt-2">
            {analysisOptions.map(({ name, icon: Icon, path }) => (
                <IconButton
                key={name}
                className="flex flex-col items-center hover:bg-white rounded-2xl"
                onClick={() => redirectTo(path)}
                >
                <Icon size={24} />
                <div className="text-xs font-semibold text-[#222831]">{name}</div>
                </IconButton>
            ))}
        </div>

    </div>

</div>


  );
};

export default MatchCard;
