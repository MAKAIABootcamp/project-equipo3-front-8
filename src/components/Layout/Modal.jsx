import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hiddenModal } from "../../redux/modals/modalSlice";

const Modal = ({
  children = null,
  onNavigate = null,
  showBack = false,
  onBack = null,
  showClose = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      dispatch(hiddenModal());
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        {showBack && <button className="text-gray-500 text-2xl absolute top-2 left-2 hover:text-gray-700 font-bold " onClick={handleBack}>{"<"}</button>}
        {showClose && (
          <button
            className="absolute top-4 right-4 font-bold text-gray-500 hover:text-gray-700"
            onClick={handleModal}
          >
            &#10005;
          </button>
        )}

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
  onBack: PropTypes.func,
  showClose: PropTypes.bool
};

export default Modal;
