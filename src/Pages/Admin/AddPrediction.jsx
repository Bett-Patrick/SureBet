import { useState } from 'react';
import { db,auth } from '../../Components/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


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

  const handlePredictionChange = (e) => setPrediction(e.target.value);
  const handleHomeTeamChange = (e) => setHomeTeam(e.target.value);
  const handleAwayTeamChange = (e) => setAwayTeam(e.target.value);
  const handlePlanChange = (e) => {
    const { name, checked } = e.target;
    setPlans((prevPlans) => ({
      ...prevPlans,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure only an authenticated admin can add predictions
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to add a prediction.");
      return;
    }

    try {
      await addDoc(collection(db, "predictions"), {
        homeTeam,
        awayTeam,
        prediction,
        plans,
        createdBy: user.uid, // Track who added the prediction
        createdAt: serverTimestamp(),
      });
      alert("Prediction added successfully!");
      setPrediction("");
      setHomeTeam("");
      setAwayTeam("");
      setPlans({ free: false, silver: false, gold: false, platinum: false });
    } catch (error) {
      console.error("Error adding prediction:", error);
      alert("Failed to add prediction.");
    }
  };

  return (
    <div className='add-prediction-page md:min-w-[500] my-30 gap-10 mx-auto px-[5%] border w-[90%] rounded-md'>
      <h1 className='text-4xl font-bold mt-5'>Add Prediction</h1>
      <hr className='h-2 mx-auto opacity-20 my-2' />
      <form onSubmit={handleSubmit}>
        <h1 className='text-left mb-3 text-[#000435] text-lg'>Enter the Games and Prediction Accordingly:</h1>
        <div className='flex flex-row gap-5 items-center'>
            <input
              className='border border-[#000435] rounded-3xl p-3'
              placeholder='Enter Home Team'
              type="text"
              value={homeTeam}
              onChange={handleHomeTeamChange}
              required
            />
            <div>vs</div>
            <input
              className='border border-[#000435] rounded-3xl p-3'
              placeholder='Enter Away Team'
              type="text"
              value={awayTeam}
              onChange={handleAwayTeamChange}
              required
            />
            <input
              className='border border-[#000435] rounded-3xl p-3'
              placeholder='Enter Prediction e.g 1X, 2, GG, Over 2.5'
              type="text"
              value={prediction}
              onChange={handlePredictionChange}
              required
            />
        </div>

        {/* Select Plans Section */}
        <div className='w-full mt-5'>
            <h1 className='text-left mb-3 text-[#000435] text-lg'>Assign to Plans:</h1>
            <div className='flex flex-row gap-3'>
              {["free", "silver", "gold", "platinum"].map((plan) => (
                <div key={plan} className='flex gap-2 text-xl text-[#000435] font-bold'>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={plan}
                    name={plan}
                    checked={plans[plan]}
                    onChange={handlePlanChange}
                  />
                  <label htmlFor={plan}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</label>
                </div>
              ))}
            </div>
        </div>

        <hr className='h-2 mx-auto opacity-20 mt-5'/>
        <button type="submit" className='my-5 bg-[#006400] text-white rounded-xl p-2 text-xl font-bold'>Add Prediction</button>
      </form>
    </div>
  );
};

export default AddPrediction;
