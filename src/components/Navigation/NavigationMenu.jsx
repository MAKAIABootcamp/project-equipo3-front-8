import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/icons/core/home_icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/core/search_icon.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/core/account_icon.svg";
import { ReactComponent as ExplorerIcon } from "../../assets/icons/core/discover_icon.svg";
import EstrellaIcon from "../../assets/icon/Estrella.png";
import ComentIcon from "../../assets/icon/ComentaryIcon.png";
// import LoginModal from "./modales/LoginModal";
import LoginButton from "../buttons/Auth/LoginButton";

import "./NavigationMenu.css";

const links = [
  {
    icon: HomeIcon,
    label: "Home",
    link: "/home",
  },
  {
    icon: SearchIcon,
    label: "Buscar",
    link: "/",
  },
  {
    icon: ExplorerIcon,
    label: "Explorar",
    link: "/",
  },
  {
    icon: UserIcon,
    label: "Perfil",
    link: "/",
  },
];

const NavigationMenu = () => {

  return (

    <div className="flex flex-col items-center justify-center pb-12 w-[244px] min-h-screen">
      {/* Navigation Menu */}
      <nav className="flex flex-col items-center justify-center space-y-3 w-full">
          {links.map((item, index) => (
            <NavLink  key={index} className="w-[234px] h-[50px] flex items-center justify-center rounded-full ">
              <div className="navbarLink absolute z-10 w-[94px] text-negro-carbon flex items-center  active:text-grey-basic">
              <item.icon
                  className={`mr-3 w-[24px] h-[24px] active:text-red-800 ${
                    isActive ? "text-blue-600" : "text-negro-carbon"
                  }`} // Cambia a los colores que deseas usar
                />                <span className="text-xl">{item.label}</span>
              </div>
              <div className="navbarButton w-[234px] h-[50px] rounded-full"></div>
            </NavLink>
          ))}
      </nav>

      {/* Texto informativo */}
      <p className="text-[12px] text-center leading-1.2 font-normal px-4 pb-[66px] pt-[44px]  ">
        Inicia sesión para crear reseñas, seguir a creadores, dar me gusta y ver comentarios.
      </p>

      {/* Botón de iniciar sesión */}
      <LoginButton />

      {/* Botón adicional con íconos */}
      <button className="flex items-center justify-start px-4 rounded-[4px] w-full h-[50px] bg-negro-carbon text-white mt-4">
        <img src={ComentIcon} alt="Coment Icon" className="w-6 h-6" />
        <p className="text-[12px] text-left ml-2 leading-4 flex-1">
          Califica los mejores restaurantes de tu cuidad
        </p>
        <img src={EstrellaIcon} alt="Estrella Icon" className="w-5 h-5" />
      </button>
    </div>

  );
};

export default NavigationMenu;
