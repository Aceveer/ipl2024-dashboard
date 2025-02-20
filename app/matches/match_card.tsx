import React from "react";
import formatDateWithDay from "../commonFunctions/matchCardFunctions";
import convertOvers from "../commonFunctions/allFunctions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';  // Scorecard
import SportsCricketSharpIcon from '@mui/icons-material/SportsCricketSharp'; // Overs
import SportsSharpIcon from '@mui/icons-material/SportsSharp';  // Fall of Wickets
import GroupSharpIcon from '@mui/icons-material/GroupSharp';  // Partnership
import { IconButton } from '@mui/material';

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
        console.log("Hello");
      sessionStorage.setItem("matchNo",matchNo.toString())
      router.push(`/matches/${route}`); // Redirect to the analysis page for the match
    };

  return (
    <div className="flex flex-col bg-[#4C4C47] h-auto px-4 m-4 rounded-2xl py-2 flex-wrap md:m-16">

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
                    className="bg-white h-24 w-24 py-2 rounded-full object-contain mx-4"
                />
                <div className="flex flex-col flex-1 text-left text-sm font-semibold gap-3">
                    <div>{team1}</div>
                    <div>Score: {innings1Score} - {innings1_wickets}</div>
                    <div>Overs: {convertOvers(innings1Overs.toString())}</div>
                </div>
            </div>

            {/* Middle Section */}
            <div className="flex flex-col justify-evenly items-center gap-3">
                <div className="text-sm font-bold">Venue: {venue}</div>
                <div className="text-sm font-bold">Toss: {tossWinner} opt to {tossDecision}</div>
                <div className="text-sm font-bold">Result: {winningTeam} won by {margin} {wonBy}</div>
                <div className="text-sm font-bold">Man Of The Match: {playerOfTheMatch}</div>
            </div>

            {/* Team 2 (Right) */}
            <div className="flex flex-row-reverse flex-1 items-start">
                <Image
                    src={`/teamLogo/${team2}.png`}
                    alt={team2}
                    height={100}
                    width={100}
                    className="bg-white h-24 w-24 py-2 rounded-full object-contain mx-4"
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
        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("analysis")}>
            <TableChartSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Scorecard</div>
        </IconButton>

        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("overs")}>
            <SportsCricketSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Overs</div>
        </IconButton>

        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("fall-of-wickets")}>
            <SportsSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Fall of Wickets</div>
        </IconButton>

        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("partnerships")}>
            <GroupSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Partnership</div>
        </IconButton>
    </div>

    </div>

    {/* MOBILE VIEW (Stacked Teams, Details on Right) */}
    <div className="flex flex-row lg:hidden border-black border-b-2 w-full py-2">
        {/* Left Side - Teams Stacked */}
        <div className="flex flex-col items-start">
            {/* Team 1 */}
            <div className="flex flex-col items-center mb-4">
                <Image
                    src={`/teamLogo/${team1}.png`}
                    alt={team1}
                    height={80}
                    width={80}
                    className="bg-white h-16 w-16 py-2 rounded-full object-contain"
                />
                <div className="text-sm font-semibold text-center mt-2">{team1}</div>
                <div className="text-xs text-center font-bold">Score: {innings1Score} - {innings1_wickets}</div>
                <div className="text-xs text-center font-bold">Overs: {convertOvers(innings1Overs.toString())}</div>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center">
                <Image
                    src={`/teamLogo/${team2}.png`}
                    alt={team2}
                    height={80}
                    width={80}
                    className="bg-white h-16 w-16 py-2 rounded-full object-contain"
                />
                <div className="text-sm font-semibold text-center mt-2">{team2}</div>
                <div className="text-xs text-center font-bold">Score: {innings2Score} - {innings2_wickets}</div>
                <div className="text-xs text-center font-bold">Overs: {convertOvers(innings2Overs.toString())}</div>
            </div>
        </div>

        {/* Right Side - Match Details (Centered) */}
        <div className="flex flex-col  justify-center items-center text-center gap-5 w-3/4">
            <div className="text-xs font-bold">Venue: {venue}</div>
            <div className="text-xs font-bold">Toss: {tossWinner} opt to {tossDecision}</div>
            <div className="text-xs font-bold">Result: {winningTeam} won by {margin} {wonBy}</div>
            <div className="text-xs font-bold">Man Of The Match: {playerOfTheMatch}</div>
        </div>

        {/* Analysis Section */}
        <div className="lg:hidden flex flex-col justify-evenly pt-2">
        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("analysis")}>
            <TableChartSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Scorecard</div>
        </IconButton>

        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("overs")}>
            <SportsCricketSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Overs</div>
        </IconButton>

        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("fall-of-wickets")}>
            <SportsSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Fall of Wickets</div>
        </IconButton>

        <IconButton className="flex flex-col items-center hover:bg-white rounded-2xl p-2" onClick={() => redirectTo("partnerships")}>
            <GroupSharpIcon fontSize="large" />
            <div className="text-xs font-semibold">Partnership</div>
        </IconButton>
    </div>

    </div>

</div>


  );
};

export default MatchCard;
