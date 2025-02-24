import OurWinsCarousel from '../../public/Components/OurWinsCarousel';
import Pricing from '../../public/Components/Pricing';
import Statistics from '../../public/Components/Statistics';
import Testimonials from '../../public/Components/Testimonials';
import stadium_bg from '../assets/stadium.jpg';
import { IoCheckbox } from "react-icons/io5";

const HomePage = () => {
  return (
    <div>
      <div className="h-[500px] mb-30 w-full">
        {/* Background Image with Overlay */}
        <div 
          style={{ backgroundImage: `url(${stadium_bg})` }} 
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div> Dark Overlay

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center">
          <h1 className="text-4xl font-bold text-amber-300">WIN MORE WITH EXPERT FOOTBALL PREDICTIONS</h1>
          <h1 className="text-5xl font-bold my-3 text-white">& BETTING TIPS</h1>

          <div className="flex justify-center items-center gap-10 mt-5 text-2xl">
            <div className="flex justify-center items-center gap-3 text-white">
              <IoCheckbox className='bg-green-500'/>
              <p>Expert Tips</p>  
            </div>
            <div className="flex justify-center items-center gap-3 text-white">
              <IoCheckbox className='bg-green-500'/>
              <p>Proven Track Record</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-10 mt-15'>
            <button className='bg-green-500 px-5 py-2 rounded-lg text-slate-50 font-bold'>Get Started</button>
            <button className='bg-green-500 px-5 py-2 rounded-lg text-slate-50 font-bold'>Join VIP</button>
          </div>
          <OurWinsCarousel/>
        </div>
      </div>
      <Pricing className=""/>
      <Statistics/>
      <Testimonials/>
    </div>
    
  );
};

export default HomePage;
