import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import ApproveAdmins from './ApproveAdmins';
// import { auth } from '../../Components/firebase';

const AdminDashboard = () => {
      // async function handleLogout(){
      //     try {
      //         await auth.signOut()
      //         window.location.href = "/login"
      //         console.log("User logged out successfully!")
      //     } catch (error) {
      //         console.error("Error logging out", error.message)
      //     }
      // }
  return (
    <div className="admin-dashboard flex w-[100%]">
      {/* <button className=" bg-green-800 ext-white rounded-md px-2 font-md" onClick={handleLogout}>Logout</button> */}
      <Sidebar />
      <ApproveAdmins/>
      <div className="main-content">
          <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;