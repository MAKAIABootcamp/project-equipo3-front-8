import SidebarNavigation from "./SidebarNavigation";
import { Outlet } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";
import { useSelector } from "react-redux";


const Layout = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  return (
    <div className="flex relative z-0 self-auto justify-between  "> {/* Cambiado a h-full */}
      <div className="flex relative  min-h-screen flex-grow justify-center "> {/* Flex-grow para ocupar el espacio disponible */}
        {!isAuthenticated && <SidebarPanel />}
        <div className="mb-[86px] lg:mb-2 overflow-hidden w-full lg:w-[calc(100%-262px)] lg:mr-auto"> {/* Solo el Outlet tendrá scroll */}
          <section className="flex flex-col flex-grow min-h-screen">
            <main className=" flex flex-col flex-grow ">
              <Outlet />
            </main>
          </section>
        </div>
      </div>
      <SidebarNavigation />
    </div>
  );
};

export default Layout;

