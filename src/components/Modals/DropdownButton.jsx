import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/authSlice"; // Ajusta la ruta según tu estructura de carpetas
import BurguerIco from "../../assets/icons/core/more_options_menu_icon.svg";
import LogoutIcon from "../../assets/icons/core/logout_icon.svg";
import SettingIcon from "../../assets/icons/core/settings_icon.svg";
import { useNavigate } from "react-router-dom"; // Hook para navegación

import "../Navigation/NavigationMenu.css";

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogout = () => {
        dispatch(logoutThunk()); // Despacha la acción de logout
        setIsOpen(false); // Cierra el menú después de hacer logout
        navigate('/'); // Redirige a la página de inicio
    };

    // Nueva función para manejar la redirección a configuración
    const handleSettings = () => {
        setIsOpen(false); // Cierra el menú
        navigate('/setting'); // Redirige a la página de configuración
    };

    const submenuOptions = [
        { 
            icon: SettingIcon, 
            label: "Configuración", 
            action: handleSettings // Asigna la acción de redirección
        },
        {
            icon: LogoutIcon,
            label: "Cerrar sesión",
            action: handleLogout, // Llama a handleLogout
        },
    ];

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div 
            className="relative min-w-[50px] lg:w-full h-[50px] lg:mt-auto items-center justify-center rounded-full cursor-default" 
            ref={dropdownRef}
        >
            <div className="flex min-w-[50px] lg:w-full h-[50px] lg:mt-auto items-center justify-center rounded-full cursor-default">
                <button
                    onClick={toggleDropdown}
                    className="navbarLink absolute z-10 flex items-center justify-center px-4 py-2 text-grey-dim rounded-md focus:outline-none "
                >
                    <BurguerIco className=" w-[24px] h-[24px]" />
                    <span className="hidden lg:block text-xl ml-2">Más</span>
                </button>

                <div className={`navbarButton w-full h-[50px] rounded-full ${isOpen ? 'active' : ''}`}></div>
            </div>

            {isOpen && (
                <div className="absolute bottom-full right-0 mb-4 lg:mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
                    <ul className="py-1">
                        {submenuOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={option.action} // Llama a la acción asignada (handleSettings o handleLogout)
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                            >
                                <option.icon className="w-5 h-5 mr-2" />
                                <span className="text-gray-800">{option.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
