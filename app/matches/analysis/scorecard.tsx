import React, { useState } from "react";
import { getBatterAndWicket, getExtras, getOversFromBowlers } from "@/app/commonFunctions/scoreCardFunctions";
import Loader from "@/app/commonFunctions/loader";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
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
  total: number;
  no_balls: number;
  wides: number;
  leg_byes: number;
  byes: number;
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
  matchDetails: MatchDetails | null;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ matchDetails }) => {
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

  if (!matchDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  const currentInnings = selectedTeam === 1 ? matchDetails.innings1 : matchDetails.innings2;

  return (
    <div className="flex flex-col h-auto m-8 flex-wrap align-middle items-center text-center">
      {/* Team Selection */}
      <div className="flex flex-row items-center text-center text-xs md:text-xl w-full px-8">
        <Button
          variant={selectedTeam === 1 ? "contained" : "outlined"}
          className="w-full"
          onClick={() => handleTeamSwitch(1)}
        >
          {matchDetails.innings1.team}
        </Button>
        <Button
          variant={selectedTeam === 2 ? "contained" : "outlined"}
          className="w-full"
          onClick={() => handleTeamSwitch(2)}
        >
          {matchDetails.innings2.team}
        </Button>
      </div>

      {/* Batting Table */}
      <TableContainer component={Paper} className="mt-4 w-full">
        <Typography variant="h6" className="p-2 bg-[#D9B8C4] text-[#222831] text-center">
          Batting
        </Typography>
        <Table>
          <TableHead>
            <TableRow className="bg-[#4EA5D9]">
              <TableCell>Batter</TableCell>
              <TableCell>Runs</TableCell>
              <TableCell>Balls</TableCell>
              <TableCell>Dots</TableCell>
              <TableCell>4s</TableCell>
              <TableCell>6s</TableCell>
              <TableCell>SR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentInnings.batting.map((player, index) => (
              <TableRow key={index}>
                <TableCell className={player.wicket_type === null ? "font-bold" : ""}>
                  {getBatterAndWicket(player.batter, player.bowler, player.wicket_type, player.fielder)}
                </TableCell>
                <TableCell>{player.runs}</TableCell>
                <TableCell>{player.balls}</TableCell>
                <TableCell>{player.dots}</TableCell>
                <TableCell>{player.fours}</TableCell>
                <TableCell>{player.sixes}</TableCell>
                <TableCell>{((player.runs / player.balls) * 100).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bowling Table */}
      <TableContainer component={Paper} className="mt-4 w-full">
        <Typography variant="h6" className="p-2 bg-[#D9B8C4] text-[#222831]  text-center">
          Bowling
        </Typography>
        <Table>
          <TableHead>
            <TableRow className="bg-[#4EA5D9]">
              <TableCell>Bowler</TableCell>
              <TableCell>Overs</TableCell>
              <TableCell>Runs</TableCell>
              <TableCell>Wickets</TableCell>
              <TableCell>Maidens</TableCell>
              <TableCell>Dots</TableCell>
              <TableCell>4s</TableCell>
              <TableCell>6s</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentInnings.bowling.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.bowler}</TableCell>
                <TableCell>{player.overs.toFixed(1)}</TableCell>
                <TableCell>{player.runs}</TableCell>
                <TableCell>{player.wickets}</TableCell>
                <TableCell>{player.maidens}</TableCell>
                <TableCell>{player.dots}</TableCell>
                <TableCell>{player.fours}</TableCell>
                <TableCell>{player.sixes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Score Summary */}
      <div className="border-b-4 border-r-4 border-l-4 border-black w-full flex flex-wrap text-base p-4 justify-evenly lg:text-lg">
        <div>Total: {currentInnings.score} - {currentInnings.wickets}</div>
        <div>Overs: {getOversFromBowlers(currentInnings.bowling)}</div>
        <div>Extras: {getExtras(currentInnings.extras)}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
