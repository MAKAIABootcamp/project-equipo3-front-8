import SidebarNavigation from "./SidebarNavigation";
import { Outlet } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";

const Layout = () => {
  return (
    <div className="flex flex-col items-center p-3 ">
      {/* <Header/> */}
      <SidebarPanel />
      <Outlet />
      <SidebarNavigation />

    </div>
  );
};

export default Layout;
