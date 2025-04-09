import {  Outlet } from "react-router-dom"
import Footer from "../../src/Pages/Footer"
import NavBar from "./NavBar"

const Layout = () => {
  return (
    <div className="w-full h-fit">
      <NavBar />
      <main className="w-full h-fit">
        <Outlet />
      </main>

      <Footer/>
    </div>
  )
}

export default Layout