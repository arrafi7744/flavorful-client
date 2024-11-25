import React from "react";
import NavDropDown from "./NavDropDown/NavDropDown";
import logo from "../../assets/logo.png";
import NavMenus from "./NavMenus/NavMenus";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="pt-5 md:pt-0 w-full h-[14vh] px-[2vw] bg-[#FFFFFF] grid md:grid-cols-12">
      <div className="md:col-span-4 w-full h-full border-white flex items-center justify-center md:justify-between md:gap-x-10">
        <Link to="/">
          <div className="flex items-center hover:cursor-pointer">
            <img
              src={logo}
              className="w-10 md:w-20 h-10 md:h-20"
              alt="Flavour Full Fushion Logo"
            />
            <h1 className="text-xl">
              <span className="font-extrabold text-orange-600">
                Flavourfull{" "}
              </span>{" "}
              Fushion
            </h1>
          </div>
        </Link>
        {/* <div>
          <NavDropDown />
        </div> */}
      </div>
      <div className="md:col-span-8">
        <NavMenus />
      </div>
    </div>
  );
}

export default Navbar;
