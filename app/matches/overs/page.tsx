"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BottomFourAnalysis from "@/app/components/bottom_four_analysis";
import Loader from "@/app/commonFunctions/loader";
import RPO from "@/app/matches/overs/rpo";
import MatchHeader from "@/app/components/matchHeader";

interface OverData {
    over: string;
    runs: number;
    wickets: number;
}

interface OverAnalysis{
    innings1: Phase;
    innings2: Phase;
}

interface Phase {
    death: PhaseInformation;
    middle:PhaseInformation;
    pp:PhaseInformation;
}

interface PhaseInformation{
    top_batter:{balls: number, player:string, runs:number};
    top_bowler:{balls: number, player:string, wickets:number, runs_conceded:number};
    total:number;
    wickets:number;
}

interface TeamData{
    innings1: {batting:string, bowling:string}[];
    innings2: {batting:string, bowling:string}[];
}

interface Innings {
    innings1: OverData[];
    innings2: OverData[];
}

interface ResponseData {
    runPerOver: Innings;
    wicketOver: Innings;
    teams: TeamData;
    topPerformers:OverAnalysis,
    header: {
        matchNo : number,
        venue : string
        date : string,
        winning_team : string,
        margin : number,
        won_by : string
    }
}


const FallOfWicketsPage = () => {
    const [matchNo, setMatchNo] = useState<string | null>(null);
    const [runsPerOver, setRunsPerOver] = useState<Innings>({ innings1: [], innings2: [] });
    const [wickets, setWickets] = useState<Innings>({ innings1: [], innings2: [] });
    const [team,setTeam] = useState<TeamData>({innings1:[], innings2:[]});
    const [overAnalysis, setOverAnalysis] = useState<OverAnalysis>();
    const [header, setHeader] = useState<ResponseData["header"]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedMatchNo = sessionStorage.getItem("matchNo");
            setMatchNo(storedMatchNo);
        }
    }, []);

    useEffect(() => {
        if (!matchNo) return;

        const fetchMatchDetails = async () => {
            try {
                const response = await fetch(`https://python-ipl-2024.onrender.com/get-overs/${matchNo}`);
                const data: ResponseData = await response.json();
                setRunsPerOver(data.runPerOver);
                setWickets(data.wicketOver);
                setTeam(data.teams)
                setOverAnalysis(data.topPerformers)
                setHeader(data.header);

            } catch (error) {
                console.error("Error fetching match details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchDetails();
    }, [matchNo]); 

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="flex flex-col min-h-screen">
    <Header />

    <div className="flex-1">
        {/* Bar Chart */}
        <MatchHeader 
                matchNo={header?.matchNo}
                margin={header?.margin}
                date={header?.date}
                venue={header?.venue}
                winning_team={header?.winning_team}
                won_by={header?.won_by}
                />
        {overAnalysis && (
            <RPO
                runsPerOver={runsPerOver}
                wicketsPerOver={wickets}
                team={team}
                topPerformers={overAnalysis}
            />
            )}
        <BottomFourAnalysis disabledOption="Overs" />
    </div>

    <Footer />
</div>
    );
};

export default FallOfWicketsPage;
