import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      }
      setLoading(false);
    };
    fetchRole();
  }, []);

  if (loading) return <p>Loading...</p>;

  return role === requiredRole ? children : <Navigate to="/" />;
};

export default PrivateRoute;
