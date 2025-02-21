import { TiTick } from "react-icons/ti";


const Pricing = () => {
  return (
    <div className="pricings-page gap-10 mt-30 w-[90%] mx-auto">
      <h1 className="text-4xl font-bold mb-5">PRICING</h1>
      <h3 className="text-3xl font-bold mb-10"><span className="text-amber-300">Join a Club</span>  that Suits You</h3>

      <div className="pricings-container flex justify-center items-center gap-10">
        <div className="silver flex flex-col w-[30%] bg-slate-100 p-2 mb-10 rounded-xl h-80">
          <h1 className="font-bold text-3xl text-[#C0C0C0]">SILVER</h1>
          <hr className="opacity-20" />
          <p>Ksh 200/ day</p>
          <div className="pricing-info mt-7"><TiTick className="text-white rounded-full mr-2 bg-green-500 mb-5"/><span> Every day is game day! Check out our daily tips and win big!</span></div>
          <div className="pricing-info my-2"><TiTick className="text-white rounded-full mr-2 bg-green-500"/><span> Access 24 hours VIP predictions</span></div>
          <div className="pricing-info"><TiTick className="text-white rounded-full mr-2 bg-green-500"/><span> Expert Football Predictions</span></div>
          <hr className="opacity-20 my-5" />
          <button className="bg-green-500 border border-black text-white mx-auto my-2 p-2 rounded-md font-bold hover:mt-0 ">Get Started Now</button>
        </div>

        <div className="silver flex flex-col w-[30%] bg-slate-100 p-2 mb-10 rounded-xl h-80">
          <h1 className="font-bold text-3xl text-[#ffd700]">GOLD</h1>
          <hr className="opacity-20" />
          <p>Ksh 600/ week</p>
          <div className="pricing-info mt-7"><TiTick className="text-white rounded-full mr-2 bg-green-500 mb-5"/><span> Get the scoop on this week’s matches</span></div>
          <div className="pricing-info my-2"><TiTick className="text-white rounded-full mr-2 bg-green-500"/><span> Enjoy a full week of VIP predictions</span></div>
          <div className="pricing-info"><TiTick className="text-white rounded-full mr-2 bg-green-500"/><span> Weekly unbeatable football predictions!</span></div>
          <hr className="opacity-20 my-5" />
          <button className="bg-green-500 border border-black text-white mx-auto my-2 p-2 rounded-md font-bold hover:mt-0 ">Get Started Now</button>
        </div>

        <div className="silver flex flex-col w-[30%] bg-slate-100 p-2 mb-10 rounded-xl h-80">
          <h1 className="font-bold text-3xl text-blue-900">PLATINUM
          </h1>
          <hr className="opacity-20" />
          <p>Ksh 3000/ month</p>
          <div className="pricing-info mt-7"><TiTick className="text-white rounded-full mr-2 bg-green-500 mb-5"/><span> Plan ahead with our monthly predictions.</span></div>
          <div className="pricing-info my-2"><TiTick className="text-white rounded-full mr-2 bg-green-500"/><span> Get unlimited VIP access for a month</span></div>
          <div className="pricing-info"><TiTick className="text-white rounded-full mr-2 bg-green-500"/><span> Your winning streak starts here!</span></div>
          <hr className="opacity-20 my-5" />
          <button className="bg-green-500 border border-black text-white mx-auto my-2 p-2 rounded-md font-bold hover:mt-0 ">Get Started Now</button>
        </div>

      </div>
    </div>
    
  )
}

export default Pricing