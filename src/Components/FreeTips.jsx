import { useEffect, useState, useMemo } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { db } from '../Components/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fetchOddsByFixtureId } from '../Utilities/footballApi'; // Import the utility function
import { MdStadium } from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

const FreeTips = () => {
    const [freeTips, setFreeTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOdds, setExpandedOdds] = useState(null); // Track which fixture's odds are expanded
    const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
    const [showAll, setShowAll] = useState(false); // Track whether to show all tips
    const [filters, setFilters] = useState({ date: '', league: '', team: '' }); // Filters for tips
    const itemsPerPage = 5; // Number of items to display per page

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setShowAll(false); // Disable "Show All" mode when filters are changed
    };

    const handleShowAll = () => {
        setFilters({ date: '', league: '', team: '' }); // Reset all filters
        setShowAll(true); // Enable "Show All" mode
    };

    // Memoize the paginated tips to avoid recalculating on every render
    const paginatedTips = useMemo(() => {
        const filteredTips = freeTips.filter((tip) => {
            const matchesDate = filters.date ? tip.date === filters.date : true;
            const matchesLeague = filters.league ? tip.league === filters.league : true;
            const matchesTeam = filters.team
                ? tip.homeTeam.toLowerCase().includes(filters.team.toLowerCase()) ||
                  tip.awayTeam.toLowerCase().includes(filters.team.toLowerCase())
                : true;
            return matchesDate && matchesLeague && matchesTeam;
        });

        if (showAll) {
            return freeTips; // Show all tips if "Show All" is enabled
        }

        const startIndex = 0; // Always start from the beginning
        const endIndex = currentPage * itemsPerPage; // Include all items up to the current page
        return filteredTips.slice(startIndex, endIndex);
    }, [freeTips, filters, currentPage, showAll]);

    const loadMore = () => {
        if (currentPage * itemsPerPage < freeTips.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const isAllActive = !filters.date && !filters.league && !filters.team;


    return (
        <div className="free-tips-component p-2 w-full">
            <h1 className="text-4xl font-bold">Explore Our <span className="text-amber-300">Free Tips</span></h1>
            <h1 className="text-sm md:text-base text-gray-400 italic my-4">Join thousands of fans who rely on our free tips every day.</h1>

            {/* Filters Section */}
            <div className="filters flex flex-row justify-center gap-2 w-fit mx-auto mb-5">
                <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    className="border p-1 rounded-md w-[30%] text-[12px] sm:text-sm md:text-md lg:text-lg"
                />
                <input
                    type="text"
                    name="league"
                    placeholder="Filter by league"
                    value={filters.league}
                    onChange={handleFilterChange}
                    className="border p-1 rounded-md w-[25%] text-[12px] sm:text-sm md:text-md lg:text-lg"
                />
                <input
                    type="text"
                    name="team"
                    placeholder="Filter by team"
                    value={filters.team}
                    onChange={handleFilterChange}
                    className="border p-1 rounded-md w-[25%] text-[12px] sm:text-sm md:text-md lg:text-lg"
                />
                <button
                    onClick={handleShowAll}
                    className={`px-4 py-2 rounded-md font-bold hover:bg-slate-400 hover:text-black ${
                        isAllActive ? 'bg-amber-400 text-white' : 'bg-slate-300 text-gray-700'
                    }`}
                >
                    All
                </button>
            </div>

            <div className="free-tips text-white rounded-md">
                {paginatedTips.length === 0 ? (
                    <p className="text-black">No Free tips available.</p>
                ) : (
                    <ul className="tips-container">
                        {paginatedTips.map(tip => (
                            <li key={tip.id} className="tip w-full mx-auto bg-[#000435] pt-2 mb-4 rounded-md shadow-lg">
                                <aside className="prediction flex flex-col justify-center items-start px-5">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <div className="fixture_time flex justify-center items-center gap-3">
                                            <p className="flex gap-1 justify-center items-center"><MdOutlineDateRange className="text-amber-400"/> {tip.date || 'N/A'}</p>
                                            <div className="rounded-full w-[5px] h-[5px] bg-slate-100 "></div>
                                            <p className="flex gap-1 justify-center items-center"><IoIosTimer className="text-amber-400"/> {tip.time || 'N/A'}</p>
                                        </div>
                                        <div className="league flex gap-3">
                                            <p><strong>League:</strong> {tip.league || 'N/A'}</p>
                                            <p><strong>Country:</strong> {tip.country || 'N/A'}</p>
                                        </div>    
                                        
                                    </div>
                                    <hr className="w-full mx-auto" />
                                    <div className="flex gap-5 justify-center items-baseline">
                                        <div className="border w-fit max-w-[200px] px-2 rounded-md text-center mt-auto my-2 bg-slate-100 text-black text-xl font-mono">{tip.homeTeam}</div>
                                        <div className="mt-auto mb-2 font-mono">vs</div>
                                        <div className="border w-fit px-2 rounded-md text-center mt-auto my-2 bg-slate-100 text-black text-xl font-mono">{tip.awayTeam}</div>
                                    
                                        <div className="flex flex-col w-fit my-2 rounded-md text-center mx-10">
                                            <strong className="text-amber-400">Prediction Type:</strong> {tip.predictionType}
                                        </div>
                                        <div className="flex flex-col w-fit my-2 rounded-md text-center">
                                            <strong className="text-amber-400">Prediction:</strong> {tip.predictionValue}
                                        </div>
                                        {/* <div className="flex flex-col w-fit my-2 rounded-md text-center">
                                            <strong className="text-amber-400">Status:</strong> Not Started
                                        </div>
                                        <div className="flex flex-col w-fit my-2 rounded-md text-center">
                                            <strong className="text-amber-400">Result:</strong> 2:1
                                        </div>
                                        <div className="flex justify-end w-fit my-2 rounded-md text-center">
                                            <strong className="text-amber-400">won</strong>
                                        </div> */}
                                    </div>

                                    <div className="flex flex-row w-full mt-5 justify-between">
                                        <div className="match-details flex flex-row gap-10">
                                            <p className="flex gap-1 justify-center items-center"><MdStadium className="text-amber-400"/> {tip.stadium || 'N/A'}</p>
                                            <p className="flex gap-1 justify-center items-center"><GiWhistle className="text-amber-400"/> {tip.referee || 'N/A'}</p>
                                        </div>
                                        <div className="flex flex-row gap-5">
                                            <div
                                                className="statistics flex justify-baseline gap-1 text-amber-300 border-2 border-transparent cursor-pointer"
                                            >
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
                                        </div>
                                    </div>
                                    
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
                                                            <span className="text-green-400 font-bold">
                                                                Prediction ({tip.predictionValue}): {odd.odds.find(o => o.value === tip.predictionValue)?.odd || "N/A"}
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
                {!showAll && currentPage * itemsPerPage < freeTips.length && (
                    <button
                        onClick={loadMore}
                        className="bg-amber-300 text-black px-4 py-2 rounded-md font-bold hover:bg-white hover:text-[#000435] mt-4"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default FreeTips;