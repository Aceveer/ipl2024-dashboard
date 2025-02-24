"use client"
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ScoreCard from "@/app/matches/analysis/scorecard";
import BottomFourAnalysis from "@/app/components/bottom_four_analysis";
import MatchHeader from "../../components/matchHeader";

interface PlayerPerformance {
    balls: number;
    batter: string;
    bowler: string;
    fielder: string | null;
    fours: number;
    runs: number;
    sixes: number;
    dots: number;
    wicket_type: string | null;
  }

  interface BowlerPerformance {
    bowler: string;
    dots: number;
    fours: number;
    maidens: number;
    no_balls: number;
    overs: number;
    runs: number;
    sixes: number;
    wides: number;
    wickets: number;
  }

  interface Extras {
    total:number;
    no_balls:number;
    wides:number;
    leg_byes:number;
    byes:number;
  }
  

  interface Innings {
    batting: PlayerPerformance[];
    bowling: BowlerPerformance[];
    score: number;
    team: string;
    wickets: number;
    extras: Extras;
  }

  interface MatchDetails {
    innings1: Innings;
    innings2: Innings;
    header: {
            matchNo : number,
            venue : string
            date : string,
            winning_team : string,
            margin : number,
            won_by : string
        }
  }


export default function Home() {

    const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
    
    const [matchNo, setMatchNo] = useState<string | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== "undefined") {
      const storedMatchNo = sessionStorage.getItem("matchNo");
      setMatchNo(storedMatchNo);
    }
  }, []);

  useEffect(() => {
    if (!matchNo) return;

    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`https://python-ipl-2024.onrender.com/get-scorecard/${matchNo}`);
        const data: MatchDetails = await response.json();
        setMatchDetails(data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchMatchDetails();
  }, [matchNo]);


  return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              <MatchHeader 
                matchNo={matchDetails?.header.matchNo}
                margin={matchDetails?.header.margin}
                date={matchDetails?.header.date}
                venue={matchDetails?.header.venue}
                winning_team={matchDetails?.header.winning_team}
                won_by={matchDetails?.header.won_by}
                />
              <ScoreCard matchDetails = {matchDetails}/>
              <BottomFourAnalysis disabledOption="Scorecard" />

            </div>
            <Footer />
            </div>
  );
}