import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
<div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1">
        {/* <div>Space for BreadCrumbs</div>   */}
        <div className="bg-[#9BCBD7] rounded-3xl mx-16 text-center mt-32">

          <div className="grid grid-flow-row">

              <div className="flex flex-row justify-evenly py-4 font-bold text-xl">
              <div>Match No: 60</div>
                <div>Venue: M Chepauk Stadium, Chennai</div>
                <div>Date: 24th April, 2024</div>
              </div>

              <div className="text-xl font-bold">
                KKR Opted To Bat
              </div>

              <div className="flex flex-row justify-between">
                
                <div className="flex flex-row items-center">
                  <img src="./teamLogo/KKR.png" alt="KKR" className="h-40 w-40 pl-10 py-4 rounded-lg object-contain"/>
                  <div className="flex flex-col p-8">
                    <div className="font-bold text-xl">Score: 148/10</div>
                    <div className="font-bold text-xl">Overs: 20</div>
                  </div>
                </div>

                <div className="flex flex-col py-12 items-center">
                  <div className="flex flex-row items-center text-2xl">
                        KKR won by 9 wickets
                  </div>
                  <div className="flex flex-row items-center text-2xl">
                        MoTM: Mitchell Starc
                  </div>
                </div>


                <div className="flex flex-row-reverse items-center">
                  <img src="./teamLogo/SRH.png" alt="SRH" className="h-40 w-40 pr-10 py-4 rounded-lg object-contain"/>
                  <div className="flex flex-col p-8">
                    <div className="font-bold text-xl">Score: 150/1</div>
                    <div className="font-bold text-xl">Overs: 20</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-evenly items-center gap-8 mt-8">
  {/* Bar Chart */}
  <div className="flex flex-col items-center">
    <a href="/bar-chart-analysis" className="hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="10" width="4" height="11" className="fill-blue-500" />
        <rect x="10" y="6" width="4" height="15" className="fill-blue-400" />
        <rect x="17" y="2" width="4" height="19" className="fill-blue-300" />
      </svg>
    </a>
    <p className="text-sm font-medium mt-2">Bar Chart</p>
  </div>

  {/* Scorecard */}
  <div className="flex flex-col items-center">
    <a href="/scorecard" className="hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="4" y="4" width="16" height="16" rx="2" className="fill-green-400" />
        <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" />
        <line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" />
      </svg>
    </a>
    <p className="text-sm font-medium mt-2">Scorecard</p>
  </div>

  {/* Cricket Ball */}
  <div className="flex flex-col items-center">
    <a href="/cricket-ball" className="hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" className="fill-red-500" />
        <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="1.5" />
        <line x1="6" y1="18" x2="18" y2="6" stroke="white" strokeWidth="1.5" />
      </svg>
    </a>
    <p className="text-sm font-medium mt-2">Cricket Ball</p>
  </div>

  {/* Partnership */}
  <div className="flex flex-col items-center">
    <a href="/partnership" className="hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="8" cy="8" r="4" className="fill-yellow-400" />
        <circle cx="16" cy="16" r="4" className="fill-yellow-300" />
      </svg>
    </a>
    <p className="text-sm font-medium mt-2">Partnership</p>
  </div>

  {/* Player Rankings */}
  <div className="flex flex-col items-center">
    <a href="/player-rankings" className="hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2Z" className="fill-purple-400" />
        <rect x="10" y="10" width="4" height="8" className="fill-purple-300" />
        <path d="M7 18H17L12 22L7 18Z" className="fill-purple-200" />
      </svg>
    </a>
    <p className="text-sm font-medium mt-2">Player Rankings</p>
  </div>
</div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}