import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hiddenModal } from "../../redux/modales/modalSlice";

const Modal = ({ children = null, onNavigate = null, showBack = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      dispatch(hiddenModal());
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        {showBack && <button onClick={() => navigate(-1)}>{"<"}</button>}
        <button
          className="fixed flex rigth-[500px] font-bold text-gray-500 hover:text-gray-700"
          onClick={handleModal}
        >
          &#10005;
        </button>
        {children ? children : null}
      </div>
    </div>
  );
};


// Definición de las propTypes
Modal.propTypes = {
  children: PropTypes.node,
  onNavigate: PropTypes.func,
  showBack: PropTypes.bool,
};



export default Modal;