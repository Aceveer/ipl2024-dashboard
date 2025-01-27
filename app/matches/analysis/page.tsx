"use client"
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ScoreCard from "@/app/components/scorecard";
import { useParams } from "react-router-dom";

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

  interface Innings {
    batting: PlayerPerformance[];
    bowling: BowlerPerformance[];
  }

  interface MatchDetails {
    innings1: Innings;
    innings2: Innings;
  }


export default function Home() {

    const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
    const [loading, setLoading] = useState(true);
    
    const matchNo = sessionStorage.getItem("matchNo")

    useEffect(() => {
        const fetchMatchDetails = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/get-scorecard/${matchNo}`); // Replace with your API URL
            const data: MatchDetails = await response.json();
            setMatchDetails(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching match details:", error);
            setLoading(false);
          }
        };
    
        fetchMatchDetails();
      }, []);


  return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
                    <ScoreCard
                    matchDetails = {matchDetails}
                    />
            </div>
            <Footer />
            </div>
  );
}