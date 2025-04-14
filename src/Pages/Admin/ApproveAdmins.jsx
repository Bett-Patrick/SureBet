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
      <ul className="users-list flex flex-col gap-2">
        {users.map(user => (
          <li key={user.id} className="flex flex-row items-center justify-between py-2 mx-2 border-b gap-3">
            <span className="max-w-[30%] text-left text-sm md:text-base">{user.email}</span>
            <span className="w-[10%] font-bold text-md md:text-xl"> {user.role}</span>
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
            {user.role === "super-admin" && (
              <span className="bg-gray-950 text-gray-950 rounded w-[20%]">{user.role}</span>
            )}
          </li>

        ))}
      </ul>
    </div>
  );
};

export default ApproveAdmins;
