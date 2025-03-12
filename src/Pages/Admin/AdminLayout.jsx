import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout flex">
      <Sidebar />
      <div className="main-content w-full p-4">
        <Outlet /> {/* This renders nested routes like AddPrediction & ApproveAdmins */}
      </div>
    </div>
  );
};

export default AdminLayout;
