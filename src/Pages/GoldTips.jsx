import { useEffect, useState } from 'react';
import { db } from '../Components/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const GoldTips = () => {
  const [goldTips, setGoldTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoldTips = async () => {
      try {
        const q = query(collection(db, 'predictions'), where('plans.gold', '==', true));
        const querySnapshot = await getDocs(q);
        const tips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGoldTips(tips);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldTips();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Gold Tips</h1>
      {goldTips.length === 0 ? (
        <p>No gold tips available.</p>
      ) : (
        <ul>
          {goldTips.map(tip => (
            <li key={tip.id}>
              <p>{tip.homeTeam} vs {tip.awayTeam}</p>
              <p>Prediction: {tip.prediction}</p>
              <p>Date: {tip.date}</p>
              <p>Time: {tip.time}</p>
              <p>Referee: {tip.referee}</p>
              <p>Stadium: {tip.stadium}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoldTips;