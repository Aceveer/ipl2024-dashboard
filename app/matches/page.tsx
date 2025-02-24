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
  const [filters, setFilters] = useState({
    matchNo: "",
    team: "",
    team1: "",
    team2: "",
    winningTeam: "",
    losingTeam: "",
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`https://python-ipl-2024.onrender.com/matches`);
        const data = await response.json();
        setMatches(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching match data:", error);
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredMatches = matches.filter((match) => {
    return (
      (filters.matchNo === "" || match.match_no.toString().includes(filters.matchNo)) &&
      (filters.team === "" || match.team1.includes(filters.team) || match.team2.includes(filters.team)) &&
      (filters.team1 === "" || match.team1.includes(filters.team1)) &&
      (filters.team2 === "" || match.team2.includes(filters.team2)) &&
      (filters.winningTeam === "" || match.winning_team.includes(filters.winningTeam)) &&
      (filters.losingTeam === "" || (match.team1 !== match.winning_team && match.team1.includes(filters.losingTeam)) ||
        (match.team2 !== match.winning_team && match.team2.includes(filters.losingTeam)))
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
      <div className="p-4 rounded-xl bg-[#2892D7] mt-4 mx-4 md:mx-16">
        <h2 className="text-lg font-bold mb-2 text-[#222831]">Filter Matches</h2>
        <div className="grid grid-cols-3 gap-4 text-xs md:text-base sticky">
          <input type="text" name="matchNo" placeholder="Match No" className="p-2 border rounded text-[#222831]" value={filters.matchNo} onChange={handleFilterChange} />
          <input type="text" name="team" placeholder="Team" className="p-2 border rounded text-[#222831]" value={filters.team} onChange={handleFilterChange} />
          <input type="text" name="team1" placeholder="Team 1" className="p-2 border rounded text-[#222831]" value={filters.team1} onChange={handleFilterChange} />
          <input type="text" name="team2" placeholder="Team 2" className="p-2 border rounded text-[#222831]" value={filters.team2} onChange={handleFilterChange} />
          <input type="text" name="winningTeam" placeholder="Winning Team" className="p-2 border rounded text-[#222831]" value={filters.winningTeam} onChange={handleFilterChange} />
          <input type="text" name="losingTeam" placeholder="Losing Team" className="p-2 border rounded text-[#222831]" value={filters.losingTeam} onChange={handleFilterChange} />
        </div>
      </div>

        <div className="flex-1">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.match_no}
              date={match.date}
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
        </>
      )}
      <Footer />
    </div>
  );
}
