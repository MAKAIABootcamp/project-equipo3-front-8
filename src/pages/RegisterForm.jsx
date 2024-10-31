import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../redux/modals/modalSlice";
import { createAccountThunk } from "../redux/auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"; 
import { useState } from "react"; // Importación de useState

// Esquema de validación
const validationSchema = Yup.object({
  email: Yup.string().email("Correo inválido").required("Requerido"),
  password: Yup.string()
    .min(6, "Debe tener al menos 6 caracteres")
    .required("Requerido"),
  username: Yup.string().required("Requerido"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { birthday } = useSelector((store) => store.auth);

  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values) => {
    console.log("Datos del formulario:", values);
    dispatch(createAccountThunk({ ...values, birthday }));
    dispatch(nextStep());
  };

  return (
    <div className="p-10">
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-black text-start">
              Regístrate
            </h2>

            {/* Correo electrónico */}
            <div className="space-y-1">
              <Field
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-principal text-sm"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-1 relative">
              <Field
                type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
                name="password"
                placeholder="Contraseña"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              {/* Botón del ojo */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1l22 22" />
                    <path d="M9.51 9.51a5 5 0 0 0 5.98 5.98M12 19c-7.73 0-10-7-10-7a16.29 16.29 0 0 1 2.51-3.51M17.73 17.73A16.29 16.29 0 0 0 22 12S19.73 5 12 5a9.77 9.77 0 0 0-4.73 1.27" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12S4.27 5 12 5s10 7 10 7-2.27 7-10 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Nombre de usuario */}
            <div className="space-y-1">
              <Field
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* CheckBox */}
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="newsletter"
                className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Recibe contenido popular, boletines, promociones, sugerencias y
                novedades por correo electrónico
              </label>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              className={`w-full py-3 font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                !dirty || !isValid || isSubmitting
                  ? "bg-blanco-marino text-grey-basic cursor-not-allowed"
                  : "bg-principal text-blanco-puro hover:bg-principal"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Iniciar sesión"}
            </button>

            {/* Link para iniciar sesión */}
            <p className="text-center text-sm mt-4 text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Iniciar sesión
              </Link>
            </p>

            {/* Términos y políticas */}
            <p className="text-center text-xs mt-2 text-gray-500">
              Al registrarme acepto los{" "}
              <Link to="/terms" className="text-gray-700 hover:underline">
                Términos del servicio
              </Link>{" "}
              y la{" "}
              <Link to="/privacy" className="text-gray-700 hover:underline">
                Política de privacidad
              </Link>
              .
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
