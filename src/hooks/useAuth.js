import { useEffect, useState } from "react";
import { auth, db } from "../Components/firebase";
import { doc, getDoc } from "firebase/firestore";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
        setUser(user);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchUserRole(user); // Call the async function
    });

    return () => unsubscribe();
  }, []);

  return { user, role, loading };
};

export default useAuth;
