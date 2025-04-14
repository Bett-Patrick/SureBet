import { useEffect, useState } from "react";
import { db } from "../../Components/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const ApproveAdmins = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  // function to promote user to admin
  const makeAdmin = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: "admin" });
      setUsers(users.map(user => (user.id === userId ? { ...user, role: "admin" } : user)));
      toast.success("User promoted to admin!", { position: "top-center" });
    } catch (error) {
      toast.error("Error updating user role", { position: "bottom-center" });
    }
  };

  // function to demote admin to user
  const demoteAdmin = async (userId) =>{
    try{
      await updateDoc(doc(db, "users", userId), { role: "user" });
      setUsers(users.map(user => (user.id === userId ? { ...user, role: "user" } : user)));
      toast.success("Admin demoted to user!", { position: "top-center" });
    }
    catch(error){
      toast.error("Error updating user role", { position: "bottom-center" });
    }
  }

  return (
    <div className="admin-approval">
      <h2 className="text-3xl font-bold mt-3 italic">Approve Admins</h2>
      <hr className="opacity-65 my-2"/>
      <ul className="users-list flex flex-col justify-between gap-2 my-5 pb-5 md:pb-10 bg-gray-100 rounded-md mx-2 sm:mx-5 md:mx-15 md:px-10">
        {users.map(user => (
          // display each user in a list
          <li key={user.id}>
            {(user.role === "user" || user.role === "admin") && (
              <div className="flex flex-row items-center justify-between py-2 mx-2 border-b gap-3">
                <p className="min-w-[50%] truncate hover:whitespace-normal hover:overflow-visible text-left text-sm md:text-base">{user.email}</p>
                <p className="w-[20%] font-bold text-md border-x border-x-gray-300 md:text-xl"> {user.role}</p>
                {/* button to promote admin */}
                {user.role === "user" && (
                  <button onClick={() => makeAdmin(user.id)} className="bg-green-600 text-white p-2 rounded font-semibold">
                    Promote
                  </button>
                )}
                {/* button to demote admin */}
                {user.role === "admin" && (
                  <button onClick={() => demoteAdmin(user.id)} className="bg-red-600 text-white p-2 rounded font-semibold">
                    Demote
                  </button>
                )}
              </div>  
            )}
          </li>

        ))}
      </ul>
    </div>
  );
};

export default ApproveAdmins;
