import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Loader from "../../commonFunctions/loader";
import OversCard from "@/app/matches/overs/overs_card";
import { TooltipItem } from "chart.js"; // Import TooltipItem type
import { Button } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OverData {
    over: string;
    runs: number;
}

interface WicketData {
    over: string;
    wickets: number;
}

interface Innings {
    innings1: OverData[];
    innings2: OverData[];
}

interface Wickets {
    innings1: WicketData[];
    innings2: WicketData[];
}
interface TeamData{
    innings1: {batting:string, bowling:string}[],
    innings2: {batting:string, bowling:string}[]
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

interface RPOProps {
    runsPerOver: Innings;
    wicketsPerOver: Wickets;
    team: TeamData;
    topPerformers:OverAnalysis
}

const RPO: React.FC<RPOProps> = ({ runsPerOver, wicketsPerOver,team, topPerformers }) => {
    const [selectedTeam, setSelectedTeam] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!runsPerOver || !wicketsPerOver || !team ||!topPerformers) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        );
    }

    const handleTeamSwitch = (team: number) => {
    setLoading(true); // Show the loader
    setTimeout(() => {
        setSelectedTeam(team);
        setLoading(false); // Hide the loader after 2 seconds
    }, 1000);
    };

    if (loading) {
    return (
        <div className="flex justify-center items-center h-full">
        <Loader />
        </div>
    );
    }

    const currentRuns = selectedTeam === 1 ? runsPerOver.innings1 : runsPerOver.innings2;
    const currentWickets = selectedTeam === 1 ? wicketsPerOver.innings1 : wicketsPerOver.innings2;
    const currentPerformers = selectedTeam === 1 ? topPerformers.innings1 : topPerformers.innings2

    const wicketsMap = new Map(currentWickets.map(w => [w.over, w.wickets]));

    const chartData = {
        labels: currentRuns.map(over => over.over),
        datasets: [
            {
                label: "Runs",
                data: currentRuns.map(over => over.runs),
                backgroundColor: currentRuns.map(over => {
                    const wicket = currentWickets.find(wicket => wicket.over === over.over);
                    return wicket && wicket.wickets >= 1 ? "red" : "orange";
                }),
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (tooltipItems: TooltipItem<'bar'>[]) => {
                        const over = tooltipItems[0].label;
                        const wickets = wicketsMap.get(over) || 0;
                        return `Over ${over} - Wickets: ${wickets}`;
                    },
                },
            },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="flex flex-col h-auto m-8 items-center text-center">
            {/* Team Selection */}
            <div className="flex flex-row items-center text-center text-xs md:text-xl w-full px-8">
                <Button
                variant={selectedTeam === 1 ? "contained" : "outlined"}
                className="w-full"
                onClick={() => handleTeamSwitch(1)}
                >
                    {team.innings1[0].batting}
                </Button>
                <Button
                variant={selectedTeam === 2 ? "contained" : "outlined"}
                className="w-full"
                onClick={() => handleTeamSwitch(2)}
                >
                    {team.innings2[0].batting}
                </Button>
            </div>

            {/* Bar Chart */}
            <div className="w-full md:w-3/4 mt-6 relative bg-[#EEEEEE] h-full p-6 m-4 rounded-2xl">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 mt-6">
            <OversCard
                runs={currentPerformers.pp.total}
                wickets={currentPerformers.pp.wickets}
                overs={6}
                desc={"Powerplay"}
                batterName={currentPerformers.pp.top_batter.player}
                batterRuns={currentPerformers.pp.top_batter.runs}
                batterBalls={currentPerformers.pp.top_batter.balls}
                bowlerName={currentPerformers.pp.top_bowler.player}
                bowlerRuns={currentPerformers.pp.top_bowler.runs_conceded}
                bowlerOvers={currentPerformers.pp.top_bowler.balls}
                bowlerWickets={currentPerformers.pp.top_bowler.wickets}
            />
            <OversCard
                runs={currentPerformers.middle.total}
                wickets={currentPerformers.middle.wickets}
                overs={9}
                desc={"Middle"}
                batterName={currentPerformers.middle.top_batter.player}
                batterRuns={currentPerformers.middle.top_batter.runs}
                batterBalls={currentPerformers.middle.top_batter.balls}
                bowlerName={currentPerformers.middle.top_bowler.player}
                bowlerRuns={currentPerformers.middle.top_bowler.runs_conceded}
                bowlerOvers={currentPerformers.middle.top_bowler.balls}
                bowlerWickets={currentPerformers.middle.top_bowler.wickets}
            />
            <OversCard
                runs={currentPerformers.death.total}
                wickets={currentPerformers.death.wickets}
                overs={5}
                desc={"Death"}
                batterName={currentPerformers.death.top_batter.player}
                batterRuns={currentPerformers.death.top_batter.runs}
                batterBalls={currentPerformers.death.top_batter.balls}
                bowlerName={currentPerformers.death.top_bowler.player}
                bowlerRuns={currentPerformers.death.top_bowler.runs_conceded}
                bowlerOvers={currentPerformers.death.top_bowler.balls}
                bowlerWickets={currentPerformers.death.top_bowler.wickets}
            />
        </div>
        </div>
    );
};

export default RPO;
