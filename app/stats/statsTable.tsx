"use client"
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
} from "@mui/material";

// Define TypeScript interfaces
interface BattingStats {
  striker: string;
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
  bowler: string;
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
  Runs_Conceded_Most_Runs_Innings: number;
}

// Define type for API response
interface StatsResponse {
  Batting_Stats: BattingStats[];
  Bowling_Stats: BowlingStats[];
}

const StatsTable: React.FC = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [view, setView] = useState<"Batting" | "Bowling">("Batting");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-stats")
      .then((response) => response.json())
      .then((data: StatsResponse) => {
        // Sort batting stats by Runs (highest first)
        data.Batting_Stats.sort((a, b) => b.Runs - a.Runs);
        // Sort bowling stats by Wickets (highest first)
        data.Bowling_Stats.sort((a, b) => b.Wickets - a.Wickets);
        setStats(data);
      })
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  const battingColumns: (keyof BattingStats)[] = [
    "striker",
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
    "bowler",
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
    "Runs_Conceded_Most_Runs_Innings",
  ];

  const displayedStats = view === "Batting" ? stats?.Batting_Stats : stats?.Bowling_Stats;
  const columns = view === "Batting" ? battingColumns : bowlingColumns;

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setView(view === "Batting" ? "Bowling" : "Batting")}
      >
        Switch to {view === "Batting" ? "Bowling" : "Batting"} Stats
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col} style={{ fontWeight: "bold" }}>
                  {col.toString().replace("_", " ")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {displayedStats?.map((player: BattingStats | BowlingStats, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col}>{player[col as keyof (BattingStats | BowlingStats)]}</TableCell>
              ))}
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StatsTable;
