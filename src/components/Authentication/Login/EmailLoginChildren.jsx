import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginWithEmailAndPasswordThunk } from "../../../redux/auth/authSlice";
import * as Yup from "yup";

const EmailLoginChildren = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Ingrese un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (values) => {
      dispatch(loginWithEmailAndPasswordThunk(values));
    },
  });
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-4">Iniciar sesión </h1>
      <p className="text-gray-500 m-2">
        Correo electrónico o Nombre de usuario
      </p>
    
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          className="w-full p-2 mb-2 border rounded bg-blanco-marino "
          placeholder="Correo electrónico o usuario"
          {...formik.getFieldProps("email")}
         
          required
        />
        {formik.touched.email && formik.errors.email && (
          <span>{formik.errors.email}</span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-2 mb-4 border rounded bg-blanco-marino "
          placeholder="Contraseña"
          {...formik.getFieldProps("password")}
          required
        />
        {/* Botón "ojito" */}
        <button
          type="button"
          className="absolute right-12 mt-3 justify-center items-center text-gray-500 hover:text-gray-700"
          onClick={togglePasswordVisibility}
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
        {formik.touched.password && formik.errors.password && (
          <span>{formik.errors.password}</span>
        )}
        <span className=" flex m-2 items-center justify-center text-center text-gray-500">
          ¿Olvidaste tu contraseña?
        </span>
        <button
          type="submit"
          className="w-full bg-principal text-blanco-puro p-2 rounded"
        >
          Iniciar sesión
        </button>
        <span className="justify-center items-center text-center text-gray-500 m-4 flex ">
          ¿No tienes cuenta?
          <Link to={""} className="text-principal m-2 ">
            Registrarte
          </Link>
        </span>
      </form>
    </div>
  );
};

export default EmailLoginChildren;
