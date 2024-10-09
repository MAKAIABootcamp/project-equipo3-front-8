import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, hiddenModal } from "../redux/modales/modalSlice";
import Modal from "../components/Modal";
import SignInMethod from "../components/signInMethod";


const LoginOption = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showModal())
  }, [])

  const handleClose = () => {
    dispatch(hiddenModal())
    navigate(-1);

  }

  return (
    <Modal children={<SignInMethod />} onNavigate={handleClose} />
  )
}

export default LoginOption