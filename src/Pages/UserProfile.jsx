import { useEffect, useState } from "react"
import { auth, db } from "../Components/firebase"
import { doc, getDoc } from "firebase/firestore"

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null)
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) { // ✅ Check if user exists
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                    } else {
                        console.log("User data not found in Firestore!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.log("User is not logged in!!!");
            }
        });

        return () => unsubscribe(); // ✅ Cleanup function to prevent memory leaks
    }, []);

    async function handleLogout(){
        try {
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out", error.message);
        }
    }

    return (
        <div>
            {userDetails ? (
                <>
                    <h1>Welcome {userDetails.email}</h1>
                    <button className="bg-green-800 text-white rounded-md px-2 font-md" onClick={handleLogout}>
                        Logout
                    </button>
                    <div>
                        <p>Email : {userDetails.email}</p>
                        <p>Phone : {userDetails.phone}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default UserProfile;
