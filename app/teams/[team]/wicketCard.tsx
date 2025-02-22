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
            minWidth: 275,
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
            background: "linear-gradient(to right, #D7E3FC, #E8ECF9)",
            color: "black", // Ensures readability with lighter backgrounds
          }}
        >
      <CardContent>

        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          Wickets Taken
        </Typography>

        {/* Bowling First */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Bowling First: <span style={{ color: getColor(wicketsBowlingFirst, allAvgBowlFirst), fontWeight: "bold" }}>
              {Math.round(wicketsBowlingFirst)}
            </span>
            <span className="text-sm text-gray-500"> (par {stats.avgFirstInningsWickets})</span>
          </Typography>

          {/* Bowling Second */}
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Bowling Second: <span style={{ color: getColor(wicketsBowlingSecond, allAvgBowlSecond), fontWeight: "bold" }}>
              {Math.round(wicketsBowlingSecond)}
            </span>
            <span className="text-sm text-gray-500"> (par {stats.avgSecondInningsWickets})</span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default WicketCard;
