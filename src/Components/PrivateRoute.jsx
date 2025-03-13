import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />; // Redirect to login if no user
  
  // Check if requiredRole is an array or a string
  const allowed = Array.isArray(requiredRole) ? requiredRole.includes(role) : role === requiredRole;

  if (!allowed) return <Navigate to="/" replace />; // Redirect if role is not allowed

  return children; // Render protected component
};

export default PrivateRoute;
