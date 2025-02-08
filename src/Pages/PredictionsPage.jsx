import useSWR from 'swr';

const fetchPredictions = async () => {
  const res = await fetch("http://localhost:3000/matches");
  return res.json();
};

const PredictionsPage = () => {
  const { data, error } = useSWR("matches", fetchPredictions);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className='mt-5'>
      <div className="flex justify-between items-center w-[60%] px-5 text-white mb-5 gap-10 mx-auto">
          <button className="w-30 bg-yellow-500 text-white rounded-md px-3 py-1 font-bold">Daily</button>
          <button className="w-30 bg-yellow-500 text-white rounded-md px-3 py-1 font-bold">Weekend</button>
          <button className="w-30 bg-yellow-500 text-white rounded-md px-3 py-1 font-bold">Weekly</button>
      </div>
      <table className="table-auto w-[60%] border-collapse mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Home Team</th>
            <th className="px-4 py-2">-</th>
            <th className="px-4 py-2">Away Team</th>
            <th className="px-4 py-2">Prediction</th>
          </tr>
        </thead>
        <tbody>
          {data.map((match, index) => (
            <tr
              key={match.id}
              className={index % 2 === 0 ? "bg-gray-600" : "bg-white"}
            >
              <td className="px-4 py-2">{match.home_team}</td>
              <td className="px-4 py-2">vs</td>
              <td className="px-4 py-2">{match.away_team}</td>
              <td className="px-4 py-2">{match.prediction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='bg-green-500 p-2 w-30 font-bold rounded-md mt-5'>BUY</button>
    </div>
  );
}

export default PredictionsPage