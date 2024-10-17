import NavigationMenu from "../Navigation/NavigationMenu";

const SidebarNavigation = () => {
  return (
    <aside className="fixed z-10 bottom-0 w-full lg:top-0 lg:right-0 lg:p-8 items-stretch justify-stretch flex lg:w-fit  bg-white border-t-[1px] lg:border-l-[1px]  border-blanco-artico lg:justify-between p-2" >
      <NavigationMenu />
      
    </aside>
  );
};

export default SidebarNavigation;
