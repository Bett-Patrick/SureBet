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

const App = () => {
  const user = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> :<Login />} />
          <Route path="/profile" element={user? <UserProfile /> : <Navigate to="/login"/>} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/reset-password" element={<PasswordReset/>}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;