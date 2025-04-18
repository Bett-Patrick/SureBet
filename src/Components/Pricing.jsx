import { TiTick } from "react-icons/ti";
import { NavLink } from "react-router-dom";


const Pricing = () => {
  return (
    <div className="pricings-page md:min-w-[500] mb-10 gap-10 w-[90%] mx-auto">
      <h1 className="text-4xl font-bold mb-5">PRICING</h1>
      <h3 className=" text-2xl mb-5 md:text-3xl font-bold md:mb-10"><span className="text-amber-300">Join a Club</span>  that Suits You</h3>

      <div className="pricings flex flex-col gap-3 md:flex-row md:justify-center items-center md:gap-10 py-2">
        <div className="container flex flex-col w-[80%] md:w-[30%] bg-slate-100 p-2 mb-10 rounded-xl min-h-90">
          <h1 className="font-bold text-3xl text-[#C0C0C0]">SILVER</h1>
          <hr className="opacity-20" />
          <p>Ksh 200/ day</p>
          <div className="pricing-info mt-7"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Every day is game day! Check out our daily tips and win big!</span></div>
          <div className="pricing-info my-2"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Access 24 hours VIP predictions</span></div>
          <div className="pricing-info"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Expert Football Predictions</span></div>
          <hr className="opacity-20 my-5" />
          <NavLink to="/silver-tips" className="bg-[#006400] border border-black text-white mx-auto mb-2 p-2 rounded-md font-bold hover:w-50 hover:h-12 text-lg hover:border-yellow-500">Get Started Now</NavLink>
        </div>

        <div className="container flex flex-col w-[80%] md:w-[30%] bg-slate-100 p-2 mb-10 rounded-xl min-h-90">
          <h1 className="font-bold text-3xl text-[#ffd700]">GOLD</h1>
          <hr className="opacity-20" />
          <p>Ksh 600/ week</p>
          <div className="pricing-info mt-7"><TiTick className="text-white rounded-full mr-2 bg-yellow-500 my-auto"/><span> Get the scoop on this week’s matches</span></div>
          <div className="pricing-info my-2"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Enjoy a full week of VIP predictions</span></div>
          <div className="pricing-info"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Weekly unbeatable football predictions!</span></div>
          <hr className="opacity-20 my-5" />
           <NavLink to="/gold-tips" className="bg-[#006400] border border-black text-white mx-auto mt-auto my-2 p-2 rounded-md font-bold hover:w-50 hover:h-12 text-lg hover:border-yellow-500 ">Get Started Now</NavLink>
        </div>

        <div className="container flex flex-col w-[80%] md:w-[30%] bg-slate-100 p-2 mb-10 rounded-xl min-h-90">
          <h1 className="font-bold text-3xl text-blue-900">PLATINUM
          </h1>
          <hr className="opacity-20" />
          <p>Ksh 3000/ month</p>
          <div className="pricing-info mt-7"><TiTick className="text-white rounded-full mr-2 bg-yellow-500 my-auto"/><span> Plan ahead with our monthly predictions.</span></div>
          <div className="pricing-info my-2"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Get unlimited VIP access for a month</span></div>
          <div className="pricing-info"><TiTick className="text-white rounded-full mr-2 bg-yellow-500"/><span> Your winning streak starts here!</span></div>
          <hr className="opacity-20 my-5" />
           <NavLink to="/platinum-tips" className="bg-[#006400] border border-black text-white mx-auto mt-auto my-2 p-2 rounded-md font-bold hover:w-50 hover:h-12 text-lg hover:border-yellow-500 ">Get Started Now</NavLink>
        </div>

      </div>
    </div>
    
  )
}

export default Pricing