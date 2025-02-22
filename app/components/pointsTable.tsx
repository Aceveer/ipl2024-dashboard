"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Loader from "../commonFunctions/loader";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/points-table")
      .then((response) => response.json())
      .then((data) => {
        setPointsTable(data)
        setLoading(false);
      }
    )
      .catch((error) => console.error("Error fetching points table:", error));
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <TableContainer component={Paper} className="mt-6 shadow-lg rounded-xl border border-[#E3FDFD]">
      <Table>
        <TableHead className="bg-[#81D2C7]">
          <TableRow>
            <TableCell><span className="font-bold text-[#393E46]">Position</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Team</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Played</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Wins</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Losses</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">No Result</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Net Run Rate</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Total Runs Scored / Overs Batted</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Total Runs Conceded / Overs Bowled</span></TableCell>
            <TableCell><span className="font-bold text-[#393E46]">Points</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bg-[#E0E0E2]">
          {pointsTable.map((team) => (
            <TableRow key={team.Position} className="hover:bg-[#B5BAD0] transition ">
              <TableCell><span className="text-[#393E46]">{team.Position}</span></TableCell>
              <TableCell>
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={`/teamLogo/${team.Team}.png`}
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="mt-1 text-center text-[#393E46]">{team.Team}</span>
                </div>
              </TableCell>
              <TableCell><span className="text-[#393E46]">{team.Played}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team.Wins}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team.Losses}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team["No Result (TIE)"]}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team["Net Run Rate"].toFixed(3)}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team["Total Runs Scored / Total Overs Batted"]}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team["Total Runs Conceded / Total Overs Bowled"]}</span></TableCell>
              <TableCell><span className="text-[#393E46]">{team.Points}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default PointsTable;
