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
      <Card
        sx={{
          minWidth: { xs: 150, md: 180, lg: 200 }, // Responsive width
          boxShadow: 3,
          borderRadius: 2,
          padding: { xs: 1, md: 2 }, // Smaller padding for mobile
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          color: "black",
        }}
      >
        <CardContent>
          {/* Title and Go To Button */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              color="primary"
              gutterBottom
              sx={{ 
                textAlign: "left", 
                fontSize: { xs: "0.9rem", md: "1rem", lg: "1.5rem" } // Adjusted font size
              }}
            >
              {title}
            </Typography>
            <IconButton 
              onClick={handleGoToMatch} 
              sx={{ position: "relative", top: 8, right: 8 }}
            >
              <ArrowRight fontSize="small" /> {/* Smaller icon for mobile */}
            </IconButton>
          </Box>
  
          {/* Name */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              textAlign: "left",
              mb: 1,
              fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" } // Responsive name size
            }}
          >
            {name}
          </Typography>
  
          {/* Stats Row */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: "bold", 
                fontSize: { xs: "0.75rem", md: "1rem", lg: "1.25rem" } 
              }}
            >
              {statLabel}: {statValue}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: { xs: "0.75rem", md: "1rem", lg: "1.25rem" } 
              }}
            >
              Match No: {matchNo}
            </Typography>
            {extraInfo && (
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: { xs: "0.75rem", md: "1rem", lg: "1.25rem" } 
                }}
              >
                {extraInfo}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

export default BestPlayerCard;
