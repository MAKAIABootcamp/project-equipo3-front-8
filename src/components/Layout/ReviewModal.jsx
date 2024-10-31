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
import ModalRange from "../../pages/ReviewModal/ModalRange";
import PublishReview from "../../pages/ReviewModal/PublishReview";
import CreateNewReview from "../../pages/ReviewModal/CreateNewReview";
import AddRestaurant from "../../pages/ReviewModal/AddRestaurant";
import Modal from "./Modal";

const ReviewModal = ({ step = 0 }) => {
  const [showBackbottom, setShowBackBottom] = useState(true);
  const [showCloseButton, setChowCloseButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.modal.currentStep); // Obtener el paso actual


    // Mapa de pasos
    const stepMap = {
      1: { next: 3, prev: null },
      2: { next: 1, prev: 1 },
      3: { next: 3, prev: 1 }, // Salto a paso 1 si se retrocede desde aquí
      4: { next: 4, prev: 3 },
      // 5: { next: null, prev: 4 },
    };

  useEffect(() => {
    if (step === 4) {
      dispatch(setStep(4));
      setChowCloseButton(false)
    }else{
      setChowCloseButton(true);
    }
  }, [step, dispatch]);

  useEffect(() => {
    if (currentStep === 1) {
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
 // Función para retroceder un paso en el flujo de modales
 const handleBack = () => {
  const current = stepMap[currentStep];
  
  if (current) {
    if (current.prev) {
      dispatch(setStep(current.prev)); // Ir al paso anterior
    } else {
      handleClose(); // Cerrar modal si no hay paso anterior
    }
  }
};
  // const handleClose = () => navigate("/");

  // Contenido dinámico basado en el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CreateNewReview />;
      case 2:
        return <AddRestaurant/>;
      // case 3:
      //   return <Uploadimage />;
      case 3:
        return <ModalRange />;
      case 4:
        return <PublishReview />;
      default:
        return null;
    }
  };

  return (
    // <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
    //   <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
    //     {showBack && <button onClick={() => navigate(-1)}>{"<"}</button>}
    //     <button
    //       className="absolute top-4 right-4 font-bold text-gray-500 hover:text-gray-700"
    //       onClick={handleModal}
    //     >
    //       &#10005;
    //     </button>
    <Modal
      onNavigate={handleClose}
      showBack={showBackbottom}
      onBack={handleBack}
      showClose={showCloseButton}
    >
      {/* Mostrar el contenido dinámico basado en el paso */}
      {renderStepContent()}
    </Modal>
    //   </div>
    // </div>
  );
};

// Definición de las propTypes
ReviewModal.propTypes = {
  step: PropTypes.number,
};

export default ReviewModal;
