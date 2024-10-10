import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/User/Home.png";
import SearchIcon from "../assets/User/Search.png";
import UserIcon from "../assets/User/User.png";
import ExplorerIcon from "../assets/User/Explorer.png";
import EstrellaIcon from "../assets/icon/Estrella.png";
import ComentIcon from "../assets/icon/ComentaryIcon.png";
// import LoginModal from "./modales/LoginModal";
import LoginButton from "./LoginButton";

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

    <div className="flex flex-col items-center justify-center space-y-4 pb-12 w-[244px] h-[900px] min-h-screen">
  {/* Navigation Menu */}
  <nav className="flex flex-col items-center justify-center space-y-3 w-full">
    <div className="space-y-3">
      {links.map((item, index) => (
        <button key={index} className={`w-[234px] h-[50px] flex items-center justify-center rounded-full ${index === links.length - 1 ? 'bg-blanco-marino p-[8px_52px]' : index === links.length - 2 ? 'bg-default p-[0px_0px_0px_20px]' : 'bg-default'}`}>
          <NavLink className={` text-negro-carbon flex items-center justify-center`}>
            <img src={item.icon} alt={item.label} className="mr-3 w-5 h-5" />
            <span className="text-[24px]">{item.label}</span>
          </NavLink>
        </button>
      ))}
    </div>
  </nav>

  {/* Texto informativo */}
  <p className="text-[12px] text-center leading-1.2 font-normal px-4 pb-[66px] pt-[44px] ">
    Inicia sesión para crear reseñas, seguir a creadores, dar me gusta y ver comentarios.
  </p>

      {/* Botón de iniciar sesión */}
      <LoginButton/>
      {/* <button onClick={LoginModal}  className="text-principal border border-principal py-2 rounded-[4px] mt-6 w-[234px] h-[50px] text-lg font-semibold hover:bg-pink-100 transition-all">
        Iniciar Sesión
            
      </button> */}

  {/* Botón adicional con íconos */}
  <button className="flex items-center justify-start px-4 rounded-[4px] w-[234px] h-[50px] hover:bg-gray-200 transition-all bg-negro-carbon text-blanco-marino">
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
