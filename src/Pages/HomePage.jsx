import { useState, useEffect } from 'react';
import { auth } from '../Components/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the auth state is determined
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className='italic mt-5'>Just a moment! We're setting things up.🚀</p>
        </div>
    ); // Show a loading indicator while determining auth state
  }
  return (
    <div className='home-page relative w-[100%] sm:w-[100%] md:w-[100%]'>
      <div className="h-[500px] mb-30 w-full relative">
        {/* Background Image with Overlay */}
        <div 
          style={{ backgroundImage: `url(${stadium_bg})` }} 
          className="absolute inset-0 bg-cover bg-center z-0"
        />
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div> Dark Overlay

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center">
          <h1 
              className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-300"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Text Shadow
          >
            WIN MORE WITH EXPERT FOOTBALL PREDICTIONS
          </h1>
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold my-3 text-white">
            & BETTING TIPS
          </h1>

          <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:gap-10 mt-5 mx-auto text-2xl ">
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
      <Pricing/>
      <FreeTips/>
      {user && <SilverTips/>} {/* Show SilverTips only if the user is logged in */}
      {user && <GoldTips/>}   {/* Show GoldTips only if the user is logged in */}
      {user && <PlatinumTips/>} {/* Show PlatinumTips only if the user is logged in */}
      {/* <Statistics/> */}
      <Testimonials/>
    </div>
    
  );
};

export default HomePage;
