import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="sidebar-list md:absolute h-full flex flex-row md:flex-col gap-5 items-start p-2 bg-blue-950 font-semibold w-full md:w-[20%]">
      <NavLink to="add-prediction" className="sidebar-item bg-white w-full p-2 rounded-md">Add Prediction</NavLink>
      <NavLink to="approve-admin" className="sidebar-item bg-white w-full p-2 rounded-md">Add Admin</NavLink>
    </ul>
  );
};

export default Sidebar;
