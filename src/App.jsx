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
            element={user ? (role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/profile" />) : (<Register />)} 
          />
          <Route 
            path="/login" 
            element={user ? (role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/profile" />) : (<Login />)} 
          />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login"/>} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/reset-password" element={<PasswordReset/>}></Route>


          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<PrivateRoute requiredRole="admin"><AdminLayout/></PrivateRoute>}>
            <Route index element={<AddPrediction />} /> {/* Default page inside /admin */}
            <Route path="add-prediction" element={<AddPrediction />} />
            <Route path="add-admin" element={<ApproveAdmins />} />
          </Route>


        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;