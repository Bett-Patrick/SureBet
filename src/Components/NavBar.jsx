import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../../src/hooks/useAuth"
import { auth } from "./firebase";
import { toast } from "react-toastify";

const NavBar = () => {
    const {user, role} = useAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await auth.signOut();
            toast.success("Logged out successfully!", { position: "top-right" });
            navigate("/login");
        } catch (error) {
            toast.error("Error logging out: " + error.message, { position: "top-right" });
        }
    };

  return (
<header className="bg-[#000435] w-full px-4 py-3">
  <nav className="flex items-center justify-between max-w-6xl mx-auto text-yellow-400 font-medium overflow-x-auto whitespace-nowrap">

    {/* Left: Nav Links */}
    <div className="flex flex-wrap items-center gap-3 md:gap-6">
      <NavLink to="/" className="text-sm md:text-base">Home</NavLink>
      <NavLink to="/predictions" className="text-sm md:text-base">Predictions</NavLink>

      {user && role === "admin" && (
        <NavLink to="/add-prediction" className="text-sm md:text-base">Add Prediction</NavLink>
      )}
      {user && role === "super-admin" && (
        <NavLink to="/super-admin" className="text-sm md:text-base">Admin Panel</NavLink>
      )}
      {user && (
        <NavLink to="/profile" className="text-sm md:text-base">Profile</NavLink>
      )}
    </div>

    {/* Right: Auth Buttons */}
    <div className="flex flex-wrap items-center gap-3 ml-4">
      {!user ? (
        <>
          <NavLink
            to="/register"
            className="bg-white text-[#000435] px-3 py-1 text-sm md:text-base rounded-lg border-2 border-amber-300 shadow-md"
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="bg-white text-[#000435] px-3 py-1 text-sm md:text-base rounded-lg border-2 border-amber-300 shadow-md"
          >
            Login
          </NavLink>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 text-sm md:text-base rounded-md"
        >
          Logout
        </button>
      )}
    </div>

  </nav>
</header>

  )
}

export default NavBar