import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import uploadFile from "../services/uploadFile";
import { clearError, createAccountThunk } from "../redux/auth/authSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial")
    .required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
  photo: Yup.mixed()
    .test("fileSize", "El archivo no debe exceder los 2MB", (value) => {
      if (!value) return true; // Permitir que no se seleccione ningún archivo
      return value && value.size <= 2 * 1024 * 1024;
    })
    .required("Debes seleccionar una foto de perfil"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  if (error) {
        Swal.fire({
          title: "Oops!",
          text: "¡Ha ocurrido un error en la creación de tu cuenta!",
          icon: "error",
        }).then(()=>dispatch(clearError()))
  }

  if (isAuthenticated) {
    Swal.fire({
      title: `¡Excelente, ${user?.displayName}!`,
      text: "¡Has creado exitosamente tu cuenta!",
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main>
      <h1>Crear una cuenta</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          repeatPassword: "",
          photo: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const profileImage = await uploadFile(values.photo);
          if (profileImage) {
            values.photo = profileImage;
            dispatch(createAccountThunk(values));

          } else {
            Swal.fire({
              title: "Oops!",
              text: "¡Ha ocurrido un error en la carga de tu imagen de perfil! Intenta nuevamente.",
              icon: "error",
            });
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label htmlFor="name">Nombre completo</label>
            <Field name="name" id="name" placeholder="Whitney" type="text" />
            <ErrorMessage name="name" />

            <label htmlFor="email">Correo electrónico:</label>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="ejemplo@email.com"
            />
            <ErrorMessage name="email" />

            <label htmlFor="password">Contraseña:</label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="xxxxxx"
            />
            <ErrorMessage name="password" />

            <label htmlFor="repeatPassword">Confirmar contraseña:</label>
            <Field
              name="repeatPassword"
              id="repeatPassword"
              type="password"
              placeholder="xxxxxx"
            />
            <ErrorMessage name="repeatPassword" />

            <label htmlFor="photo">Escoja una foto de perfil</label>
            <Field name="photo">
              {() => (
                <input
                  type="file"
                  id="photo"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="photo" />

            <button disabled={isSubmitting} type="submit">
              Crear cuenta
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Si ya tiene una cuenta, por favor dar click{" "}
        <Link to={"/login"}>aqui!</Link>
      </p>
    </main>
  );
};

export default Register;
