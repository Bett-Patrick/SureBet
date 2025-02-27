import { Outlet } from 'react-router-dom';
import Sidebar from '../../../public/Components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
          <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;