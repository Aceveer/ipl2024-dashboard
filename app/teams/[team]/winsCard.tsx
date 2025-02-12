import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface WinsCardProps {
  teamName: string;
  batting_first_count: number;
  bowling_first_count: number;
  team_won_batting_first: number;
  team_won_bowling_first: number;
}

const WinsCard: React.FC<WinsCardProps> = ({ teamName, batting_first_count, bowling_first_count, team_won_batting_first, team_won_bowling_first }) => {
  
  // Calculate win percentages
  const battingWinPercent = batting_first_count > 0 ? (team_won_batting_first / batting_first_count) * 100 : 0;
  const bowlingWinPercent = bowling_first_count > 0 ? (team_won_bowling_first / bowling_first_count) * 100 : 0;

  // Function to get the color based on win percentage
  const getColor = (winPercent: number) => (winPercent >= 50 ? "green" : "red");

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>

        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          {teamName} - Match Wins
        </Typography>

        {/* Matches & Wins */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Batting First: <span style={{ fontWeight: "bold" }}>
              {batting_first_count} matches,  
              <span style={{ color: getColor(battingWinPercent) }}> {team_won_batting_first} wins</span>
            </span>
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Bowling First: <span style={{ fontWeight: "bold" }}>
              {bowling_first_count} matches,  
              <span style={{ color: getColor(bowlingWinPercent) }}> {team_won_bowling_first} wins</span>
            </span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default WinsCard;
