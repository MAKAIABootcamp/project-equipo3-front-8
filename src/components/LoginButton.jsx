import { useNavigate } from "react-router-dom";


const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginNavigate = () => navigate('/loginOptions')
    return (
        <button onClick={handleLoginNavigate} className="border border-principal text-principal  py-2 px-8 rounded-[.25rem] hover:bg-pink-100 transition-all">
            Iniciar Sesión
        </button>
    )
}

export default LoginButton