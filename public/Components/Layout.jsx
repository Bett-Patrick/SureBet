import { NavLink, Outlet } from "react-router-dom"
import Footer from "../../src/Pages/Footer"

const Layout = () => {
  return (
    <div>
      <header className="flex justify-center items-center bg-[#000435] h-30 p-5">
        <nav>
            <div className="flex justify-between items-center w-[50%] text-yellow-400 ml-auto gap-20 font-medium">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/predictions">Predictions</NavLink>
                <NavLink to="/register" className="bg-white text-[#000435] px-2 w-30 text-xl rounded-lg border-2 border-amber-300 shadow-[2px_2px_5px_grey]" >Register</NavLink>
                <NavLink to="/login" className="bg-white text-[#000435] px-2 w-30 text-xl rounded-lg border-2 border-amber-300 shadow-[2px_2px_5px_grey]" >Login</NavLink>
            </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer/>
    </div>
  )
}

export default Layout