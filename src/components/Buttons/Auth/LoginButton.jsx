import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginButton = ({ className = "", text = "Iniciar Sesión" }) => {
    const navigate = useNavigate();

    const handleLoginNavigate = () => navigate('/login');

    return (
        <button 
            onClick={handleLoginNavigate} 
            className={`flex items-center justify-center max-h-12 min-w-48 lg:min-w-0 lg:w-full border border-principal text-principal py-[0.8125rem] md:px-3  rounded-[.25rem] hover:bg-pink-100 font-bold text-lg ${className}`} 
            aria-label="Iniciar sesión"
            type="button"
        >
            {text}
        </button>
    );
}

LoginButton.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
};

export default LoginButton;
