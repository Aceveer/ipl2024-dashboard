"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { venues } from "@/app/commonFunctions/venues";
import {teams} from "@/app/commonFunctions/teams"
import AllPurposeCard from "./allPurposeCard";
import Grid from "@mui/material/Grid";
import BestPlayerCard from "./bestPlayerCard";

interface Response {
  avg_score_batting_first: number;
  avg_score_batting_second: number;
  avg_wickets_bowling_first: number;
  avg_wickets_bowling_second: number;
  city: string;
  highest_scorer: {
    balls_faced: number;
    batter: string;
    match_no: number;
    runs: number;
  };
  highest_wicket_taker: {
    balls_bowled: number;
    bowler: string;
    match_no: number;
    wickets: number;
  };
  matches_played: number;
  matches_won_batting_first: number;
  matches_won_batting_second: number;
  venue_name: string;
}

export default function TeamDetails() {
    const params = useParams();
    const venueName = params?.venue ? decodeURIComponent(params.venue as string) : null;

    const [venueData, setVenueData] = useState<Response | null>(null);

    const venue = venues.find((v) => v.name === venueName); // Find venue
    const team = teams.find((t) => t.code === venue?.team); // Find team by code
    console.log(venue)
    console.log(team)
    
    const fromColor = team?.from || "#000"; // Default to black
    const toColor = team?.to || "#333"; // Default to dark gray

  useEffect(() => {
    if (!venueName) return;
  
    sessionStorage.setItem("venueName", venueName);
  
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-venue/${encodeURIComponent(venueName)}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data: Response = await response.json();
        setVenueData(data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };
  
    fetchMatchDetails();
  }, [venueName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center p-6 space-y-6 w-full">
          {/* Team Header with Logo & Name */}
          <div
            className="flex items-center w-full px-6 py-4 rounded-lg shadow-md"
            style={{
              background: `linear-gradient(to right, ${fromColor}, ${toColor})`
            }}
          >
            <Image
              src={`/teamLogo/${team?.code}.png`}
              alt={team?.code || ""}
              width={75}
              height={75}
              className="rounded-lg"
            />
            <h1 className="text-4xl font-extrabold text-white ml-6">{venue?.name}</h1>
            <h1 className="text-4xl font-extrabold text-white ml-6">Home Team: {team?.name}</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <AllPurposeCard
                title = {"Batting Scores"}
                subheading1 = {"Batting First"}
                value1 = {venueData?.avg_score_batting_first as number}
                suffix = {"Runs"}
                subheading2 = {"Batting Second"}
                value2 = {venueData?.avg_score_batting_second as number}
            />
            <AllPurposeCard
                title = {"Bowling Wickets"}
                subheading1 = {"Bowling First"}
                value1 = {venueData?.avg_wickets_bowling_first as number}
                suffix = {"Wickets"}
                subheading2 = {"Bowling Second"}
                value2 = {venueData?.avg_wickets_bowling_second as number}
            />
            <AllPurposeCard
                title = {"Match Wins"}
                subheading1 = {"Wins Batting First"}
                value1 = {venueData?.matches_won_batting_first as number}
                suffix = {"Wins"}
                subheading2 = {"Wins Batting Second"}
                value2 = {venueData?.matches_won_batting_second as number}
            />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <BestPlayerCard 
                title="Highest Scorer" 
                name={venueData?.highest_scorer.batter as string}
                matchNo={venueData?.highest_scorer.match_no as number} 
                statLabel="Runs" 
                statValue={venueData?.highest_scorer.runs as number} 
                extraInfo={"Balls "+venueData?.highest_scorer.balls_faced} 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <BestPlayerCard 
                title="Highest Wicket Taker" 
                name={venueData?.highest_wicket_taker.bowler as string} 
                matchNo={venueData?.highest_wicket_taker.match_no as number} 
                statLabel="Wickets" 
                statValue={venueData?.highest_wicket_taker.wickets as number} 
                extraInfo={"Balls " +venueData?.highest_wicket_taker.balls_bowled } 
                />
            </Grid>
            </Grid>


        </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
