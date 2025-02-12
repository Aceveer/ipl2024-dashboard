"use client";

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface PlayerStats {
  name: string;
  runs?: number;
  balls?: number;
  matches?: number;
  notOuts?: number;
  highScore?: number;
  average?: number;
  strikeRate?: number;
  hundreds?: number;
  fifties?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  overs?: number;
  economy?: number;
  threeW?: number;
  fourW?: number;
  fiveW?: number;
}

interface StatsTableProps {
  stats: PlayerStats[];
  isBatting: boolean;
  onToggle: () => void;
}

const StatsTable: React.FC<StatsTableProps> = ({ stats, isBatting }) => {
  return (
    <div className="w-full">
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              {isBatting ? (
                <>
                  <TableCell>Runs</TableCell>
                  <TableCell>Balls</TableCell>
                  <TableCell>Matches</TableCell>
                  <TableCell>Not Outs</TableCell>
                  <TableCell>High Score</TableCell>
                  <TableCell>Avg</TableCell>
                  <TableCell>SR</TableCell>
                  <TableCell>100s</TableCell>
                  <TableCell>50s</TableCell>
                  <TableCell>4s</TableCell>
                  <TableCell>6s</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Wkts</TableCell>
                  <TableCell>Overs</TableCell>
                  <TableCell>Runs</TableCell>
                  <TableCell>Avg</TableCell>
                  <TableCell>Econ</TableCell>
                  <TableCell>SR</TableCell>
                  <TableCell>3W</TableCell>
                  <TableCell>4W</TableCell>
                  <TableCell>5W</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((player) => (
              <TableRow key={player.name}>
                <TableCell>{player.name}</TableCell>
                {isBatting ? (
                  <>
                    <TableCell>{player.runs}</TableCell>
                    <TableCell>{player.balls}</TableCell>
                    <TableCell>{player.matches}</TableCell>
                    <TableCell>{player.notOuts}</TableCell>
                    <TableCell>{player.highScore}</TableCell>
                    <TableCell>{player.average}</TableCell>
                    <TableCell>{player.strikeRate}</TableCell>
                    <TableCell>{player.hundreds}</TableCell>
                    <TableCell>{player.fifties}</TableCell>
                    <TableCell>{player.fours}</TableCell>
                    <TableCell>{player.sixes}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{player.wickets}</TableCell>
                    <TableCell>{player.overs}</TableCell>
                    <TableCell>{player.runs}</TableCell>
                    <TableCell>{player.average}</TableCell>
                    <TableCell>{player.economy}</TableCell>
                    <TableCell>{player.strikeRate}</TableCell>
                    <TableCell>{player.threeW}</TableCell>
                    <TableCell>{player.fourW}</TableCell>
                    <TableCell>{player.fiveW}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StatsTable;
