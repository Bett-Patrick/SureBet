import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import PredictionsPage from "./Pages/PredictionsPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PrivateRoute from "../public/Components/PrivateRoute";

const App = () => {
  const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;