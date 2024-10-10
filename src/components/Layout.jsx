import React from "react";
import RightAside from "./RightAside";
import { Outlet } from "react-router-dom";
import LeftAside from "./LeftAside";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 md:space-y-0 overflow-auto">
      {/* <Header/> */}
      <LeftAside />
      <Outlet />
      <RightAside />

    
    </div>
  );
};

export default Layout;
