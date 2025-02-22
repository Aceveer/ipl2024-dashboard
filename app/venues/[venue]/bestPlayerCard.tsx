import { Card, CardContent, Typography, Box, IconButton  } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface BestPlayerCardProps {
    title: string;
    name: string;
    matchNo: number;
    statLabel: string;
    statValue: number;
    extraInfo: string;
}

const BestPlayerCard: React.FC<BestPlayerCardProps> = ({ title, name, matchNo, statLabel, statValue, extraInfo }) => {

    const router = useRouter();

    const handleGoToMatch = () => {
        sessionStorage.setItem("matchNo",matchNo.toString());
        router.push(`/matches/analysis`);
    };
    
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
            color: "black",
        }}>
            <CardContent>
        {/* Title and Go To Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary" gutterBottom sx={{ textAlign: "left" }}>
            {title}
          </Typography>
          <IconButton onClick={handleGoToMatch} sx={{ position: "relative", top: 8, right: 8 }}>
              <ArrowRight size={24} />
              Go To Match
          </IconButton>
        </Box>

        {/* Name */}
        <Typography variant="h5" component="div" sx={{ textAlign: "left", mb: 1 }}>
          {name}
        </Typography>

        {/* Stats Row */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {statLabel}: {statValue}
          </Typography>
          <Typography variant="body1">
            Match No: {matchNo}
          </Typography>
          {extraInfo && (
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {extraInfo}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
    );
};

export default BestPlayerCard;
