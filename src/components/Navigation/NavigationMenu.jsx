import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";// Ajusta la ruta según tu estructura
import DropdownButton from "../Modals/DropdownButton";

// ICONS
import HomeIcon from "../../assets/icons/core/home_icon_outline.svg";
import HomeIconFilled from "../../assets/icons/core/home_icon_filled.svg";

import SearchIcon from "../../assets/icons/core/search_icon.svg";

import DiscoverIcon from "../../assets/icons/core/explore_icon_outline.svg";
import DiscoverIconFilled from "../../assets/icons/core/explore_icon_filled.svg";

import ProfileIcon from "../../assets/icons/core/account_circle_icon_outline.svg";
import ProfileIconFilled from "../../assets/icons/core/account_circle_icon_filled.svg"


import EstrellaIcon from "../../assets/icon/Estrella.png";
import ComentIcon from "../../assets/icon/ComentaryIcon.png";

import PostReviewButton from "../Buttons/Actions/PostReviewButton/PostReviewButton";
import LoginButton from "../Buttons/Auth/LoginButton";
import "./NavigationMenu.css";




const NavigationMenu = () => {
	const location = useLocation();
	const { isAuthenticated, user } = useSelector((store) => store.auth);



	const links = [
    {
      icon:
        location.pathname === "/" || location.pathname === "/dashboard"
          ? HomeIconFilled
          : HomeIcon,
      label: "Home",
      link: "/",
    },
    // { icon: SearchIcon, label: "Buscar", link: "/" },
    // {
    //   icon:
    //     location.pathname === "/explorar" ? DiscoverIconFilled : DiscoverIcon,
    //   label: "Explorar",
    //   link: "/explorar",
    // },
    ...(isAuthenticated
      ? [
          {
            icon:
              user?.userAvatar ||
              (location.pathname === `/profile/user/${user?.username}`
                ? ProfileIconFilled
                : ProfileIcon),
            label: "Perfil",
            link: `/profile/user/${user?.username}`,
            username: user?.username,
          },
        ]
      : []),
  ];

	return (

		<div className="flex relative lg:flex-col w-full justify-between items-center pb-[2vh] lg:pb-[0]  lg:w-[260px] lg:max-w-64 ">
			{/* Navigation Menu */}
			<nav className="flex flex-row lg:flex-col flex-grow  items-center justify-center space-x-3 lg:space-x-0 lg:space-y-3 w-full lg:mb-4">
				{links.map((item, index) => (

					<NavLink key={index} to={item.link} className="w-[70px] lg:w-full h-[50px] flex items-center justify-center rounded-full cursor-default ">
						<div className="navbarLink absolute z-10 lg:w-[104px] text-negro-carbon flex items-center  cursor-pointer">

							{item.icon === user?.userAvatar  ? (
								<img src={item.icon} className="flex w-[24px] h-[24px] rounded-full" alt="User Profile" />
							) : (
								<item.icon src={item.icon} className=" flex w-[26px] h-[26px]" />
							)}

							{item.label === "Perfil" ?
								(
									<div className="hidden lg:flex flex-col ml-2">
										<span className="text-lg leading-none ">{item.label}</span>
										<span className=" text-grey-basic text-left text-sm font-semibold">@{user?.username}</span>
									</div>
								) : (
									<span className="hidden lg:block text-xl leading-none ml-2">{item.label}</span>
								)}

						</div>
						<div className="navbarButton w-full h-[50px] md:min-h-[50px] rounded-full"></div>

					</NavLink>
				))}
				<PostReviewButton location={location} />
			</nav>

			{!isAuthenticated ? (
				<>
					{/* Texto informativo */}
					<p className="hidden lg:block text-[12px] text-pretty text-center leading-1.2 font-normal mb-11">
						Inicia sesión para crear reseñas, seguir a creadores, dar me gusta y ver comentarios.
					</p>

					{/* Botón de iniciar sesión */}
					<LoginButton className="hidden md:flex absolute right-0 lg:relative lg:right-auto" />

					{/* Botón adicional con íconos */}
					<button className="hidden relative lg:flex items-center justify-start px-4 rounded-[4px] max-h-12 min-w-48 md:min-w-0 w-full h-[50px] bg-negro-carbon text-white mt-3.5 lg:mb-12">
						<img src={ComentIcon} alt="Coment Icon" className="w-6 h-6" />
						<p className=" lg:text-[.75rem] xl:[.875rem] text-left ml-2 leading-tight flex-1 max-w-36 font-bold">
							Califica los mejores restaurantes de tu cuidad
						</p>
						<img src={EstrellaIcon} alt="Estrella Icon" className="w-5 h-5 absolute right-2 top-2" />
					</button>
				</>
			) : (
				// Botón de "Más Opciones" si está autenticado
				<>


					<DropdownButton />


				</>
			)}


		</div>
	);
};

export default NavigationMenu;
