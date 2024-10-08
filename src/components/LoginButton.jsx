import { useDispatch } from "react-redux";
import { showModal } from "../redux/modales/modalSlice";


const LoginButton = ({ bgSolid = false }) => {
    const dispatch = useDispatch();

    const handleShowModal = () => dispatch(showModal())
    return (
        <button onClick={handleShowModal} className={bgSolid ? "bg-principal border border-principal text-principal  py-2 px-8 rounded-[4px] hover:bg-pink-100 transition-all" : "border border-principal text-principal  py-2 px-8 rounded-[4px] hover:bg-pink-100 transition-all"}>
            Iniciar Sesión
        </button>
    )
}

export default LoginButton