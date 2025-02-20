import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface AllPurposeCardProps {
  title: string;
  subheading1: string;
  value1: number;
  subheading2: string;
  value2: number;
  suffix: string
}

const AllPurposeCard: React.FC<AllPurposeCardProps> = ({ title, subheading1, value1, subheading2, value2, suffix  }) => {
  
  // Calculate win percentages
  // const battingWinPercent = batting_first_count > 0 ? (team_won_batting_first / batting_first_count) * 100 : 0;
  // const bowlingWinPercent = bowling_first_count > 0 ? (team_won_bowling_first / bowling_first_count) * 100 : 0;

  // // Function to get the color based on win percentage
  // const getColor = (winPercent: number) => (winPercent >= 50 ? "green" : "red");

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>

        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          {title}
        </Typography>

        {/* Values */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {subheading1}: <span style={{ fontWeight: "bold" }}>
              {Math.round(value1)} {suffix}
              {/* <span style={{ color: getColor(battingWinPercent) }}> {team_won_batting_first} wins</span> */}
            </span>
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {subheading2}: <span style={{ fontWeight: "bold" }}>
              {Math.round(value2)} {suffix} 
              {/* <span style={{ color: getColor(bowlingWinPercent) }}> {team_won_bowling_first} wins</span> */}
            </span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default AllPurposeCard;
