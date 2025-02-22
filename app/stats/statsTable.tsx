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
  Runs_Conceded_Most_Runs_Innings: number;
}

// Define type for API response
interface StatsResponse {
  Batting_Stats: BattingStats[];
  Bowling_Stats: BowlingStats[];
}

const StatsTable: React.FC = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [view, setView] = useState<string>("Batting");
  const [loading, setLoading] = useState(false);

  const handleBatBowlSwitch = (type: string) => {
    setLoading(true); // Show the loader
    setTimeout(() => {
      setView(type);
      setLoading(false); // Hide the loader after 2 seconds
    }, 1000);
  };

    useEffect(() => {
      const fetchStats = async () => {
        try {
          setLoading(true); // Show loader before fetching data
          const response = await fetch("http://127.0.0.1:5000/get-stats");
          const data: StatsResponse = await response.json();
    
          // Sort batting stats by Runs (highest first)
          data.Batting_Stats.sort((a, b) => b.Runs - a.Runs);
          // Sort bowling stats by Wickets (highest first)
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
  const columns = view === "Batting" ? battingColumns : bowlingColumns;

  return (
    <div style={{ padding: "20px" }}>
      {loading?(<Loader/>):
      (<div>
        <div className="flex justify-center mb-5">
          <Button
            variant={view === "Batting"? "contained" : "outlined"}
            color="primary"
            className="w-full"
            onClick={() => handleBatBowlSwitch("Batting")}
          >
            Switch to Batting Stats
          </Button>
          <Button
            variant={view === "Bowling"? "contained" : "outlined"}
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
                  {col.toString().replace("_", " ")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {displayedStats?.map((player: BattingStats | BowlingStats, index) => (
            <TableRow key={index} >
              {columns.map((col) => (
                <TableCell key={col}>
                  {col === "Team" ? 
                  (<Image
                  src={`/teamLogo/${player.Team}.png`}
                  alt={player.Team || ""}
                  width={20}
                  height={20}
                  className="rounded-lg"
                  />) 
                  : 
                  (player[col as keyof (BattingStats | BowlingStats)])}</TableCell>
              ))}
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
          </div>)}
    </div>
  );
};

export default StatsTable;
