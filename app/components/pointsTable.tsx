"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface TeamData {
  Position: number;
  Team: string;
  Played: number;
  Wins: number;
  Losses: number;
  "No Result (TIE)": number;
  "Net Run Rate": number;
  "Total Runs Scored / Total Overs Batted": string;
  "Total Runs Conceded / Total Overs Bowled": string;
  Points: number;
}

const PointsTable = () => {
  const [pointsTable, setPointsTable] = useState<TeamData[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/points-table")
      .then((response) => response.json())
      .then((data) => setPointsTable(data))
      .catch((error) => console.error("Error fetching points table:", error));
  }, []);

  return (
    <TableContainer component={Paper} className="mt-6 bg-white shadow-lg rounded-xl border border-gray-300">
  <Table>
    <TableHead className="bg-[#95a6ba] text-white">
      <TableRow>
        <TableCell className="text-white">Position</TableCell>
        <TableCell className="text-white">Team</TableCell>
        <TableCell className="text-white">Played</TableCell>
        <TableCell className="text-white">Wins</TableCell>
        <TableCell className="text-white">Losses</TableCell>
        <TableCell className="text-white">No Result (TIE)</TableCell>
        <TableCell className="text-white">Net Run Rate</TableCell>
        <TableCell className="text-white">Total Runs Scored / Overs Batted</TableCell>
        <TableCell className="text-white">Total Runs Conceded / Overs Bowled</TableCell>
        <TableCell className="text-white">Points</TableCell>
      </TableRow>
    </TableHead>
    <TableBody className="bg-[#F9F9F9]">
      {pointsTable.map((team) => (
        <TableRow key={team.Position} className="hover:bg-gray-200 transition">
          <TableCell>{team.Position}</TableCell>
          <TableCell>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={`/teamLogo/${team.Team}.png`}
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="mt-1 text-center">{team.Team}</span>
            </div>
          </TableCell>
          <TableCell>{team.Played}</TableCell>
          <TableCell>{team.Wins}</TableCell>
          <TableCell>{team.Losses}</TableCell>
          <TableCell>{team["No Result (TIE)"]}</TableCell>
          <TableCell>{team["Net Run Rate"].toFixed(3)}</TableCell>
          <TableCell>{team["Total Runs Scored / Total Overs Batted"]}</TableCell>
          <TableCell>{team["Total Runs Conceded / Total Overs Bowled"]}</TableCell>
          <TableCell>{team.Points}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
};

export default PointsTable;
