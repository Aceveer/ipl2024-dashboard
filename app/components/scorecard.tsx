import React, { useState } from "react";
import {getBatterAndWicket, getExtras, getOversFromBowlers} from "../commonFunctions/scoreCardFunctions";
import Loader from "../commonFunctions/loader";

interface PlayerPerformance {
  balls: number;
  batter: string;
  bowler: string;
  fielder: string | null;
  fours: number;
  runs: number;
  sixes: number;
  dots: number;
  wicket_type: string | null;
}

interface BowlerPerformance {
  bowler: string;
  dots: number;
  fours: number;
  maidens: number;
  no_balls: number;
  overs: number;
  runs: number;
  sixes: number;
  wides: number;
  wickets: number;
}

interface Extras {
  total:number;
  no_balls:number;
  wides:number;
  leg_byes:number;
  byes:number;
}

interface Innings {
  batting: PlayerPerformance[];
  bowling: BowlerPerformance[];
  score: number;
  team: string;
  wickets: number;
  extras: Extras;
}

interface MatchDetails {
  innings1: Innings;
  innings2: Innings;
}

interface ScoreCardProps {
  matchDetails: MatchDetails | null; // Handle null in case data hasn't loaded yet
}

const ScoreCard: React.FC<ScoreCardProps> = ({ matchDetails }) => {
  const [selectedTeam, setSelectedTeam] = useState(1);

  // Loader
  if (!matchDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader/>
      </div>
    );
  }

  // Get innings data for the selected team
  const currentInnings = selectedTeam === 1 ? matchDetails.innings1 : matchDetails.innings2;

  return (
    <div className="flex flex-col h-auto m-8 flex-wrap align-middle items-center text-center">
      {/* Teams */}
      <div className="flex flex-row items-center text-center text-xl">
        <div
          className={`border border-black w-full p-2 px-8 cursor-pointer ${
            selectedTeam === 1 ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedTeam(1)}
        >
          {matchDetails.innings1.team}
        </div>
        <div
          className={`border border-black w-full p-2 px-8 cursor-pointer ${
            selectedTeam === 2 ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedTeam(2)}
        >
          {matchDetails.innings2.team}
        </div>
      </div>

      {/* Tables */}
      <div className="flex justify-between items-start w-full border-2 border-black mt-4 ">
        {/* Left Table - Batting */}
        <div className="w-1/2 overflow-x-auto">
          <table className={`table-auto border-collapse border border-gray-700 w-full text-left text-sm ${currentInnings.bowling.length < currentInnings.batting.length ? "border-r-4 border-gray-700" : ""}`}>
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 px-4 py-2 w-1/2">Batter</th>
                <th className="border border-gray-700 px-4 py-2">Runs</th>
                <th className="border border-gray-700 px-4 py-2">Balls</th>
                <th className="border border-gray-700 px-4 py-2">Dots</th>
                <th className="border border-gray-700 px-4 py-2">4s</th>
                <th className="border border-gray-700 px-4 py-2">6s</th>
                <th className="border border-gray-700 px-4 py-2">SR</th>
              </tr>
            </thead>
            <tbody>
              {currentInnings.batting.map((player, index) => (
                <tr key={index}>
                  <td
                    className={`border border-gray-700 px-4 py-2 ${
                      player.wicket_type === null ? "font-bold" : ""
                    }`}
                  >
                    {getBatterAndWicket(player.batter, player.bowler, player.wicket_type, player.fielder)}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{player.runs}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.balls}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.dots}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.fours}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.sixes}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {((player.runs / player.balls) * 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Table - Bowling */}
        <div className="w-1/2 overflow-x-auto">
          <table className={`table-auto border-collapse border  w-full text-left text-sm ${currentInnings.bowling.length > currentInnings.batting.length ? "border-l-4 border-gray-700" : ""}`}>
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 px-4 py-2 w-1/2">Bowler</th>
                <th className="border border-gray-700 px-4 py-2">Overs</th>
                <th className="border border-gray-700 px-4 py-2">Runs</th>
                <th className="border border-gray-700 px-4 py-2">Wickets</th>
                <th className="border border-gray-700 px-4 py-2">Maidens</th>
                <th className="border border-gray-700 px-4 py-2">Dots</th>
                <th className="border border-gray-700 px-4 py-2">4s</th>
                <th className="border border-gray-700 px-4 py-2">6s</th>
              </tr>
            </thead>
            <tbody>
              {currentInnings.bowling.map((player, index) => (
                <tr key={index}>
                  <td className="border border-gray-700 px-4 py-2">{player.bowler}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.overs.toFixed(1)}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.runs}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.wickets}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.maidens}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.dots}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.fours}</td>
                  <td className="border border-gray-700 px-4 py-2">{player.sixes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-b-4 border-r-4 border-l-4 border-black w-full flex flex-1 text-lg p-4 justify-evenly">
        <div>Total: {currentInnings.score} - {currentInnings.wickets}</div>
        <div>Overs: {getOversFromBowlers(currentInnings.bowling)}</div>
        <div>Extras: {getExtras(currentInnings.extras)}</div>
      </div>

    </div>
  );
};

export default ScoreCard;
