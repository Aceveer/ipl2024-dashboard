import React, { useState } from "react";
import getBatterAndWicket from "../commonFunctions/scoreCardFunctions";

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

interface Innings {
  batting: PlayerPerformance[];
  bowling: BowlerPerformance[];
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
        <p>Match details are not available yet. Please wait...</p>
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
          className={`border border-black w-full p-2 cursor-pointer ${
            selectedTeam === 1 ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedTeam(1)}
        >
          Team 1
        </div>
        <div
          className={`border border-black w-full p-2 cursor-pointer ${
            selectedTeam === 2 ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedTeam(2)}
        >
          Team 2
        </div>
      </div>

      {/* Tables */}
      <div className="flex justify-between items-start w-full border-2 border-black mt-4">
        {/* Left Table - Batting */}
        <div className="w-1/2 overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-700 w-full text-left text-sm border-r-4">
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
          <table className="table-auto border-collapse border border-gray-700 w-full text-left text-sm">
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

      <div className="border-b-4 border-r-4 border-l-4 border-black w-full">
        Total: 180/3
      </div>

    </div>
  );
};

export default ScoreCard;
