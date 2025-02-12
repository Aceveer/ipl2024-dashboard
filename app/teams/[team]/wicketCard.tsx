import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface WicketCardProps {
  teamName: string;
  wicketsBowlingFirst: number;
  wicketsBowlingSecond: number;
  allAvgBowlFirst: number;
  allAvgBowlSecond: number;
}

const WicketCard: React.FC<WicketCardProps> = ({ teamName, wicketsBowlingFirst, wicketsBowlingSecond, allAvgBowlFirst, allAvgBowlSecond }) => {
  
  // Function to get the color based on comparison
  const getColor = (teamWickets: number, allAvg: number) => (Math.round(teamWickets) > Math.round(allAvg) ? "green" : "red");

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>

        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          {teamName} - Wickets Taken
        </Typography>

        {/* Bowling First */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Bowling First: <span style={{ color: getColor(wicketsBowlingFirst, allAvgBowlFirst), fontWeight: "bold" }}>
              {Math.round(wicketsBowlingFirst)}
            </span>
          </Typography>

          {/* Bowling Second */}
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Bowling Second: <span style={{ color: getColor(wicketsBowlingSecond, allAvgBowlSecond), fontWeight: "bold" }}>
              {Math.round(wicketsBowlingSecond)}
            </span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default WicketCard;
