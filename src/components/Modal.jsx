import { useDispatch } from "react-redux";
import { hiddenModal } from "../redux/modales/modalSlice";


const Modal = ({ children = null, onNavigate = null }) => {
    const dispatch = useDispatch();

    const handleModal = () => {
        if (onNavigate) {
            onNavigate()
        } else {
            dispatch(hiddenModal())
        }

    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <button
                    className="absolute  right-[480px] font-bold text-gray-500 hover:text-gray-700"
                    onClick={handleModal}
                >
                    &#10005;
                </button>
                {children ? children : null}
            </div>
        </div>
    )
}

export default Modal