import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface ScoreCardProps {
  teamName: string;
  teamAvgBatFirst: number;
  teamAvgBatSecond: number;
  allAvgBatFirst: number;
  allAvgBatSecond: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ teamName, teamAvgBatFirst, teamAvgBatSecond, allAvgBatFirst, allAvgBatSecond }) => {
  
  // Function to get the color based on comparison
  const getColor = (teamAvg: number, allAvg: number) => (Math.round(teamAvg) > Math.round(allAvg) ? "green" : "red");

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>
        
        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          {teamName} - Average Scores
        </Typography>

        {/* Batting First */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Batting First: <span style={{ color: getColor(teamAvgBatFirst, allAvgBatFirst), fontWeight: "bold" }}>
              {Math.round(teamAvgBatFirst)}
            </span>
          </Typography>

          {/* Batting Second */}
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Batting Second: <span style={{ color: getColor(teamAvgBatSecond, allAvgBatSecond), fontWeight: "bold" }}>
              {Math.round(teamAvgBatSecond)}
            </span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ScoreCard;
