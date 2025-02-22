import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { stats } from "@/app/commonFunctions/commonConstants";

interface ScoreCardProps {
  teamName: string;
  teamAvgBatFirst: number;
  teamAvgBatSecond: number;
  allAvgBatFirst: number;
  allAvgBatSecond: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ teamAvgBatFirst, teamAvgBatSecond, allAvgBatFirst, allAvgBatSecond }) => {
  
  // Function to get the color based on comparison
  const getColor = (teamAvg: number, allAvg: number) => (Math.round(teamAvg) > Math.round(allAvg) ? "green" : "red");

  return (
        <Card
          sx={{
            minWidth: 275,
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
            background: "linear-gradient(to right, #FDE5D4, #FFE8C9)",
            color: "black", // Ensures readability with lighter backgrounds
          }}
        >
      <CardContent>
        
        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          Average Scores
        </Typography>

        {/* Batting First */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Batting First: <span style={{ color: getColor(teamAvgBatFirst, allAvgBatFirst), fontWeight: "bold" }}>
              {Math.round(teamAvgBatFirst)} 
            </span>
            <span className="text-sm text-gray-500"> (par {stats.avgFirstInningsScore})</span>
          </Typography>

          {/* Batting Second */}
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Batting Second: <span style={{ color: getColor(teamAvgBatSecond, allAvgBatSecond), fontWeight: "bold" }}>
              {Math.round(teamAvgBatSecond)} 
            </span>
            <span className="text-sm text-gray-500"> (par {stats.avgSecondInningsScore})</span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ScoreCard;
