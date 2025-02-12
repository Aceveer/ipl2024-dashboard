"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Loader from "../../commonFunctions/loader";
import { TooltipItem } from "chart.js"; // Import TooltipItem type
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

interface Innings{
  ball: number;
  runs: number;
  runs_at_wicket_fall: number;
  over: number;
  player_dismissed: string;
  batting: string;
  bowling: string;
}

interface FOWChartProps {
  runsPerBall: {
    innings1: Innings[];
    innings2: Innings[];
  };
  wickets: {
    innings1: Innings[];
    innings2: Innings[];
  };
  teams: {
    innings1: Innings[];
    innings2: Innings[];
  }
}

const FOWChart: React.FC<FOWChartProps> = ({ runsPerBall, wickets, teams }) => {
  // Check if runsPerBall and wickets data is available
  if (!runsPerBall || !wickets) return <Loader />;

  const innings1Runs = runsPerBall.innings1.map((data, index) => ({
    x: index + 1, // Ball number (assuming sequential order)
    y: data.runs, // Runs scored at that ball
  }));
  
  const innings2Runs = runsPerBall.innings2.map((data, index) => ({
    x: index + 1,
    y: data.runs,
  }));
  
  // Add an initial point at (0,0) if needed
  innings1Runs.unshift({ x: 0, y: 0 });
  innings2Runs.unshift({ x: 0, y: 0 });


  // Extract Wicket data for both innings (only show points at the wickets)
  const getWicketPoints = (wicketsData: Innings[]) => {
    return wicketsData.map((w) => ({
      x: w.ball, // Ball number as x-axis
      y: w.runs_at_wicket_fall, // Runs at the time of wicket as y-axis
      player: w.player_dismissed, // Player's name who got dismissed
    }));
  };

  const innings1Wickets = getWicketPoints(wickets.innings1);
  const innings2Wickets = getWicketPoints(wickets.innings2);


  // Chart data setup
  const data = {
    labels: Array.from({ length: Math.max(runsPerBall.innings1.length, runsPerBall.innings2.length) }, (_, i) => i + 1),
    datasets: [
      {
        label: `${teams.innings1[0].batting}`,
        data: innings1Runs,
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
        spanGaps: false, // Ensure the line doesn't break between valid points
        pointRadius: 0, // No points at every ball
        borderWidth: 4, // Line thickness
      },
      {
        label: `${teams.innings2[0].batting}`,
        data: innings2Runs,
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        spanGaps: false,
        pointRadius: 0, // No points at every ball
        borderWidth: 4, // Line thickness
      },
      {
        label: `${teams.innings1[0].batting} Wickets`,
        data: innings1Wickets,
        borderColor: "red",
        backgroundColor: "red",
        pointRadius: 5,
        pointStyle: "circle", // Circle shape for wicket points
        fill: false,
        showLine: false, // No line connecting the points, only show the points
      },
      {
        label: `${teams.innings2[0].batting} Wickets`,
        data: innings2Wickets,
        borderColor: "orange",
        backgroundColor: "orange",
        pointRadius: 5,
        pointStyle: "circle", // Circle shape for wicket points
        fill: false,
        showLine: false, // No line connecting the points, only show the points
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // For better mobile scaling
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Ensure it's a valid Chart.js position
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems: TooltipItem<'line'>[]) {  // FIXED: Changed 'scatter' to 'line'
            if (tooltipItems.length > 0) {
              const ball = (tooltipItems[0].raw as { x: number }).x; // Explicitly type raw
              return `Over ${Math.ceil(ball / 6) - 1}.${ball % 6 ? ball % 6 : 6}`;
            }
            return "";
          },
          label: function (context: TooltipItem<'line'>) {  // FIXED: Changed 'scatter' to 'line'
            const rawData = context.raw as { player?: string; y: number }; // Explicit typing
  
            if (context.dataset.label?.includes("Wickets") && rawData.player) {
              return `Wicket: ${rawData.player}, FoW: ${rawData.y}`;
            }
            return `Runs: ${rawData.y}`;
          },
        },
      },      
    },
    scales: {
      x: {
        type: "linear" as const, // Ensure x-axis is treated as linear scale
        min: 0, // Ensure x-axis starts at 0 (ball number)
        title: {
          display: true,
          text: "Ball Number",
        },
      },
      y: {
        min: 0, // Ensure y-axis starts at 0 (runs)
        title: {
          display: true,
          text: "Score",
        },
      },
    },
  };

  return (
    <div className="flex flex-col bg-[#9BCBD7] h-auto px-6 m-4 rounded-2xl py-4 flex-wrap">
      <div className="w-full h-[400px] md:h-[500px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FOWChart;
