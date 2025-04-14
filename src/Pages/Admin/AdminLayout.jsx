import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout flex flex-col md:flex-row ">
      <Sidebar />
      <div className="main-content w-full">
        <Outlet /> {/* This renders nested routes like AddPrediction & ApproveAdmins */}
      </div>
    </div>
  );
};

export default AdminLayout;
