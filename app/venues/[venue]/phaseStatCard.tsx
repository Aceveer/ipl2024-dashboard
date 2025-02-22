import { stats } from "@/app/commonFunctions/commonConstants";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface PhaseStatsCardProps {
  desc: "Powerplay" | "Middle" | "Death";
  runs1: number ;
  runs2: number ;
  wickets1: number ;
  wickets2: number ;
  matches: number ;
  overs: string;
}

const PhaseStatsCard: React.FC<PhaseStatsCardProps> = ({ desc, runs1, runs2, wickets1, wickets2, matches, overs }) => {
  // Determine the background gradient based on the phase
  const backgroundGradient =
    desc === "Powerplay"
      ? "linear-gradient(to right, #FFEA00, #FFC107)"
      : desc === "Middle"
      ? "linear-gradient(to right, #00E5FF, #03A9F4)"
      : "linear-gradient(to right, #FF9A8B, #FF6A88)";
    
  const avgScore1 = desc == "Powerplay" ? stats.avgFirstInningsPPScore : desc == "Middle" ? stats.avgFirstInningsMiddleScore : stats.avgFirstInningsDeathScore
  const avgScore2 = desc == "Powerplay" ? stats.avgSecondInningsPPScore : desc == "Middle" ? stats.avgSecondInningsMiddleScore : stats.avgSecondInningsDeathScore
  const avgWicket1 = desc == "Powerplay" ? stats.avgFirstInningsPPWickets : desc == "Middle" ? stats.avgFirstInningsMiddleWickets : stats.avgFirstInningsDeathWickets
  const avgWicket2 = desc == "Powerplay" ? stats.avgSecondInningsPPWickets : desc == "Middle" ? stats.avgSecondInningsMiddleWickets : stats.avgSecondInningsDeathWickets
  return (
        <Card
        sx={{
            minWidth: 250,
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
            background: backgroundGradient,
            color: "black",
        }}
        >
       <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                {desc} <span className="italic">Overs: {overs}</span>
            </Typography>

            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2} textAlign="center">
                {/* Column Headers */}
                <Typography variant="body1" fontWeight="bold"></Typography>
                <Typography variant="body1" fontWeight="bold">Runs</Typography>
                <Typography variant="body1" fontWeight="bold">Wickets</Typography>

                {/* Innings 1 Row */}
                <Typography variant="body1" fontWeight="bold">Innings 1</Typography>
                <Typography variant="body2" className={`${avgScore1 <= Math.round(runs1 / matches) ? "text-green-900" : "text-red-700"}`}><strong>{Math.round(runs1 / matches)}</strong> <span className="text-gray-500 font-bold">(par {avgScore1})</span></Typography>
                <Typography variant="body2" className={`${avgWicket1 <= Math.round(wickets1 / matches) ? "text-green-900" : "text-red-700"}`}><strong>{Math.round(wickets1 / matches)}</strong> <span className="text-gray-500 font-bold">(par {avgWicket1})</span></Typography>

                {/* Innings 2 Row */}
                <Typography variant="body1" fontWeight="bold">Innings 2</Typography>
                <Typography variant="body2" className={`${avgScore2 <= Math.round(runs2 / matches) ? "text-green-900" : "text-red-700"}`}><strong>{Math.round(runs2 / matches)}</strong> <span className="text-gray-500 font-bold">(par {avgScore2})</span></Typography>
                <Typography variant="body2" className={`${avgWicket2 <= Math.round(wickets2 / matches) ? "text-green-900" : "text-red-700"}`}><strong>{Math.round(wickets2 / matches)}</strong> <span className="text-gray-500 font-bold">(par {avgWicket2})</span></Typography>
            </Box>
        </CardContent>
    </Card>
  );
};

export default PhaseStatsCard;
