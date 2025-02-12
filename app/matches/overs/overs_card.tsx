import React from "react";

interface ScoreCardProps {
    runs: number;
    wickets: number;
    overs: number;
    desc: string;
    batterName: string;
    batterRuns: number;
    batterBalls: number;
    bowlerName: string;
    bowlerRuns: number;
    bowlerOvers: number;
    bowlerWickets: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
    runs,
    wickets,
    overs,
    batterName,
    batterRuns,
    batterBalls,
    bowlerName,
    bowlerRuns,
    bowlerOvers,
    bowlerWickets,
    desc,
}) => {
    return (
        <div className="w-full flex justify-center mt-6 flex-wrap">
            <div className="bg-white shadow-lg rounded-xl p-2 md:p-4 flex flex-row w-3/4 md:w-3/4 lg:w-3/4 text-center border border-gray-300">
                
                {/* Left Column - Runs & Overs */}
                <div className="flex flex-col w-1/3 justify-center items-center border-r">
                    <div className="text-sm md:text-lg font-bold">{runs} - {wickets}</div>
                    <div className="text-xs md:text-sm text-gray-600">{overs} Overs</div>
                    <div className="text-xs md:text-sm text-gray-600 font-bold">{desc}</div>
                </div>

                {/* Right Column - Batter & Bowler Info */}
                <div className="flex flex-col w-2/3 pl-4 text-left">
                    {/* Batter Info */}
                    <div className="text-sm font-semibold">
                        {batterName} - {batterRuns} ({batterBalls})
                    </div>
                    
                    {/* Bowler Info */}
                    <div className="mt-2 text-sm text-gray-700">
                        {bowlerName} - {bowlerRuns} Runs - {bowlerOvers/6} Over(s) - {bowlerWickets} Wicket(s)
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ScoreCard;
