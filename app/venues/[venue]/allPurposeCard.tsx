import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {stats} from "@/app/commonFunctions/commonConstants"

interface AllPurposeCardProps {
  title: string;
  subheading1: string;
  value1: number;
  subheading2: string;
  value2: number;
  suffix: string
}

const AllPurposeCard: React.FC<AllPurposeCardProps> = ({ title, subheading1, value1, subheading2, value2, suffix  }) => {

  return (
    <Card sx={{
        minWidth: 275,
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
        background: `${
          suffix === "Wins"
            ? "linear-gradient(to right, #C6E5B1, #E1F5C4)"  // Light green for wins
            : suffix === "Runs"
            ? "linear-gradient(to right, #FDE2E4, #FFAAA5)"  // Light red for runs (high contrast)
            : "linear-gradient(to right, #D4E4FC, #AFCBFF)"  // Light blue for wickets
        }`,
        color: "black", // Ensures readability with lighter backgrounds
      }}>
      <CardContent>

        {/* Title */}
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ textDecoration: "underline", textAlign: "left" }}>
          {title}
        </Typography>

        {/* Values */}
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {subheading1}: 
            <span style={{ fontWeight: "bold" }}>
              {suffix === "Wins" ? (
                <span style={{ color: Math.round(value1) > Math.round(value2) ? "green" : "red" }}>
                  {Math.round(value1)} {suffix}
                </span>) 
                  : 
                suffix === "Runs" ? 
                (<span style={{ color: value1 > stats.avgFirstInningsScore ? "green" : "red" }}>
                  {Math.round(value1)} {suffix} <span className="text-gray-500"> (par {stats.avgFirstInningsScore})</span>
                </span>) 
                : 
                (<span style={{ color: value1 > stats.avgFirstInningsWickets ? "green" : value1 == stats.avgFirstInningsWickets ? "orange" : "red" }}>
                  {Math.round(value1)} {suffix} <span className="text-gray-500"> (par {stats.avgFirstInningsWickets})</span>
                </span>)
              }
            </span>
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {subheading2}: 
            <span style={{ fontWeight: "bold" }}>
              {suffix === "Wins" ? (
                <span style={{ color: Math.round(value1) < Math.round(value2) ? "green" : "red" }}>
                  {Math.round(value2)} {suffix}
                </span>) 
                  : 
                suffix === "Runs" ? 
                (<span style={{ color: value2 > stats.avgSecondInningsScore ? "green" : "red" }}>
                  {Math.round(value2)} {suffix}<span className="text-gray-500"> (par {stats.avgSecondInningsScore})</span>
                </span>) 
                : 
                (<span style={{ color: value2> stats.avgSecondInningsWickets ? "green" : stats.avgSecondInningsWickets === value2 ? "orange" : "red" }}>
                  {Math.round(value2)} {suffix}  <span className="text-gray-500"> (par {stats.avgSecondInningsWickets})</span>
                </span>)
              }
            </span>
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default AllPurposeCard;
