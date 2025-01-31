"use client"
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ScoreCard from "@/app/components/scorecard";
import BottomFourAnalysis from "@/app/components/bottom_four_analysis";

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
        const response = await fetch(`http://127.0.0.1:5000/get-scorecard/${matchNo}`);
        const data: MatchDetails = await response.json();
        setMatchDetails(data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchMatchDetails();
  }, [matchNo]); // ✅ Depend on matchNo


  return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              <ScoreCard matchDetails = {matchDetails}/>
              <BottomFourAnalysis disabledOption="Scorecard" />

            </div>
            <Footer />
            </div>
  );
}