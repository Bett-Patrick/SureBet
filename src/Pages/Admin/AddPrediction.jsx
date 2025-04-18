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

  // Function to fetch fixtures based on team name
  
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

  // Function to handle fixture selection
  // This function is called when a fixture is clicked in the modal
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
    <div className='add-prediction-page my-10 md:mx-auto p-2 md:px-10 border mx-auto w-[95%] sm:w-[90%] rounded-md'>
      <h1 className='text-4xl font-bold mt-5'>Add Prediction</h1>
      <hr className='h-2 mx-auto opacity-20 my-2' />

      {/* search for fixture */}
      <div className='flex flex-row w-[90%] items-center justify-center my-5 mx-auto'>
        <div className="relative group w-full md:w-[300px]">
          <input
            type="text"
            placeholder="Enter team name to search fixture"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border p-2 rounded-l-lg text-sm md:text-base shadow-md shadow-gray-400 truncate w-full"
          />

          {/* Tooltip - shows either placeholder or typed value */}
          <span className="absolute left-0 -top-10 bg-black text-white text-xs p-2 rounded shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-w-xs break-words">
            {teamName || "Enter team name to search fixture"}
          </span>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-950 text-white px-4 py-2 font-semibold rounded-r-md ml-2 text-center"
        >
          Search
        </button>


        {/* display matching fixtures */}
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
      <form onSubmit={handleSubmit} className='text-sm md:text-base' >
        <h1 className='mb-3 text-red-500 opacity-80 text-sm text-center sm:text-md md:text-lg'>
          The fields bellow will be Automatically filled Accordingly after searching fixture !!
        </h1>
        <div className='flex flex-col bg-slate-200 rounded-md p-3 gap-1 lg:flex-row lg:gap-5 lg:bg-white items-center'>
          <p className='border border-[#000435] rounded-md md:rounded-3xl p-1 md:p-3 w-full'>
            <strong>Home Team:</strong> {homeTeam || 'N/A'}
          </p>
          <div>vs</div>
          <p className='border border-[#000435] rounded-md md:rounded-3xl p-1 md:p-3 w-full'>
            <strong>Away Team:</strong> {awayTeam || 'N/A'}
          </p>
        </div>
        <div className='flex flex-row gap-5 items-center mt-5'>
          <p className='border border-[#000435] rounded-md md:rounded-3xl p-1 md:p-3 w-full'>
            <strong>Date:</strong> {date || 'N/A'}
          </p>
          <p className='border border-[#000435] rounded-md md:rounded-3xl p-1 md:p-3 w-full'>
            <strong>Time:</strong> {time || 'N/A'}
          </p>
        </div>
        <div className='flex flex-col lg:flex-row gap-5 items-center mt-5'>
          <p className='border border-[#000435] rounded-md md:rounded-3xl p-1 md:p-3 w-full'>
            <strong>Referee:</strong> {referee || 'N/A'}
          </p>
          <p className='border border-[#000435] rounded-md md:rounded-3xl p-1 md:p-3 w-full'>
            <strong>Stadium:</strong> {stadium || 'N/A'}
          </p>
        </div>
        <div className='flex flex-row gap-2 items-center mt-5'>
          <Select
            className='w-full text-sm sm:text-base'
            placeholder='Select Prediction Type'
            options={predictionTypes}
            value={predictionType}
            onChange={handlePredictionTypeChange}
            isSearchable
          />
          <Select
            className='w-full text-sm sm:text-base'
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