import SidebarNavigation from "./SidebarNavigation";
import { Outlet } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";
import { useSelector } from "react-redux";


const Layout = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  return (
    <div className="flex relative z-0 self-auto justify-between "> {/* Cambiado a h-full */}
      <div className="flex relative flex-grow overflow-hidden min-h-screen"> {/* Flex-grow para ocupar el espacio disponible */}
        {!isAuthenticated && <SidebarPanel />}
        <div className=" flex-grow mr-auto"> {/* Solo el Outlet tendrá scroll */}
          <Outlet />
        </div>
      </div>
      <SidebarNavigation />
    </div>
  );
};

export default Layout;

