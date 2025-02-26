import { useState } from 'react';

const AddPrediction = () => {
  const [prediction, setPrediction] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [plans, setPlans] = useState({
    free: false,
    silver: false,
    gold: false,
    platinum: false,
  });

  const handlePredictionChange = (e) => {
    setPrediction(e.target.value);
  };

  const handleHomeTeamChange = (e) => {
    setHomeTeam(e.target.value);
  };

  const handleAwayTeamChange = (e) => {
    setAwayTeam(e.target.value);
  };

  const handlePlanChange = (e) => {
    const { name, checked } = e.target;
    setPlans((prevPlans) => ({
      ...prevPlans,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Home Team:', homeTeam);
    console.log('Away Team:', awayTeam);
    console.log('Prediction:', prediction);
    console.log('Plans:', plans);
  };

  return (
    <div className='add-prediction-page md:min-w-[500] my-30 gap-10 mx-auto px-[5%] border w-[90%] rounded-md'>
      <h1 className='text-4xl font-bold mt-5'>Add Prediction</h1>
      <hr className='h-2 mx-auto opacity-20 my-2' />
      <form onSubmit={handleSubmit}>
        <h1 className='text-left mb-3 text-[#000435] text-lg'>Enter the Games and Prediction Accordingly:</h1>
        <div className='flex flex-row gap-5 items-center'>
            <div>
                <input
                className='border border-[#000435] rounded-3xl p-3'
                    placeholder='Enter Home Team'
                    type="text"
                    id="homeTeam"
                    value={homeTeam}
                    onChange={handleHomeTeamChange}
                    required
                />
            </div>
            <div>vs</div>
            <div>
                <input
                    className='border border-[#000435] rounded-3xl p-3'
                    placeholder='Enter Away Team'
                    type="text"
                    id="awayTeam"
                    value={awayTeam}
                    onChange={handleAwayTeamChange}
                    required
                />
            </div>
            <div>
                <input
                    className='border border-[#000435] rounded-3xl p-3'
                    placeholder='Enter Prediction e.g 1X, 2, 1-0, gg, ov 2.5, etc'
                    type="text"
                    id="prediction"
                    value={prediction}
                    onChange={handlePredictionChange}
                    required
                />
            </div>
        </div>

        {/* Select Plans Section: */}
        <div className='w-full mt-5'>
            <h1 className='text-left mb-3 text-[#000435] text-lg'>Assign to Plans:</h1>
            <div className='flex flex-row gap-3'>
                <div className='flex gap-2 text-xl text-[#000435] mr-5 font-bold'>
                    <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="free"
                    name="free"
                    checked={plans.free}
                    onChange={handlePlanChange}
                    />
                    <label htmlFor="free">Free</label>
                </div>
                <div className='flex gap-2 text-xl text-[#000435] mr-5 font-bold'>
                    <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="silver"
                    name="silver"
                    checked={plans.silver}
                    onChange={handlePlanChange}
                    />
                    <label htmlFor="silver">Silver</label>
                </div>
                <div className='flex gap-2 text-xl text-[#000435] mr-5 font-bold'>
                    <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="gold"
                    name="gold"
                    checked={plans.gold}
                    onChange={handlePlanChange}
                    />
                    <label htmlFor="gold">Gold</label>
                </div>
                <div className='flex gap-2 text-xl text-[#000435] mr-5 font-bold'>
                    <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="platinum"
                    name="platinum"
                    checked={plans.platinum}
                    onChange={handlePlanChange}
                    />
                    <label htmlFor="platinum">Platinum</label>
                </div>
            </div>
        </div>
        <hr className='h-2 mx-auto opacity-20 mt-5'/>
        <button type="submit" className='my-5 bg-[#006400] text-white rounded-xl p-2 text-xl font-bold'>Add Prediction</button>
      </form>
    </div>
  );
};

export default AddPrediction;