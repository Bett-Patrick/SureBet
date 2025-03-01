import {  Outlet } from "react-router-dom"
import Footer from "../../src/Pages/Footer"
import NavBar from "./NavBar"

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>

      <Footer/>
    </div>
  )
}

export default Layout