"use client"
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BottomFourAnalysis from "@/app/components/bottom_four_analysis";
import PartnershipCard from "@/app/matches/fall-of-wickets/partnership_stats";


interface Partnership{
    balls:number;
    balls1: number;
    balls2: number;
    batter1: string;
    batter2: string;
    contribution1: number;
    contribution2: number;
    extras: number;
    runs: number;
    runs1:number;
    runs2: number;
}

interface Response{
    partnership: {"1" : Partnership[], "2": Partnership[]};
    innings1batting: string;
    innings2batting: string
}

export default function Home() {
    
    const [innings1, setInnings1] = useState<Partnership[] | null>(null);
    const [innings2, setInnings2] = useState<Partnership[] | null>(null);
    const [innings1batting, setInnings1Batting] = useState<string | null>(null);
    const [innings2batting, setInnings2Batting] = useState<string | null>(null);
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

    const fetchPartnershipDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-partnerships/${matchNo}`);
        const data: Response = await response.json();
        setInnings1(data.partnership["1"]);
        setInnings2(data.partnership["2"]);
        setInnings1Batting(data.innings1batting);
        setInnings2Batting(data.innings2batting);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchPartnershipDetails();
  }, [matchNo]); // ✅ Depend on matchNo


  return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
                <PartnershipCard innings1data = {innings1} innings2data = {innings2} innings1batting={innings1batting} innings2batting={innings2batting}/>
                <BottomFourAnalysis disabledOption="Partnerships" />
            </div>
            <Footer />
            </div>
  );
}