import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import PredictionsPage from "./Pages/PredictionsPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import UserProfile from "./Pages/UserProfile";
import useAuth from "./hooks/useAuth";
import PasswordReset from "./Pages/PasswordReset";
import PrivateRoute from "./Components/PrivateRoute";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AddPrediction from "./Pages/Admin/AddPrediction";
import ApproveAdmins from "./Pages/Admin/ApproveAdmins";
import SilverTips from "./Pages/SilverTips";
import GoldTips from "./Pages/GoldTips";
import PlatinumTips from "./Pages/PlatinumTips";

const App = () => {
  const {user, role} = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route 
            path="/register" 
            element={<Register />} 
          />
          <Route 
            path="/login" 
            element={user ? (role === "super-admin" ? <Navigate to="/super-admin" /> : <Navigate to="/" />) : (<Login />)} 
          />
          <Route path="/silver-tips" element={<SilverTips/>}/>
          <Route path="/gold-tips" element={<GoldTips/>}/>
          <Route path="/platinum-tips" element={<PlatinumTips/>}/>
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login"/>} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/reset-password" element={<PasswordReset/>}></Route>


          {/* Admin Route for AddPrediction - Accessible by Admin & Super Admin */}
          <Route path="/add-prediction" element={<PrivateRoute requiredRole={["admin", "super-admin"]}><AddPrediction /></PrivateRoute>} />

          {/* super-admin Routes (Protected) */}
          <Route path="/super-admin" element={<PrivateRoute requiredRole="super-admin"><AdminLayout/></PrivateRoute>}>
            <Route index element={<AddPrediction />} /> {/* Default page inside /admin */}
            <Route path="add-prediction" element={<AddPrediction />} />
            <Route path="approve-admin" element={<ApproveAdmins />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />

        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;