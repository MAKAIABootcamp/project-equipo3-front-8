import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Swal from "sweetalert2";
import { clearError, googleLoginThunk, loginWithEmailAndPassworThunk } from "../redux/auth/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk());
  };

  const handleNavigatePhoneLogin = () => navigate("/phoneLogin");

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en el inicio de sesión! Verifique sus credenciales",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }

  if (isAuthenticated) {
    Swal.fire({
      title: "¡Has iniciado sesión exitosamente!",
      text: `¡Te damos la bienvenida, ${user?.displayName}!`,
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main>
      <h1>Iniciar Sesión</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginWithEmailAndPassworThunk(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Correo electrónico:</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="ejemplo@email.com"
            />
            <ErrorMessage name="email" />

            <label htmlFor="password">Contraseña:</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su contraseña"
            />
            <ErrorMessage name="password" />

            <button type="submit" disabled={isSubmitting}>
              Iniciar sesión
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Si aún no tiene una cuenta, por favor dar click{" "}
        <Link to={"/register"}>aquí!</Link>
      </p>
      <section>
        <span>o, también puedes iniciar sesión con:</span>
        <div>
          <button onClick={handleGoogleLogin}>Iniciar sesión con google</button>
          <button onClick={handleNavigatePhoneLogin}>
            Iniciar sesión con teléfono
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
