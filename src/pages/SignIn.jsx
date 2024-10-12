import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, hiddenModal } from "../redux/modales/modalSlice";
import Modal from "../components/Layout/Modal";
import EmailLoginChildren from "../components/Authentication/Login/EmailLoginChildren";
import PhoneLogin from "../components/Authentication/Login/PhoneLogin";

const SignIn = ({ isPhone = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showModal());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(hiddenModal());
    navigate("/");
  };

  return (
    <Modal onNavigate={handleClose} showBack={true}>
      {isPhone ? <PhoneLogin /> : <EmailLoginChildren />}
    </Modal>
  );
};

export default SignIn;
