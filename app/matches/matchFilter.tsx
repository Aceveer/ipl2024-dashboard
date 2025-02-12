import React, { useState } from "react";

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

interface MatchFilterProps {
  matches: Match[];
  onFilterChange: (filteredMatches: Match[]) => void;
}

const MatchFilter: React.FC<MatchFilterProps> = ({ matches, onFilterChange }) => {
  const [venue, setVenue] = useState("");
  const [team, setTeam] = useState("");
  const [matchNumber, setMatchNumber] = useState("");

  // Handle filter logic
  const handleFilter = () => {
    let filteredMatches = matches;

    if (venue) {
      filteredMatches = filteredMatches.filter((match) => match.venue.includes(venue));
    }
    if (team) {
      filteredMatches = filteredMatches.filter((match) => match.team1 === team || match.team2 === team);
    }
    if (matchNumber) {
      filteredMatches = filteredMatches.filter((match) => match.match_no.toString() === matchNumber);
    }

    onFilterChange(filteredMatches);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Venue Filter */}
      <select className="border p-2" value={venue} onChange={(e) => setVenue(e.target.value)}>
        <option value="">All Venues</option>
        {[...new Set(matches.map((match) => match.venue))].map((venue) => (
          <option key={venue} value={venue}>{venue}</option>
        ))}
      </select>

      {/* Team Filter */}
      <select className="border p-2" value={team} onChange={(e) => setTeam(e.target.value)}>
        <option value="">All Teams</option>
        {[...new Set(matches.flatMap((match) => [match.team1, match.team2]))].map((team) => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>

      {/* Match Number Filter */}
      <input
        type="number"
        className="border p-2"
        placeholder="Match No."
        value={matchNumber}
        onChange={(e) => setMatchNumber(e.target.value)}
      />

      {/* Apply Filter Button */}
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleFilter}>
        Apply Filters
      </button>
    </div>
  );
};

export default MatchFilter;
