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
        <div className="w-full flex justify-center mt-6 flex-wrap text-[#393E46]">
            <div className={`shadow-lg rounded-xl p-2 md:p-4 flex flex-row w-3/4 md:w-3/4 lg:w-3/4 text-center
                            ${desc === "Powerplay" ? "bg-gradient-to-r from-[#FFEA00] to-[#FFC107]" : desc === "Middle" ? "bg-gradient-to-r from-[#00E5FF] to-[#03A9F4]" : "bg-gradient-to-r from-[#FF9A8B] to-[#FF6A88]" }
                    `}>
                
                {/* Left Column - Runs & Overs */}
                <div className="flex flex-col w-1/3 justify-center items-center text-xs md:text-base">
                    <div className="text-sm md:text-lg font-bold">{runs} - {wickets}</div>
                    <div className="text-xs md:text-sm text-gray-800">{overs} Overs</div>
                    <div className="text-xs md:text-sm text-gray-800 font-bold">{desc}</div>
                </div>

                {/* Right Column - Batter & Bowler Info */}
                <div className="flex flex-col w-2/3 pl-4 text-left">
                    {/* Batter Info */}
                    <div className="text-sm">
                        <span className="font-semibold">{batterName}</span> - {batterRuns} ({batterBalls})
                    </div>
                    
                    {/* Bowler Info */}
                    <div className="mt-2 text-sm text-gray-700">
                    <span className="font-semibold">{bowlerName}</span> - {bowlerRuns} Runs - {bowlerOvers/6} Over(s) - {bowlerWickets} Wicket(s)
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ScoreCard;
