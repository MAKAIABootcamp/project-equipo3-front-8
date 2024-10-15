import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
    const navigate = useNavigate();
    const handleRegisterNavigate = () => navigate('/register')
    return (
        <button onClick={handleRegisterNavigate} className="bg-principal text-white py-2 px-8 rounded-[4px] hover:bg-pink-600 transition-all" aria-label="Registrarme">
            Registrarme
        </button>
    )
}

export default RegisterButton