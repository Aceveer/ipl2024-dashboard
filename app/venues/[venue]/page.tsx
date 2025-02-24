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
import PhaseStatsCard from "./phaseStatCard";
import Loader from "@/app/commonFunctions/loader";

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
  phase_stats: {
		firstInnings: {
			Death: {
				runs: number,
				wickets: number
			},
			Middle: {
				runs: number,
				wickets: number
			},
			Powerplay: {
				runs: number,
				wickets: number
			}
		},
		secondInnings: {
			Death: {
				runs: number,
				wickets: number
			},
			Middle: {
				runs: number,
				wickets: number
			},
			Powerplay: {
				runs: number,
				wickets: number
			}
		}
	},
}

export default function TeamDetails() {
    const params = useParams();
    const venueName = params?.venue ? decodeURIComponent(params.venue as string) : null;
    const [loader,setLoader] = useState(true);
    const [venueData, setVenueData] = useState<Response | null>(null);

    const venue = venues.find((v) => v.name === venueName); // Find venue
    const team = teams.find((t) => t.code === venue?.team); // Find team by code
    
    const fromColor = team?.from || "#000"; // Default to black
    const toColor = team?.to || "#333"; // Default to dark gray

  useEffect(() => {
    if (!venueName) return;
  
    sessionStorage.setItem("venueName", venueName);
  
    const fetchMatchDetails = async () => {
      try {
        setLoader(true);
        const response = await fetch(`https://python-ipl-2024.onrender.com/get-venue/${encodeURIComponent(venueName)}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data: Response = await response.json();
        setVenueData(data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };
  
    fetchMatchDetails();
  }, [venueName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {loader ? <Loader/> : (
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
              className="rounded-lg h-12 w-12 md:h-24 md:w-24"
            />
            <h1 className="text-m font-extrabold text-white ml-6 md:text-2xl">{venue?.name}</h1>
            <h1 className="text-m font-extrabold text-white ml-6 md:text-2xl"><span className="italic">Home Team </span><span className="font-bold">{team?.name}</span></h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <AllPurposeCard
                title = {"Match Wins"}
                subheading1 = {"Wins Batting First"}
                value1 = {venueData?.matches_won_batting_first as number}
                suffix = {"Wins"}
                subheading2 = {"Wins Batting Second"}
                value2 = {venueData?.matches_won_batting_second as number}
            />
            <AllPurposeCard
                title = {"Average Scores"}
                subheading1 = {"Batting First"}
                value1 = {venueData?.avg_score_batting_first as number}
                suffix = {"Runs"}
                subheading2 = {"Batting Second"}
                value2 = {venueData?.avg_score_batting_second as number}
            />
            <AllPurposeCard
                title = {"Wickets Taken"}
                subheading1 = {"Bowling First"}
                value1 = {venueData?.avg_wickets_bowling_first as number}
                suffix = {"Wickets"}
                subheading2 = {"Bowling Second"}
                value2 = {venueData?.avg_wickets_bowling_second as number}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <PhaseStatsCard
                desc="Powerplay"
                overs="0-6"
                wickets1={venueData?.phase_stats.firstInnings.Powerplay.wickets ?? 1}
                runs1={venueData?.phase_stats.firstInnings.Powerplay.runs ?? 1}
                wickets2={venueData?.phase_stats.secondInnings.Powerplay.wickets ?? 1}
                runs2={venueData?.phase_stats.secondInnings.Powerplay.runs ?? 1}
                matches={venueData?.matches_played ?? 1}
            />
            <PhaseStatsCard
              desc="Middle"
              overs="7-15"
              wickets1={venueData?.phase_stats.firstInnings.Middle.wickets ?? 1}
              runs1={venueData?.phase_stats.firstInnings.Middle.runs ?? 1}
              wickets2={venueData?.phase_stats.secondInnings.Middle.wickets ?? 1}
              runs2={venueData?.phase_stats.secondInnings.Middle.runs ?? 1}
              matches={venueData?.matches_played ?? 1}
            />
            <PhaseStatsCard
              desc="Death"
              overs="16-20"
              wickets1={venueData?.phase_stats.firstInnings.Death.wickets ?? 1}
              runs1={venueData?.phase_stats.firstInnings.Death.runs ?? 1}
              wickets2={venueData?.phase_stats.secondInnings.Death.wickets ?? 1}
              runs2={venueData?.phase_stats.secondInnings.Death.runs ?? 1}
              matches={venueData?.matches_played ?? 1}
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
                title="Best Bowler" 
                name={venueData?.highest_wicket_taker.bowler as string} 
                matchNo={venueData?.highest_wicket_taker.match_no as number} 
                statLabel="Wickets" 
                statValue={venueData?.highest_wicket_taker.wickets as number} 
                extraInfo={"Balls " +venueData?.highest_wicket_taker.balls_bowled } 
                />
            </Grid>
            </Grid>


        </div>
        )}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
