import { useEffect, useState } from 'react';
import { db } from '../Components/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const PlatinumTips = () => {
  const [PlatinumTips, setPlatinumTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatinumTips = async () => {
      try {
        const q = query(collection(db, 'predictions'), where('plans.platinum', '==', true));
        const querySnapshot = await getDocs(q);
        const tips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlatinumTips(tips);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatinumTips();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Platinum Tips</h1>
      {PlatinumTips.length === 0 ? (
        <p>No platinum tips available.</p>
      ) : (
        <ul>
          {PlatinumTips.map(tip => (
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

export default PlatinumTips;