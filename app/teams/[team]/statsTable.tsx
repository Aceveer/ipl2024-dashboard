"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

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
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof PlayerStats | "">("");

  const handleSort = (property: keyof PlayerStats) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedStats = [...stats].sort((a, b) => {
    if (!orderBy) return 0;
    const aValue = Number(a[orderBy]) || 0;
    const bValue = Number(b[orderBy]) || 0;
    return order === "asc" ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className="w-full">
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow className="bg-[#81D2C7]">
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Player
                </TableSortLabel>
              </TableCell>
              {isBatting
                ? [
                    "runs",
                    "balls",
                    "matches",
                    "notOuts",
                    "highScore",
                    "average",
                    "strikeRate",
                    "hundreds",
                    "fifties",
                    "fours",
                    "sixes",
                  ].map((col) => (
                    <TableCell key={col}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : "asc"}
                        onClick={() => handleSort(col as keyof PlayerStats)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  ))
                : [
                    "wickets",
                    "overs",
                    "runs",
                    "average",
                    "economy",
                    "strikeRate",
                    "threeW",
                    "fourW",
                    "fiveW",
                  ].map((col) => (
                    <TableCell key={col}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : "asc"}
                        onClick={() => handleSort(col as keyof PlayerStats)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStats.map((player) => (
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
