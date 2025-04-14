import { useState } from 'react';
import { db, auth } from '../../Components/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { fetchNextFixtures, fetchPredictionTypes, fetchPredictionValues } from '../../Utilities/footballApi'; // Import utility functions
import Select from 'react-select'; // Import React-Select

const AddPrediction = () => {
  const [predictionType, setPredictionType] = useState(null); // Selected prediction type
  const [predictionValue, setPredictionValue] = useState(null); // Selected prediction value
  const [predictionTypes, setPredictionTypes] = useState([]); // All prediction types
  const [predictionOptions, setPredictionOptions] = useState([]); // Prediction values for the selected type
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [referee, setReferee] = useState('');
  const [stadium, setStadium] = useState('');
  const [fixtureId, setFixtureId] = useState('');
  const [plans, setPlans] = useState({
    free: false,
    silver: false,
    gold: false,
    platinum: false,
  });
  const [teamName, setTeamName] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleFixtureClick = async (fixture) => {
    setHomeTeam(fixture.homeTeam);
    setAwayTeam(fixture.awayTeam);
    setDate(new Date(fixture.date).toLocaleDateString());
    setTime(new Date(fixture.date).toLocaleTimeString());
    setReferee(fixture.referee);
    setStadium(fixture.stadium);
    setFixtureId(fixture.fixtureId);

    try {
      // Fetch prediction types for the selected fixture
      const types = await fetchPredictionTypes(fixture.fixtureId);
      setPredictionTypes(types);
    } catch (error) {
      console.error('Error fetching prediction types:', error);
      alert('Failed to load prediction types.');
    }

    setIsModalOpen(false);
  };

  const handlePredictionTypeChange = (selectedOption) => {
    setPredictionType(selectedOption);

    // Fetch prediction values for the selected type
    const values = fetchPredictionValues(selectedOption);
    setPredictionOptions(values);
    setPredictionValue(null); // Reset prediction value when type changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to add a prediction.');
      return;
    }

    try {
      await addDoc(collection(db, 'predictions'), {
        fixtureId,
        homeTeam,
        awayTeam,
        date,
        time,
        referee,
        stadium,
        predictionType: predictionType?.value, // Save prediction type
        predictionValue: predictionValue?.value, // Save prediction value
        plans,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
      alert('Prediction added successfully!');
      setPredictionType(null);
      setPredictionValue(null);
      setHomeTeam('');
      setAwayTeam('');
      setDate('');
      setTime('');
      setReferee('');
      setStadium('');
      setFixtureId('');
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
      <div className='flex flex-row gap-5 w-[90%] items-center justify-center my-5 mx-auto'>
        <input
          type='text'
          placeholder='Enter team name to search fixture...'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className='border p-2 rounded-xl text-sm md:text-base shadow-md shadow-gray-400 overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal hover:overflow-visible hover:z-10 relative'
        />
        <button
          onClick={handleSearch}
          className='bg-blue-950 text-white px-4 py-2 font-semibold rounded-md text-center'
        >
          Search
        </button>

        {isModalOpen && fixtures.length > 0 && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded shadow-lg w-80 h-fit py-2'>
              <h2 className='text-xl font-bold'>Next Three Fixtures</h2>
              <hr className='my-3' />
              {fixtures.map((fixture) => (
                <div
                  key={fixture.fixtureId}
                  className='mb-4 cursor-pointer px-5'
                  onClick={() => handleFixtureClick(fixture)}
                >
                  <p>
                    {fixture.homeTeam} vs {fixture.awayTeam}
                  </p>
                  <p>Date: {new Date(fixture.date).toLocaleString()}</p>
                  <hr className='my-3' />
                </div>
              ))}
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-red-500 text-white px-4 py-2 rounded'
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className='text-left mb-3 text-[#350200] text-sm sm:text-md md:text-lg'>
          These fields will be Automatically filled Accordingly after searching fixture:
        </h1>
        <div className='flex flex-row gap-5 items-center'>
          <p className='border border-[#000435] rounded-3xl p-3 w-full'>
            <strong>Home Team:</strong> {homeTeam || 'N/A'}
          </p>
          <div>vs</div>
          <p className='border border-[#000435] rounded-3xl p-3 w-full'>
            <strong>Away Team:</strong> {awayTeam || 'N/A'}
          </p>
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <p className='border border-[#000435] rounded-3xl p-3 w-full'>
            <strong>Date:</strong> {date || 'N/A'}
          </p>
          <p className='border border-[#000435] rounded-3xl p-3 w-full'>
            <strong>Time:</strong> {time || 'N/A'}
          </p>
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <p className='border border-[#000435] rounded-3xl p-3 w-full'>
            <strong>Referee:</strong> {referee || 'N/A'}
          </p>
          <p className='border border-[#000435] rounded-3xl p-3 w-full'>
            <strong>Stadium:</strong> {stadium || 'N/A'}
          </p>
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <Select
            className='w-full'
            placeholder='Select Prediction Type'
            options={predictionTypes}
            value={predictionType}
            onChange={handlePredictionTypeChange}
            isSearchable
          />
          <Select
            className='w-full'
            placeholder='Select Prediction Value'
            options={predictionOptions}
            value={predictionValue}
            onChange={(selectedOption) => setPredictionValue(selectedOption)}
            isSearchable
          />
        </div>

        {/* Select Plans Section */}
        <div className='w-full mt-5'>
          <h1 className='text-left mb-3 text-[#000435] text-md md:text-lg'>Assign to Plans:</h1>
          <div className='flex flex-row gap-3'>
            {['free', 'silver', 'gold', 'platinum'].map((plan) => (
              <div key={plan} className='flex gap-1 md:gap-3 items-center text-sm md:text-lg text-[#000435] font-bold'>
                <input
                  className='custom-checkbox text-sm md:text-lg'
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