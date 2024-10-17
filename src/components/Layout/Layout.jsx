import SidebarNavigation from "./SidebarNavigation";
import { Outlet } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";
import { useSelector } from "react-redux";


const Layout = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  
  return (
    <div >
      <div className="flex justify-center ">
      {!isAuthenticated && <SidebarPanel />}
      <Outlet />
      </div>
      <SidebarNavigation />

    </div>
  );
};

export default Layout;
