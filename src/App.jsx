import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "../public/Components/Layout";
import PredictionsPage from "./Pages/PredictionsPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import UserProfile from "./Pages/UserProfile";
import useAuth from "./hooks/useAuth";
import PasswordReset from "./Pages/PasswordReset";
import PrivateRoute from "../public/Components/PrivateRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

const App = () => {
  const {user, role} = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route 
            path="/register" 
            element={
              user ? (
                role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/profile" />
              ) : (
                <Register />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? (
                role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/profile" />
              ) : (
                <Login />
              )
            } 
          />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login"/>} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/reset-password" element={<PasswordReset/>}></Route>

          {/* Admin Routes (Protected) */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard/>
              </PrivateRoute>
            }>
          </Route>
          
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;