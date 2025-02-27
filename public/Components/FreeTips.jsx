import { FaCalendarAlt } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";

const FreeTips = () => {
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
            <ul className="tips-container ">
                <li className="tip w-full mx-auto bg-[#000435] pt-2">
                    <aside className="prediction flex flex-row gap-11 justify-center items-center">
                        <div className="border w-[100px] my-2 rounded-md">Home Team</div>
                        <div className="">vs</div>
                        <div className="border w-[100px] my-2 rounded-md">Away Team</div>
                        <div className="border w-[100px] my-2 rounded-md">Prediction</div>
                        <div className="statistics flex justify-baseline gap-1 text-amber-300 font-bold border-2 border-transparent hover:rounded-2xl p-1 hover:bg-white hover:text-black cursor-pointer"><FiBarChart2 className="text-amber-300 text-2xl"/> <span className="pt-0.5">Statistics</span></div>
                    </aside>
                    {/* <h1 className="text-md font-bold text-amber-300">ODDS</h1> */}
                    <hr />
                    <aside className="odds-container my-2">
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">Betika</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.98</div>
                        </aside>
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">Betway</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.90</div>
                        </aside>
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">1X BET</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.80</div>
                        </aside>
                    </aside>
                    {/* <hr className="h-[20px] bg-white" /> */}
                </li>

                <li className="tip w-full mx-auto bg-[#000435]">
                    <aside className="prediction flex flex-row gap-11 justify-center items-center">
                        <div className="border w-[100px] my-2 rounded-md">Home Team</div>
                        <div className="">vs</div>
                        <div className="border w-[100px] my-2 rounded-md">Away Team</div>
                        <div className="border w-[100px] my-2 rounded-md">Prediction</div>
                        <div className="statistics flex justify-baseline gap-1 text-amber-300 font-bold border-2 border-transparent hover:rounded-2xl p-1 hover:bg-white hover:text-black cursor-pointer"><FiBarChart2 className="text-amber-300 text-2xl"/> <span className="pt-0.5">Statistics</span></div>
                    </aside>
                    {/* <h1 className="text-md font-bold text-amber-300">ODDS</h1> */}
                    <hr />
                    <aside className="odds-container my-2">
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">Betika</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.98</div>
                        </aside>
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">Betway</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.90</div>
                        </aside>
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">1X BET</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.80</div>
                        </aside>
                    </aside>
                    {/* <hr className="h-[20px] bg-white" /> */}
                </li>

                <li className="tip w-full mx-auto bg-[#000435]">
                    <aside className="prediction flex flex-row gap-11 justify-center items-center">
                        <div className="border w-[100px] my-2 rounded-md">Home Team</div>
                        <div className="">vs</div>
                        <div className="border w-[100px] my-2 rounded-md">Away Team</div>
                        <div className="border w-[100px] my-2 rounded-md">Prediction</div>
                        <div className="statistics flex justify-baseline gap-1 text-amber-300 font-bold border-2 border-transparent hover:rounded-2xl p-1 hover:bg-white hover:text-black cursor-pointer"><FiBarChart2 className="text-amber-300 text-2xl"/> <span className="pt-0.5">Statistics</span></div>
                    </aside>
                    {/* <h1 className="text-md font-bold text-amber-300">ODDS</h1> */}
                    <hr />
                    <aside className="odds-container my-2">
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">Betika</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.98</div>
                        </aside>
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">Betway</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.90</div>
                        </aside>
                        <aside className="odds flex flex-row gap-10 justify-center items-center">
                            <div className="border w-[100px] my-2 rounded-md">1X BET</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">1</span>1.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">x</span>2.25</div>
                            <div className="border w-[100px] my-2 rounded-md"><span className="text-gray-500 mr-5 text-sm">2</span>1.80</div>
                        </aside>
                    </aside>
                    {/* <hr className="h-[20px] bg-white" /> */}
                </li>
                
            </ul>
        </div>
    </div>
  )
}

export default FreeTips