import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-50 z-50 flex items-center justify-between p-6 bg-white">
        <div className="flex items-center space-x-10">
          <img src="" alt="SkillLinkr logo" className="h-13 w-20" />
          <NavBar />
        </div>
      </header>
    </>
  );
};

export default Header;
