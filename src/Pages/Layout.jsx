import { NavLink, Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {
  return (
    <div>
      <header className="flex justify-center items-center bg-[#000435] h-30 p-5">
        <nav>
            <div className="flex justify-between items-center w-[50%] text-yellow-400 ml-auto gap-20">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/predictions">Predictions</NavLink>
                <NavLink to="/login" className=" bg-green-500 text-white p-2 w-30 text-xl rounded-2xl" >Login</NavLink>
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