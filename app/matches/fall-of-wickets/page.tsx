"use client";
import FOWChart from "@/app/components/fowChart";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BottomFourAnalysis from "@/app/components/bottom_four_analysis";
import Loader from "@/app/commonFunctions/loader";

interface Runs{
    innings1: Innings [];
    innings2: Innings [];
}

interface Innings{
    ball: number;
    runs: number;
    runs_at_wicket_fall: number;
    over: number;
    player_dismissed: string;
    batting: string;
    bowling: string;
}

interface Response{
    runs: Runs;
    FallOfWickets: Runs;
    runPerOver: Runs;
    teams: Runs;

}


const FallOfWicketsPage = () => {
    const [matchNo, setMatchNo] = useState<string | null>(null);
    
    const [runsPerBall, setRunsPerBall] = useState<Runs>();
    const [wickets, setWickets] = useState<Runs>();
    const [team,setTeams] = useState<Runs>();

    const [loading,setLoading] = useState(true)

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
        const response = await fetch(`http://127.0.0.1:5000/get-fow/${matchNo}`);
        const data: Response = await response.json();
        setRunsPerBall(data.runs)

        setWickets(data.FallOfWickets)
        setTeams(data.teams)
            
        setLoading(false);
        } catch (error) {
        console.error("Error fetching match details:", error);
        setLoading(false);
        }
    };

    fetchMatchDetails();
    }, [matchNo]); // ✅ Depend on matchNo

    if (loading) {
        return <Loader/>;
      }
    return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
            <FOWChart
                runsPerBall={runsPerBall || { innings1: [], innings2: [] }}
                wickets={wickets || { innings1: [], innings2: [] }}
                teams={team || { innings1: [], innings2: [] }}
            />
            <BottomFourAnalysis disabledOption="Fall Of Wickets" />
            </div>
        <Footer />
    </div>

    );
};

export default FallOfWicketsPage;
