import { Card, CardContent, Typography } from "@mui/material";

interface BestPlayerCardProps {
    title: string;
    name: string;
    matchNo: number;
    statLabel: string;
    statValue: number;
    extraInfo: string
  }
  

const BestPlayerCard:React.FC<BestPlayerCardProps> = ({ title, name, matchNo, statLabel, statValue, extraInfo }) => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">Match No: {matchNo}</Typography>
        <Typography variant="body1">
          {statLabel}: {statValue}
        </Typography>
        {extraInfo && <Typography variant="body2" color="text.secondary">{extraInfo}</Typography>}
      </CardContent>
    </Card>
  );
};

export default BestPlayerCard;
