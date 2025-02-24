export const getBatterAndWicket = (batter:string, bowler:string, wicket_type:string | null , fielder:string | null) : string => {

    if (wicket_type == null) {
        return batter;
    }
    if (wicket_type == "bowled"){
        return batter + " (" + wicket_type + " " + bowler + ")"
    }
    return batter + " (bowled " + bowler + " " + wicket_type  + " " + fielder + ")"
};


interface BowlerPerformance {
    bowler: string;
    dots: number;
    fours: number;
    maidens: number;
    no_balls: number;
    overs: number;
    runs: number;
    sixes: number;
    wides: number;
    wickets: number;
  }

  interface Extras {
    total:number;
    no_balls:number;
    wides:number;
    leg_byes:number;
    byes:number;
  }

export const getOversFromBowlers = (bowlers:BowlerPerformance[]):string => {

    return bowlers.reduce((totalOvers, bowler) => totalOvers + bowler.overs, 0).toFixed(1);
}

export const getExtras = (extras:Extras):string => {

    return extras.total + " (" + extras.wides + "w, " + extras.no_balls + "nb, " + extras.leg_byes + "lb, " + extras.byes + "b)"
}