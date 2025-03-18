import FreeTips from '../Components/FreeTips';
import OurWinsCarousel from '../Components/OurWinsCarousel';
import Pricing from '../Components/Pricing';
// import Statistics from '../Components/Statistics';
// import Statistics from '../../public/Components/Statistics';
import Testimonials from '../Components/Testimonials';
import stadium_bg from '../assets/stadium.jpg';
import { IoCheckbox } from "react-icons/io5";
import SilverTips from './SilverTips';
import GoldTips from './GoldTips';
import PlatinumTips from './PlatinumTips';

const HomePage = () => {
  return (
    <div className='home-page relative'>
      <div className="h-[500px] mb-30 w-full relative">
        {/* Background Image with Overlay */}
        <div 
          style={{ backgroundImage: `url(${stadium_bg})` }} 
          className="absolute inset-0 bg-cover bg-center z-0"
        />
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div> Dark Overlay

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center">
          <h1 className="text-4xl font-bold text-amber-300">WIN MORE WITH EXPERT FOOTBALL PREDICTIONS</h1>
          <h1 className="text-5xl font-bold my-3 text-white">& BETTING TIPS</h1>

          <div className="flex justify-center items-center gap-10 mt-5 text-2xl">
            <div className="flex justify-center items-center gap-3 text-white">
              <IoCheckbox className='bg-[#006400]'/>
              <p>Expert Tips</p>  
            </div>
            <div className="flex justify-center items-center gap-3 text-white">
              <IoCheckbox className='bg-[#006400]'/>
              <p>Proven Track Record</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-10 mt-15'>
            <button className='bg-[#006400] px-5 py-2 rounded-lg text-slate-50 font-bold'>Get Started</button>
            <button className='bg-[#006400] px-5 py-2 rounded-lg text-slate-50 font-bold'>Join VIP</button>
          </div>
          <OurWinsCarousel/>
        </div>
      </div>
      <Pricing className=""/>
      <FreeTips/>
      <SilverTips/>
      <GoldTips/>
      <PlatinumTips/>
      {/* <Statistics/> */}
      <Testimonials/>
    </div>
    
  );
};

export default HomePage;
