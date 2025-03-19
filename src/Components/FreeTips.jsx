import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { db } from '../Components/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const FreeTips = () => {
    const [freeTips, setFreeTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreeTips = async () => {
            try {
                // Fetch free tips from Firestore
                const q = query(collection(db, 'predictions'), where('plans.free', '==', true));
                const querySnapshot = await getDocs(q);
                const tips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFreeTips(tips);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFreeTips();
    }, []);

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
                    <ul className="tips-container ">
                        {freeTips.map(tip => (
                            <li key={tip.id} className="tip w-full mx-auto bg-[#000435] pt-2">
                                <aside className="prediction flex flex-row gap-11 justify-center items-center">
                                    <div className="border w-[100px] my-2 rounded-md">{tip.homeTeam}</div>
                                    <div className="">vs</div>
                                    <div className="border w-[100px] my-2 rounded-md">{tip.awayTeam}</div>
                                    <div className="border w-[100px] my-2 rounded-md">{tip.prediction}</div>
                                    <div className="statistics flex justify-baseline gap-1 text-amber-300 border-2 border-transparent cursor-pointer"><FiBarChart2 className="text-amber-300 text-2xl"/> <span className="pt-0.5 hover:text-white text-md tracking-widest font-mono hover:font-extrabold hover:border-b-2">Statistics</span></div>
                                </aside>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FreeTips;