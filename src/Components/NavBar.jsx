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
<header className="bg-[#000435] w-full px-4 py-3 mx-auto">
  {/* Top Row: Logo and Auth Buttons */}
  <div className="flex items-center justify-between w-full mx-auto text-yellow-400 font-medium whitespace-nowrap gap-3">
    {/* Logo */}
    <div className="text-lg font-bold">SureBet</div>

    {/* Auth Buttons */}
    <div className="flex items-center gap-3">
      {!user ? (
        <>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `bg-white text-[#000435] px-3 py-1 text-sm md:text-base rounded-lg border-2 border-amber-300 shadow-md ${
                isActive ? "border-b-2 border-red-500" : ""
              }`
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `bg-white text-[#000435] px-3 py-1 text-sm md:text-base rounded-lg border-2 border-amber-300 shadow-md ${
                isActive ? "border-b-2 border-red-500" : ""
              }`
            }
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
  </div>

  {/* Bottom Row: Navigation Links */}
  <nav className="flex items-center justify-center max-w-6xl mx-auto text-yellow-400 font-medium whitespace-nowrap gap-3 mt-3">
    <aside className={`${user ? "flex w-full items-center justify-between md:justify-around md:w-[60%]" : "flex items-center justify-center"} gap-3 md:gap-6`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm md:text-base ${isActive ? "border-b-2 border-red-500 bg-gray-950 px-2 pt-4" : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/predictions"
        className={({ isActive }) =>
          `text-sm md:text-base ${isActive ? "border-b-2 border-red-500 bg-gray-950 px-2 pt-4" : ""}`
        }
      >
        Predictions
      </NavLink>
      {user && role === "admin" && (
        <NavLink
          to="/add-prediction"
          className={({ isActive }) =>
            `text-sm md:text-base ${isActive ? "border-b-2 border-red-500 bg-gray-950 px-2 pt-4" : ""}`
          }
        >
          Add Prediction
        </NavLink>
      )}
      {user && role === "super-admin" && (
        <NavLink
          to="/super-admin"
          className={({ isActive }) =>
            `text-sm md:text-base ${isActive ? "border-b-2 border-red-500 bg-gray-950 px-2 pt-4" : ""}`
          }
        >
          Admin Panel
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-sm md:text-base ${isActive ? "border-b-2 border-red-500 bg-gray-950 px-2 pt-4" : ""}`
          }
        >
          Profile
        </NavLink>
      )}
    </aside>
  </nav>
</header>
  )
}

export default NavBar