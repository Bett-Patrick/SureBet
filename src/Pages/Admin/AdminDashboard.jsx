import Sidebar from './Sidebar'; // Assuming you have a Sidebar component
import { Route, Routes } from 'react-router-dom';
import AddPrediction from './AddPrediction';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/add-predictions" element={<AddPrediction />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;