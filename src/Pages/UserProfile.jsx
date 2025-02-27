import { useEffect, useState } from "react"
import { auth, db } from "../../public/Components/firebase"
import { doc, getDoc } from "firebase/firestore"

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null)
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) =>{
            // console.log(user)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                setUserDetails(docSnap.data())
            }else{
                console.log("User is not Logged in!!!")
                // toast.error("User is not Logged in!!!", {position: "bottom-center"})
            }
        })
    }

    useEffect(()=>{
        fetchUserData()
    },[])

    async function handleLogout(){
        try {
            await auth.signOut()
            window.location.href = "/login"
            console.log("User logged out successfully!")
        } catch (error) {
            console.error("Error logging out", error.message)
        }
    }

  return (
    <div>
        {userDetails ? (
            <>
            <h1>Welcome {userDetails.email}</h1>
            <button className=" bg-green-800 ext-white rounded-md px-2 font-md" onClick={handleLogout}>Logout</button>
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

export default UserProfile