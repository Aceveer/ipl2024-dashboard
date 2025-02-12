"use client"
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import MatchCard from "./match_card";
import Loader from "../commonFunctions/loader";

interface Match {
  city: string;
  innings1_overs: number;
  date: string;
  innings1_score: number;
  innings1_wickets: number;
  innings2_overs: number;
  innings2_score: number;
  innings2_wickets: number;
  margin: number;
  match_no: number;
  player_of_the_match: string;
  team1: string;
  team2: string;
  toss_decision: string;
  toss_winner: string;
  venue: string;
  winning_team: string;
  won_by: string;
}

export default function Home() {

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/matches`); // Replace with your API URL
        const data = await response.json();
        setMatches(data); // Assuming the response is an array of matches
        setLoading(false);
      } catch (error) {
        console.error("Error fetching match data:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <Loader/>;
  }
  return (
<div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        {/* Render MatchCards dynamically */}
        {matches.map((match) => (
          <MatchCard
            key={match.match_no} // Unique key for React
            date ={match.date}
            matchNo={match.match_no}
            venue={match.venue}
            team1={match.team1}
            team2={match.team2}
            innings1Score={match.innings1_score}
            innings1Overs={match.innings1_overs}
            innings2Score={match.innings2_score}
            innings2Overs={match.innings2_overs}
            innings1_wickets={match.innings1_wickets}
            innings2_wickets={match.innings2_wickets}
            tossWinner={match.toss_winner}
            tossDecision={match.toss_decision}
            winningTeam={match.winning_team}
            margin={match.margin}
            wonBy={match.won_by}
            playerOfTheMatch={match.player_of_the_match}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}