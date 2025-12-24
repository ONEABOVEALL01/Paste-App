import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar flex  h-[8vh] mt-4 text-center bg-[#004D61] justify-between gap-[20vh] text-[#E5E7EB] text-2xl">
      <div>
        <p className="text-green-300 ml-[10vh]  font-semibold mt-[1.5vh]">ONEABOVEALL</p>
      </div>

      <div className="mr-[30vh] mt-[1.5vh] flex">
        <div className="mr-[20vh]">
          <NavLink to="/">Home</NavLink>
        </div>

        <div className="">
          <NavLink to="/pastes">Pastes</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
