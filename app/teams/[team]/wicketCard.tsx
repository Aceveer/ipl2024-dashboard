import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { stats } from "@/app/commonFunctions/commonConstants";

interface WicketCardProps {
  teamName: string;
  wicketsBowlingFirst: number;
  wicketsBowlingSecond: number;
  allAvgBowlFirst: number;
  allAvgBowlSecond: number;
}

const WicketCard: React.FC<WicketCardProps> = ({ wicketsBowlingFirst, wicketsBowlingSecond, allAvgBowlFirst, allAvgBowlSecond }) => {
  
  // Function to get the color based on comparison
  const getColor = (teamWickets: number, allAvg: number) => (Math.round(teamWickets) > Math.round(allAvg) ? "green" : Math.round(teamWickets) == Math.round(allAvg) ? "#FF8C00" : "red");

  return (
    <Card
      sx={{
        minWidth: { xs: 150, md: 200 }, // Smaller card width on smaller screens
        boxShadow: 3,
        borderRadius: 2,
        padding: { xs: 1, md: 2 }, // Adjusted padding for mobile
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
        background: "linear-gradient(to right, #D7E3FC, #E8ECF9)",
        color: "black",
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
          Wickets Taken
        </Typography>

        {/* Bowling First */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: "left", 
              fontSize: { xs: "0.75rem", md: "1rem" } // Responsive text size
            }}
          >
            Bowling First: <span style={{ color: getColor(wicketsBowlingFirst, allAvgBowlFirst), fontWeight: "bold" }}>
              {Math.round(wicketsBowlingFirst)}
            </span>
            <span style={{ fontSize: "0.75rem", color: "gray" }}> (par {stats.avgFirstInningsWickets})</span>
          </Typography>

          {/* Bowling Second */}
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: "left", 
              fontSize: { xs: "0.75rem", md: "1rem" } // Responsive text size
            }}
          >
            Bowling Second: <span style={{ color: getColor(wicketsBowlingSecond, allAvgBowlSecond), fontWeight: "bold" }}>
              {Math.round(wicketsBowlingSecond)}
            </span>
            <span style={{ fontSize: "0.75rem", color: "gray" }}> (par {stats.avgSecondInningsWickets})</span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default WicketCard;
