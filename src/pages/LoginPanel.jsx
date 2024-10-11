import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, hiddenModal } from "../redux/modales/modalSlice";
import Modal from "../components/Layout/Modal";
import SignInMethod from "../components/Authentication/SignInMethod";


const LoginPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hiddenModal())
    navigate(-1);

  }

  return (
    <Modal onNavigate={handleClose}>
      <SignInMethod />
    </Modal>
  );
}

export default LoginPanel