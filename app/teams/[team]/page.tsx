"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ScoreCard from "@/app/teams/[team]/battingCard";
import WicketCard from "@/app/teams/[team]/wicketCard";
import StatsTable from "@/app/teams/[team]/statsTable";
import { teams } from "@/app/commonFunctions/teams";
import WinsCard from "./winsCard";
import { Button } from "@mui/material";

interface Response {
  average_analysis: Analysis;
  teamAnalysis: Analysis;
  batterStats: Stats[];
  bowlerStats: BowlerStats[];
}

interface Analysis {
  avg_score_batting_first: number;
  avg_score_batting_second: number;
  avg_wicket_bowling_first: number;
  avg_wicket_bowling_second: number;
  overall_avg_score: number;
  overall_wickets: number;
  team_won_batting_first: number;
  team_won_bowling_first: number;
  batting_first_count: number;
  bowling_first_count: number;
  points: number;
}

interface Stats {
  average: number;
  balls: number;
  fiftys: number;
  fours: number;
  high_score: number;
  hundreds: number;
  matches: number;
  not_outs: number;
  player: string;
  runs: number;
  sixes: number;
  strike_rate: number;
}

interface BowlerStats {
  average: number;
  economy: number;
  five_w: number;
  four_w: number;
  innings: number;
  matches: number;
  overs: number;
  player: string;
  runs_conceded: number;
  strike_rate: number;
  three_w: number;
  wickets: number;
}

export default function TeamDetails() {
  const params = useParams();
  const teamName = typeof params.team === "string" ? params.team : null;

  const [teamData, setTeamData] = useState<Response | null>(null);
  const [isBatting, setIsBatting] = useState(true);

  const team = teams.find((t) => t.code === teamName);

  useEffect(() => {
    if (!teamName) return;

    sessionStorage.setItem("teamName", teamName);

    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-teams/${teamName}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data: Response = await response.json();
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchMatchDetails();
  }, [teamName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {teamData && (
        <div className="flex flex-col items-center p-6 space-y-6 w-full">
          {/* Team Header with Logo & Name */}
          <div
            className="flex items-center w-full px-6 py-4 rounded-lg shadow-md"
            style={{
              background: `linear-gradient(to right, ${team?.from || "#000"}, ${team?.to || "#333"})`,
            }}
          >
            <Image
              src={`/teamLogo/${teamName}.png`}
              alt={teamName || ""}
              width={75}
              height={75}
              className="rounded-lg"
            />
            <h1 className="text-5xl font-extrabold text-white ml-6">{team?.name}</h1>
            <h1 className="text-5xl font-extrabold text-white ml-6">{teamData.teamAnalysis.points}</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <WinsCard
              teamName={teamName || ""}
              batting_first_count={teamData.teamAnalysis.batting_first_count}
              bowling_first_count={teamData.teamAnalysis.bowling_first_count}
              team_won_batting_first={teamData.teamAnalysis.team_won_batting_first}
              team_won_bowling_first={teamData.teamAnalysis.team_won_bowling_first}
            />
            <ScoreCard
              teamName={teamName || ""}
              teamAvgBatFirst={teamData.teamAnalysis.avg_score_batting_first}
              teamAvgBatSecond={teamData.teamAnalysis.avg_score_batting_second}
              allAvgBatFirst={teamData.average_analysis.avg_score_batting_first}
              allAvgBatSecond={teamData.average_analysis.avg_score_batting_second}
            />
            <WicketCard
              teamName={teamName || ""}
              wicketsBowlingFirst={teamData.teamAnalysis.avg_wicket_bowling_first}
              wicketsBowlingSecond={teamData.teamAnalysis.avg_wicket_bowling_second}
              allAvgBowlFirst={teamData.average_analysis.avg_wicket_bowling_first}
              allAvgBowlSecond={teamData.average_analysis.avg_wicket_bowling_second}
            />
          </div>

          {/* Toggle Button & Stats Table */}
          <div className="w-full flex flex-col items-center">
            <Button variant="contained" color="primary" onClick={() => setIsBatting(!isBatting)}>
              {isBatting ? "Show Bowlers" : "Show Batters"}
            </Button>

            <StatsTable
              stats={
                isBatting
                  ? teamData.batterStats.map((batter) => ({
                      name: batter.player,
                      runs: batter.runs,
                      balls: batter.balls,
                      matches: batter.matches,
                      notOuts: batter.not_outs,
                      highScore: batter.high_score,
                      average: batter.average,
                      strikeRate: batter.strike_rate,
                      hundreds: batter.hundreds,
                      fifties: batter.fiftys,
                      fours: batter.fours,
                      sixes: batter.sixes,
                    }))
                  : teamData.bowlerStats.map((bowler) => ({
                      name: bowler.player,
                      wickets: bowler.wickets,
                      overs: bowler.overs,
                      runs: bowler.runs_conceded,
                      average: bowler.average,
                      economy: bowler.economy,
                      strikeRate: bowler.strike_rate,
                      threeW: bowler.three_w,
                      fourW: bowler.four_w,
                      fiveW: bowler.five_w,
                    }))
              }
              isBatting={isBatting}
              onToggle={() => setIsBatting(!isBatting)}
            />
          </div>
        </div>
      )}

      {/* Footer Sticks to Bottom */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
