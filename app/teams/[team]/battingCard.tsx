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
        minWidth: { xs: 150, md: 200 }, // Smaller card width on smaller screens
        boxShadow: 3,
        borderRadius: 2,
        padding: { xs: 1, md: 2 }, // Reduced padding for mobile screens
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
        <Typography 
          variant="h6" 
          component="div" 
          fontWeight="bold" 
          sx={{ 
            textDecoration: "underline", 
            textAlign: "left",
            fontSize: { xs: "0.9rem", md: "1.25rem" } // Adjusted font size
          }}
        >
          Average Scores
        </Typography>

        {/* Batting First */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: "left", 
              fontSize: { xs: "0.75rem", md: "1rem" } // Responsive text size
            }}
          >
            Batting First: <span style={{ color: getColor(teamAvgBatFirst, allAvgBatFirst), fontWeight: "bold" }}>
              {Math.round(teamAvgBatFirst)} 
            </span>
            <span style={{ fontSize: "0.75rem", color: "gray" }}> (par {stats.avgFirstInningsScore})</span>
          </Typography>

          {/* Batting Second */}
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: "left", 
              fontSize: { xs: "0.75rem", md: "1rem" } // Responsive text size
            }}
          >
            Batting Second: <span style={{ color: getColor(teamAvgBatSecond, allAvgBatSecond), fontWeight: "bold" }}>
              {Math.round(teamAvgBatSecond)} 
            </span>
            <span style={{ fontSize: "0.75rem", color: "gray" }}> (par {stats.avgSecondInningsScore})</span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ScoreCard;
