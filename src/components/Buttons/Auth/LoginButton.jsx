import { useNavigate } from "react-router-dom";


const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginNavigate = () => navigate('/login')
    return (
        <button onClick={handleLoginNavigate} className="border border-principal text-principal  py-2 px-8 rounded-[.25rem] hover:bg-pink-100 transition-all w-full" aria-label="Iniciar sesión">
            Iniciar Sesión
        </button>
    )
}

export default LoginButton