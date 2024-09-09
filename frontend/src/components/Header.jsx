import React from "react";
import NavBar from "./NavBar";
import logo from "../assets/logo_logo.svg"

const Header = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 w-full">
        <div className="flex items-center space-x-10">
          <img src={logo} alt="SkillLinkr logo" className="h-15 w-20" />
          <NavBar className="" />
        </div>
      </header>
    </>
  );
};

export default Header;
