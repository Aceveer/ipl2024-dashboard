const getBatterAndWicket = (batter:string, bowler:string, wicket_type:string | null , fielder:string | null) : string => {

    if (wicket_type == null) {
        return batter;
    }
    if (wicket_type == "bowled"){
        return batter + " (" + wicket_type + " " + bowler + ")"
    }
    return batter + " (bowled " + bowler + " " + wicket_type  + " " + fielder + ")"
};

export default getBatterAndWicket;