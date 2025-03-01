import { useEffect, useState } from "react";
import { db } from "../../public/Components/firebase";
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

  const makeAdmin = async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: "admin" });
      setUsers(users.map(user => (user.id === userId ? { ...user, role: "admin" } : user)));
      toast.success("User promoted to admin!", { position: "top-center" });
    } catch (error) {
      toast.error("Error updating user role", { position: "bottom-center" });
    }
  };

  return (
    <div className="admin-approval">
      <h2 className="text-3xl font-bold">Approve Admins</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex justify-between p-2 border">
            <span>{user.email} - {user.role}</span>
            {user.role === "user" && (
              <button onClick={() => makeAdmin(user.id)} className="bg-green-600 text-white p-2 rounded">
                Make Admin
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveAdmins;
