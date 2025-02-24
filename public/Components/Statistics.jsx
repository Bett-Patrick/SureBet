import { useEffect, useState } from "react";

const Statistics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log("API KEY:", import.meta.env.VITE_RAPIDAPI_KEY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures/?id=215662", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com", // ✅ FIXED
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY, // ✅ SECURE API KEY
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Statistics</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {data ? <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Statistics;
