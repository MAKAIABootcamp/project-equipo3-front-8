import {  useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { showModal, hiddenModal } from "../redux/modales/modalSlice"
import Modal from "../components/Modal"
import EmailLoginChildren from "../components/EmailLoginChildren"
import PhoneLogin from "../components/PhoneLogin"

const SignIn = ({isPhone=false}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    dispatch(showModal());
  }, [])

  const handleClose = () => {
    dispatch(hiddenModal())
    navigate("/");
  }

  return (
    <Modal children={isPhone ? <PhoneLogin /> : <EmailLoginChildren />} onNavigate={handleClose} />
  )
}

export default SignIn