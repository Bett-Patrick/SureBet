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
    <header className="flex justify-center items-center bg-[#000435] h-30 p-5">
    <nav>
        <div className="flex justify-between items-center w-[50%] text-yellow-400 ml-auto gap-20 font-medium">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/predictions">Predictions</NavLink>
            {!user ? (
                <>
                <NavLink to="/register" className="bg-white text-[#000435] px-2 w-30 text-xl rounded-lg border-2 border-amber-300 shadow-[2px_2px_5px_grey]" >Register</NavLink>
                <NavLink to="/login" className="bg-white text-[#000435] px-2 w-30 text-xl rounded-lg border-2 border-amber-300 shadow-[2px_2px_5px_grey]" >Login</NavLink>
                </>
            ):(
                <>
                    {role === "admin" ? <NavLink to="/admin">Admin Panel</NavLink> : <NavLink to="/profile">Profile</NavLink>}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                            Logout
                    </button>

                </>
            )}
        </div>
    </nav>
  </header>
  )
}

export default NavBar