import React from "react";

const Footer = () => {
    const teams = [
        {
            "team": "Chennai Super Kings",
            "link" : "https://www.chennaisuperkings.com/",
            "path" : "/teamLogo/CSK.png"
        },
        {
            "team": "Mumbai Indians",
            "link" : "https://www.mumbaiindians.com/",
            "path" : "/teamLogo/MI.png"
        },
        {
            "team": "Delhi Capitals",
            "link" : "https://www.delhicapitals.in/",
            "path" : "/teamLogo/DC.png"
        },
        {
            "team": "Punjab Kings",
            "link" : "https://www.punjabkingsipl.in/",
            "path" : "/teamLogo/PBKS.png"
        },
        {
            "team": "Gujrat Titans",
            "link" : "https://www.gujarattitansipl.com/",
            "path" : "/teamLogo/GT.png"
        },
        {
            "team": "Rajasthan Royals",
            "link" : "https://www.rajasthanroyals.com/",
            "path" : "/teamLogo/RR.png"
        },
        {
            "team": "Kolkata Knight Riders",
            "link" : "https://www.kkr.in/",
            "path" : "/teamLogo/KKR.png"
        },
        {
            "team": "Royal Challengers Bangalore",
            "link" : "https://www.royalchallengers.com/",
            "path" : "/teamLogo/RCB.png"
        },
        {
            "team": "Lucknow Super Giants",
            "link" : "https://www.lucknowsupergiants.in/",
            "path" : "/teamLogo/LSG.png"
        },
        {
            "team": "Sunrisers Hyderabad",
            "link" : "https://www.sunrisershyderabad.in/",
            "path" : "/teamLogo/SRH.png"
        }
      ];
    return(
    <footer className="bg-[#92b986]">
        {/* Desktop Display */}
        <div className="hidden md:flex flex-col">
            <p className="text-xl py-4 px-8 rounded-xl font-bold">Visit Teams Website</p>
            <div className="flex flex-row justify-evenly px-8">

                {/* First Column */}
                <div className="flex flex-col py-2">
                    <div className="flex flex-row">
                        <img
                            src={teams[0].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[0].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[0].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[1].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[1].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[1].team}</a>
                    </div>
                </div>
                
                {/* Second Column */}
                <div className="flex flex-col py-2">
                    <div className="flex flex-row">
                        <img
                            src={teams[2].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[2].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[2].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[3].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[3].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[3].team}</a>
                    </div>
                </div>

                {/* Third Column */}
                <div className="flex flex-col py-2">
                    <div className="flex flex-row">
                        <img
                            src={teams[4].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[4].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[4].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[5].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[5].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[5].team}</a>
                    </div>
                </div>

                {/* Fourth Column */}
                <div className="flex flex-col py-2">
                    <div className="flex flex-row">
                        <img
                            src={teams[6].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[6].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[6].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[7].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[7].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[7].team}</a>
                    </div>
                </div>

                {/* Fifth Column */}
                <div className="flex flex-col py-2">
                    <div className="flex flex-row">
                        <img
                            src={teams[8].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[8].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[8].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[9].path}
                            alt={"logo"}
                            className="w-8 h-8 mr-2"
                        />
                        <a href={teams[9].link} target="_blank" className="hover:text-white py-2 px-2 hover:underline font-semibold">{teams[9].team}</a>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile Screen Display */}
        <div className="md:hidden flex-col">
            <p className="text-m py-2 px-4 rounded-3xl font-bold">Visit Teams Website</p>
            <div className="flex flex-row justify-evenly px-4">
                <div className="flex flex-col py-1">
                    
                    {/* First Column */}
                    <div className="flex flex-row">
                        <img
                            src={teams[0].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[0].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[0].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[1].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[1].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[1].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[2].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[2].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[2].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[3].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[3].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[3].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[4].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[4].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[4].team}</a>
                    </div>

                </div>

                {/* Second Column */}
                <div className="flex flex-col py-1">
                    
                <div className="flex flex-row">
                        <img
                            src={teams[5].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[5].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[5].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[6].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[6].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[6].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[7].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[7].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[7].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[8].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[8].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[8].team}</a>
                    </div>
                    <div className="flex flex-row">
                        <img
                            src={teams[9].path}
                            alt={"logo"}
                            className="w-4 h-4 mr-2"
                        />
                        <a href={teams[9].link} target="_blank" className="hover:text-white py-1 px-1 hover:underline font-semibold text-sm">{teams[9].team}</a>
                    </div>

                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer;