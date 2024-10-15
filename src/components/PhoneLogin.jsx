import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { hiddenModal } from "../../../redux/modales/modalSlice";
import { Link } from "react-router-dom";

const PhoneLogin = () => {
  const [verificationId, setVerificationId] = useState(null);
  const dispatch = useDispatch();

  // Configura el reCAPTCHA antes de enviar el código
  const setUpRecaptcha = () => {
    const auth = getAuth();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA resuelto");
          },
        },
        auth
      );
    }
  };

  // Validación de Yup
  const validationSchemaPhone = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("El número de teléfono es obligatorio")
      .matches(/^\+\d{1,15}$/, "Formato inválido. Ej: +57123456789"),
  });

  const validationSchemaCode = Yup.object().shape({
    verificationCode: Yup.string()
      .required("El código de verificación es obligatorio")
      .length(6, "El código debe tener 6 dígitos"),
  });

  // Enviar código de verificación
  const sendVerificationCode = async (values) => {
    setUpRecaptcha();
    const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        values.phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      alert("Código de verificación enviado");
    } catch (error) {
      console.error("Error enviando código de verificación: ", error);
    }
  };

  // Verificar código de verificación
  const verifyCode = async (values) => {
    const auth = getAuth();
    const credential = PhoneAuthProvider.credential(
      verificationId,
      values.verificationCode
    );

    try {
      await signInWithCredential(auth, credential);
      alert("Número de teléfono verificado");
      dispatch(hiddenModal()); // Cierra el modal al iniciar sesión correctamente
    } catch (error) {
      console.error("Error verificando el código: ", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión con teléfono</h2>

      {/* Formulario condicional basado en el estado de verificationId */}
      {!verificationId ? (
        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={validationSchemaPhone}
          onSubmit={sendVerificationCode}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Número de teléfono"
                  className="w-full p-2 mb-2 bg-blanco-marino border rounded"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-center font-goldplay"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-principal text-blanco-puro p-2 font-goldplay rounded"
              >
                Enviar código de verificación
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ verificationCode: "" }}
          validationSchema={validationSchemaCode}
          onSubmit={verifyCode}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="verificationCode"
                  placeholder="Código de verificación"
                  className="w-full p-2 mb-2 bg-blanco-artico border rounded"
                />
                <ErrorMessage
                  name="verificationCode"
                  component="div"
                  className="text-red-500 text-center font-goldplay"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-principal text-blanco-puro p-2 rounded"
              >
                Verificar código
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Div necesario para el reCAPTCHA */}
      <div id="recaptcha-container"></div>

      {/* Link de registro */}
      <span className="text-grey-dim m-2 items-center flex flex-col ">
        ¿No tienes cuenta?{" "}
        <Link
          className="text-blanco-puro bg-principal items-center text-center rounded-lg p-2 w-32"
          to={"/register"}
        >
          Regístrate
        </Link>
      </span>
      {/* </div> */}
    </div>
  );
};

export default PhoneLogin;

