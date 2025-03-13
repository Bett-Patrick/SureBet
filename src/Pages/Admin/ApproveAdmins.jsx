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
          <li key={user.id} className="flex p-2 border-b items-center">
            <span className="w-[30%] text-left">{user.email}</span>
            <span className="w-[30%] font-bold text-xl"> {user.role}</span>
            {/* button to promote admin */}
            {user.role === "user" && (
              <button onClick={() => makeAdmin(user.id)} className="bg-green-600 ml-[28%] text-white p-2 rounded font-semibold">
                Make Admin
              </button>
            )}
            {/* button to demote admin */}
            {user.role === "admin" && (
              <button onClick={() => demoteAdmin(user.id)} className="bg-red-600 ml-[28%] text-white p-2 rounded font-semibold">
                Demote Admin
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveAdmins;
