import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout md:relative flex flex-col md:flex-row w-full ">
      <Sidebar />
      <div className="main-content w-full md:ml-[20%]">
        <Outlet /> {/* This renders nested routes like AddPrediction & ApproveAdmins */}
      </div>
    </div>
  );
};

export default AdminLayout;
