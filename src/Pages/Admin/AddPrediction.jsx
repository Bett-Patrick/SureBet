import { useState } from 'react';
import { db, auth } from '../../Components/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { fetchNextFixtures } from '../../Utilities/footballApi'; // Import the fetch function

const AddPrediction = () => {
  const [prediction, setPrediction] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [referee, setReferee] = useState('');
  const [stadium, setStadium] = useState('');
  const [plans, setPlans] = useState({
    free: false,
    silver: false,
    gold: false,
    platinum: false,
  });
  const [teamName, setTeamName] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSearch = async () => {
    try {
      const fixturesData = await fetchNextFixtures(teamName);
      setFixtures(fixturesData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      alert('Failed to fetch fixtures.');
    }
  };

  const handleFixtureClick = (fixture) => {
    setHomeTeam(fixture.teams.home.name);
    setAwayTeam(fixture.teams.away.name);
    setDate(new Date(fixture.fixture.date).toLocaleDateString());
    setTime(new Date(fixture.fixture.date).toLocaleTimeString());
    setReferee(fixture.fixture.referee);
    setStadium(fixture.fixture.venue.name);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure only an authenticated admin can add predictions
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to add a prediction.');
      return;
    }

    try {
      await addDoc(collection(db, 'predictions'), {
        homeTeam,
        awayTeam,
        date,
        time,
        referee,
        stadium,
        prediction,
        plans,
        createdBy: user.uid, // Track who added the prediction
        createdAt: serverTimestamp(),
      });
      alert('Prediction added successfully!');
      setPrediction('');
      setHomeTeam('');
      setAwayTeam('');
      setDate('');
      setTime('');
      setReferee('');
      setStadium('');
      setPlans({ free: false, silver: false, gold: false, platinum: false });
    } catch (error) {
      console.error('Error adding prediction:', error);
      alert('Failed to add prediction.');
    }
  };

  return (
    <div className='add-prediction-page md:min-w-[500] my-10 gap-10 mx-auto px-[5%] border w-[90%] rounded-md'>
      <h1 className='text-4xl font-bold mt-5'>Add Prediction</h1>
      <hr className='h-2 mx-auto opacity-20 my-2' />
      <div className='flex flex-col items-center justify-center mt-10'>
        <input
          type='text'
          placeholder='Enter team name...'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className='border p-2 rounded w-64'
        />
        <button
          onClick={handleSearch}
          className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
        >
          Search
        </button>

        {isModalOpen && fixtures.length > 0 && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-5 rounded shadow-lg w-80'>
              <h2 className='text-xl font-bold'>Next Fixtures</h2>
              {fixtures.map((fixture) => (
                <div
                  key={fixture.fixture.id}
                  className='mb-4 cursor-pointer'
                  onClick={() => handleFixtureClick(fixture)}
                >
                  <p>
                    {fixture.teams.home.name} vs {fixture.teams.away.name}
                  </p>
                  <p>Date: {new Date(fixture.fixture.date).toLocaleString()}</p>
                </div>
              ))}
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-red-500 text-white px-4 py-2 mt-4 rounded'
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className='text-left mb-3 text-[#000435] text-lg'>
          Enter the Games and Prediction Accordingly:
        </h1>
        <div className='flex flex-row gap-5 items-center'>
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Home Team'
            type='text'
            value={homeTeam}
            onChange={handleHomeTeamChange}
            required
          />
          <div>vs</div>
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Away Team'
            type='text'
            value={awayTeam}
            onChange={handleAwayTeamChange}
            required
          />
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Date'
            type='text'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Time'
            type='text'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Referee'
            type='text'
            value={referee}
            onChange={(e) => setReferee(e.target.value)}
            required
          />
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Stadium'
            type='text'
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <input
            className='border border-[#000435] rounded-3xl p-3'
            placeholder='Enter Prediction e.g 1X, 2, GG, Over 2.5'
            type='text'
            value={prediction}
            onChange={handlePredictionChange}
            required
          />
        </div>

        {/* Select Plans Section */}
        <div className='w-full mt-5'>
          <h1 className='text-left mb-3 text-[#000435] text-lg'>Assign to Plans:</h1>
          <div className='flex flex-row gap-3'>
            {['free', 'silver', 'gold', 'platinum'].map((plan) => (
              <div key={plan} className='flex gap-2 text-xl text-[#000435] font-bold'>
                <input
                  className='custom-checkbox'
                  type='checkbox'
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

        <hr className='h-2 mx-auto opacity-20 mt-5' />
        <button
          type='submit'
          className='my-5 bg-[#006400] text-white rounded-xl p-2 text-xl font-bold'
        >
          Add Prediction
        </button>
      </form>
    </div>
  );
};

export default AddPrediction;
