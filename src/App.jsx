import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "../public/Components/Layout";
import PredictionsPage from "./Pages/PredictionsPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import UserProfile from "./Pages/UserProfile";
import { useEffect, useState } from "react";
import { auth } from "../public/Components/firebase";

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/predictions" element={<PredictionsPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;