"use client";

import { useRouter } from "next/navigation";
import { FileText, BarChart2, Clock, Users } from "lucide-react";

interface BottomFourAnalysisProps {
  disabledOption: "Scorecard" | "Fall Of Wickets" | "Overs" | "Partnerships";
}

const analysisOptions = [
  { name: "Scorecard", icon: FileText, path: "/matches/analysis" },
  { name: "Fall Of Wickets", icon: BarChart2, path: "/matches/fall-of-wickets" },
  { name: "Overs", icon: Clock, path: "/matches/overs" },
  { name: "Partnerships", icon: Users, path: "/matches/partnerships" },
];

const BottomFourAnalysis: React.FC<BottomFourAnalysisProps> = ({ disabledOption }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analysisOptions.map(({ name, icon: Icon, path }) => {
          const isDisabled = name === disabledOption;

          return (
            <button
              key={name}
              className={`flex flex-col items-center p-4 rounded-lg transition ${
                isDisabled ? "bg-[#2A4494] cursor-not-allowed" : "hover:bg-[#224870]"
              }`}
              onClick={() => !isDisabled && router.push(path)}
              disabled={isDisabled}
            >
              <Icon size={32} />
              <span className="text-sm">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomFourAnalysis;
