import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hiddenModal, nextStep, prevStep } from "../../redux/modals/modalSlice";
import BirthdateForm from '../../pages/BirthdateForm'; // Importa tu componente
import RegisterForm from "../../pages/RegisterForm"; // Importa tu componente
import RegisterMethod from '../../pages/RegisterMethod';
import FormQuestions from '../../pages/FormQuestions';


const ModalRegistro = ({ onNavigate = null, showBack = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.modal.currentStep); // Obtener el paso actual

  const handleModal = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      dispatch(hiddenModal());
      dispatch(resetStep());
      
    }
  };

  // Contenido dinámico basado en el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <RegisterMethod />;
      case 2:
        return <BirthdateForm />;
      case 3:
        return <RegisterForm />;
      case 4:
        return <FormQuestions />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        {showBack && <button onClick={() => navigate(-1)}>{"<"}</button>}
        <button
          className="absolute  right-[480px] font-bold text-gray-500 hover:text-gray-700"
          onClick={handleModal}
        >
          &#10005;
        </button>
        {/* Mostrar el contenido dinámico basado en el paso */}
        {renderStepContent()}
      </div>
    </div>
  );
};

// Definición de las propTypes
ModalRegistro.propTypes = {
  children: PropTypes.node,
  onNavigate: PropTypes.func,
  showBack: PropTypes.bool,
};

export default ModalRegistro;

