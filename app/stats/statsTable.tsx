"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
} from "@mui/material";
import Loader from "../commonFunctions/loader";
import Image from "next/image";

// Define TypeScript interfaces
interface BattingStats {
  Striker: string;
  Team: string;
  Runs: number;
  Balls_Faced: number;
  SR: number;
  Fours: number;
  Sixes: number;
  Hundreds: number;
  Fifties: number;
  Highest_Score: number;
  Average: number;
  Dismissals: number;
  Not_Outs: number;
}

interface BowlingStats {
  Bowler: string;
  Team: string;
  Wickets: number;
  Balls_Bowled: number;
  Economy: number;
  Strike_Rate: number;
  Average: number;
  Dot_Balls: number;
  Hat_Tricks: number;
  Matches: number;
  Runs: number;
}

interface StatsResponse {
  Batting_Stats: BattingStats[];
  Bowling_Stats: BowlingStats[];
}

const StatsTable: React.FC = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [view, setView] = useState<string>("Batting");
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>("Runs");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://python-ipl-2024.onrender.com/get-stats");
        const data: StatsResponse = await response.json();

        data.Batting_Stats.sort((a, b) => b.Runs - a.Runs);
        data.Bowling_Stats.sort((a, b) => b.Wickets - a.Wickets);

        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleBatBowlSwitch = (type: string) => {
    setLoading(true);
    setTimeout(() => {
      setView(type);
      setOrderBy(type === "Batting" ? "Runs" : "Wickets"); // Reset sorting column when switching
      setOrder("desc");
      setLoading(false);
    }, 1000);
  };

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortData = (data: (BattingStats | BowlingStats)[]) => {
    return [...data].sort((a, b) => {
      const aValue = a[orderBy as keyof (BattingStats | BowlingStats)];
      const bValue = b[orderBy as keyof (BattingStats | BowlingStats)];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return 0;
    });
  };

  const battingColumns: (keyof BattingStats)[] = [
    "Striker",
    "Team",
    "Runs",
    "Balls_Faced",
    "SR",
    "Fours",
    "Sixes",
    "Hundreds",
    "Fifties",
    "Highest_Score",
    "Average",
    "Dismissals",
    "Not_Outs",
  ];

  const bowlingColumns: (keyof BowlingStats)[] = [
    "Bowler",
    "Team",
    "Wickets",
    "Balls_Bowled",
    "Economy",
    "Strike_Rate",
    "Average",
    "Dot_Balls",
    "Hat_Tricks",
    "Matches",
    "Runs",
  ];

  const displayedStats = view === "Batting" ? stats?.Batting_Stats : stats?.Bowling_Stats;
  const sortedStats = displayedStats ? sortData(displayedStats) : [];
  const columns = view === "Batting" ? battingColumns : bowlingColumns;

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-center mb-5">
            <Button
              variant={view === "Batting" ? "contained" : "outlined"}
              color="primary"
              className="w-full"
              onClick={() => handleBatBowlSwitch("Batting")}
            >
              Switch to Batting Stats
            </Button>
            <Button
              variant={view === "Bowling" ? "contained" : "outlined"}
              color="primary"
              className="w-full"
              onClick={() => handleBatBowlSwitch("Bowling")}
            >
              Switch to Bowling Stats
            </Button>
          </div>

          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow className="bg-[#4EA5D9]">
                  {columns.map((col) => (
                    <TableCell key={col} style={{ fontWeight: "bold" }}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : "asc"}
                        onClick={() => handleSort(col)}
                      >
                        {col.toString().replace("_", " ")}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedStats.map((player, index) => (
                  <TableRow key={index}>
                    {columns.map((col) => (
                      <TableCell key={col}>
                        {col === "Team" ? (
                          <Image
                            src={`/teamLogo/${player.Team}.png`}
                            alt={player.Team || ""}
                            width={20}
                            height={20}
                            className="rounded-lg"
                          />
                        ) : (
                          player[col as keyof (BattingStats | BowlingStats)]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default StatsTable;
