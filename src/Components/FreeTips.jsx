import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { db } from '../Components/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fetchOddsByFixtureId } from '../Utilities/footballApi'; // Import the utility function

const FreeTips = () => {
    const [freeTips, setFreeTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOdds, setExpandedOdds] = useState(null); // Track which fixture's odds are expanded

    useEffect(() => {
        const fetchFreeTips = async () => {
            try {
                // Fetch free tips from Firestore
                const q = query(collection(db, 'predictions'), where('plans.free', '==', true));
                const querySnapshot = await getDocs(q);
                const tips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Fetch odds for each tip using fixtureId
                const tipsWithOdds = await Promise.all(
                    tips.map(async (tip) => {
                        try {
                            const odds = await fetchOddsByFixtureId(tip.fixtureId); // Fetch odds using fixtureId
                            return { ...tip, odds };
                        } catch (err) {
                            console.error(`Failed to fetch odds for fixtureId ${tip.fixtureId}:`, err);
                            return { ...tip, odds: "No odds available" }; // Default to "No odds available" if odds fetch fails
                        }
                    })
                );

                setFreeTips(tipsWithOdds);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFreeTips();
    }, []);

    const toggleOdds = (id) => {
        setExpandedOdds(expandedOdds === id ? null : id); // Toggle the expanded odds for the clicked fixture
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="free-tips-component">
            <h1 className="text-4xl font-bold">Explore Our <span className="text-amber-300">Free Tips</span></h1>
            <h1 className="text-md text-gray-400 italic my-4">Lorem ipsum dolor sit amet consectetur.</h1>
            <div className="free-tips text-white rounded-md">
                <div className="flex justify-center items-center w-[100%] px-5 py-5 mt-5 text-white mb-[1px] gap-40 mx-auto bg-[#000435] opacity-[93%]">
                    <button className="flex justify-start items-center gap-2 text-amber-300 w-30 rounded-md px-3 py-1 font-bold hover:bg-white hover:text-[#000435]"><FaCalendarAlt className="text-amber-300"/>Daily</button>
                    <button className="flex justify-start items-center gap-2 text-amber-300 w-30 rounded-md px-3 py-1 font-bold hover:bg-white hover:text-[#000435]"><FaCalendarAlt className="text-amber-300"/>Weekend</button>
                    <button className="flex justify-start items-center gap-2 text-amber-300 w-30 rounded-md px-3 py-1 font-bold hover:bg-white hover:text-[#000435]"><FaCalendarAlt className="text-amber-300"/>Weekly</button>
                </div>

                {freeTips.length === 0 ? (
                    <p>No Free tips available.</p>
                ) : (
                    <ul className="tips-container">
                        {freeTips.map(tip => (
                            <li key={tip.id} className="tip w-full mx-auto bg-[#000435] pt-2 mb-4 rounded-md shadow-lg">
                                <aside className="prediction flex flex-row gap-11 justify-center items-center">
                                    <div className="border w-[100px] my-2 rounded-md text-center">{tip.homeTeam}</div>
                                    <div className="">vs</div>
                                    <div className="border w-[100px] my-2 rounded-md text-center">{tip.awayTeam}</div>
                                    <div className="border w-[100px] my-2 rounded-md text-center">{tip.predictionType}</div>
                                    <div className="border w-[100px] my-2 rounded-md text-center">{tip.predictionValue}</div>
                                    <div className="statistics flex justify-baseline gap-1 text-amber-300 border-2 border-transparent cursor-pointer">
                                        <FiBarChart2 className="text-amber-300 text-2xl" />
                                        <span className="pt-0.5 hover:text-white text-md tracking-widest font-mono hover:font-extrabold hover:border-b-2">
                                            Statistics
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => toggleOdds(tip.id)}
                                        className="bg-amber-300 text-black px-3 py-1 rounded-md font-bold hover:bg-white hover:text-[#000435]"
                                    >
                                        {expandedOdds === tip.id ? "Hide Odds" : "Show Odds"}
                                    </button>
                                </aside>
                                {expandedOdds === tip.id && (
                                    <div className="odds text-center text-gray-300 mt-2 bg-[#001f3f] p-4 rounded-md">
                                        <span className="font-bold text-white">Odds:</span>
                                        {Array.isArray(tip.odds) ? (
                                            <div className="flex flex-wrap justify-center gap-4 mt-2">
                                                {tip.odds.map((odd, index) => (
                                                    <div
                                                        key={index}
                                                        className="border border-gray-500 rounded-md p-2 text-sm text-gray-300 bg-[#00264d] shadow-md w-[200px]"
                                                    >
                                                        <span className="text-amber-300 font-bold">{odd.bookmaker}</span>: 
                                                        <div className="mt-1">
                                                            <span>Home: {odd.odds.find(o => o.value === "Home")?.odd || "N/A"}</span>
                                                            <br />
                                                            <span>Draw: {odd.odds.find(o => o.value === "Draw")?.odd || "N/A"}</span>
                                                            <br />
                                                            <span>Away: {odd.odds.find(o => o.value === "Away")?.odd || "N/A"}</span>
                                                            <br />
                                                            <span className="text-amber-300 font-bold">
                                                                {tip.predictionValue} Odds: {odd.odds.find(o => o.value === tip.predictionValue)?.odd || "N/A"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span>{tip.odds}</span>
                                        )}
                                    </div>
                                )}
                                <hr className="mt-4 border-gray-600" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FreeTips;