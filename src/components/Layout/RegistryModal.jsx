import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  hiddenModal,
  resetStep,
  prevStep,
  setStep,
} from "../../redux/modals/modalSlice";
import BirthdateForm from "../../pages/BirthdateForm"; // Importa tu componente
import RegisterForm from "../../pages/RegisterForm"; // Importa tu componente
import RegisterMethod from "../../pages/RegisterMethod";
import FormQuestions from "../../pages/FormQuestions";
import Modal from "./Modal";

const RegistryModal = ({ step = 0 }) => {
  const [showBackbottom, setShowBackBottom] = useState(true);
  const [showCloseButton, setChowCloseButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.modal.currentStep); // Obtener el paso actual

  useEffect(() => {
    if (step === 4) {
      dispatch(setStep(4));
      setChowCloseButton(false)
    }else{
      setChowCloseButton(true);
    }
  }, [step, dispatch]);

  useEffect(() => {
    if (currentStep === 1 || currentStep === 4) {
      setShowBackBottom(false); // Esconde el botón de retroceso si el paso es 1
    } else {
      setShowBackBottom(true); // Muestra el botón de retroceso si el paso es diferente de 1
    }
  }, [currentStep]);

  // const handleModal = () =>
  const handleClose = () => {
    dispatch(hiddenModal()); // Cierra el modal correctamente
    dispatch(resetStep()); // Reinicia los pasos al cerrar el modal
    navigate("/"); // Navega de vuelta a la página principal si es necesario
  };

  // Función para retroceder un paso en el flujo de modales
  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(prevStep(currentStep - 1)); // Retrocede un paso
    } else {
      navigate(-1); // Navega hacia atrás si no hay más pasos
    }
  };

  // const handleClose = () => navigate("/");

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
    
    <Modal
      onNavigate={handleClose}
      showBack={showBackbottom}
      onBack={handleBack}
      showClose={showCloseButton}
    >
      {/* Mostrar el contenido dinámico basado en el paso */}
      {renderStepContent()}
    </Modal>
  
  );
};

// Definición de las propTypes
RegistryModal.propTypes = {
  step: PropTypes.number,
};

export default RegistryModal;
