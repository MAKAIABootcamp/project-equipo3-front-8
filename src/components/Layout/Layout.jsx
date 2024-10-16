import SidebarNavigation from "./SidebarNavigation";
import { Outlet } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";

const Layout = () => {
  return (
    <div >
      {/* <Header/> */}
      <div className="flex justify-center ">
      <SidebarPanel />
      <Outlet />
      </div>
      <SidebarNavigation />

    </div>
  );
};

export default Layout;
