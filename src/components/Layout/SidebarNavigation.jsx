import NavigationMenu from "../Navigation/NavigationMenu";

const SidebarNavigation = () => {
  return (
    <aside className="fixed top-0 right-0 h-screen border-l-[1px] border-blanco-artico p-4">
      <NavigationMenu />
    </aside>
  );
};

export default SidebarNavigation;
