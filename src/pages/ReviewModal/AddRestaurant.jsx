import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nextStep } from "../../redux/modals/modalSlice";
import { createRestaurantOnReview } from "../../redux/restaurants/restaurantSlice"; // Importa tu acción para crear un restaurante
import { setNewPost } from "../../redux/post/postSlice";

const AddRestaurant = () => {
  const dispatch = useDispatch();

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    restaurantName: Yup.string()
      .required("El nombre del restaurante es requerido")
      .min(3, "El nombre del restaurante debe tener al menos 3 caracteres"),
    address: Yup.string()
      .required("La dirección es requerida")
      .min(5, "La dirección debe tener al menos 5 caracteres"),
    city: Yup.string()
      .required("La ciudad es requerida")
      .min(2, "La ciudad debe tener al menos 2 caracteres"), // Campo de ciudad
  });

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Agrega un nuevo restaurante</h2>
      <Formik
        initialValues={{ restaurantName: "", address: "", city: "" }} // Cambia los nombres para que coincidan con los del slice
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
          try {
            // Convierte los valores a minúsculas para guardarlos en Firestore
            const formattedValues = {
              restaurantName: values.restaurantName.toLowerCase(),
              address: values.address.toLowerCase(),
              city: values.city.toLowerCase(),
            };

            console.log(formattedValues);
            // Despacha la acción para crear el restaurante
            const resultAction = await dispatch(
              createRestaurantOnReview(formattedValues)
            );

            if (createRestaurantOnReview.fulfilled.match(resultAction)) {
              // Solo avanza al siguiente paso si el restaurante se crea correctamente
              // console.log(resultAction);
              setNewPost({ restaurantId: resultAction.payload.id });
              dispatch(nextStep());
              // Resetea el formulario tras enviar los datos exitosamente
              resetForm();
            } else {
              // Si ocurre un error, muestra el mensaje correspondiente
              setErrors({
                restaurantName:
                  resultAction.payload || "Error al crear el restaurante",
              });
            }
          } catch (error) {
            console.error("Error al crear el restaurante:", error);
            setErrors({
              restaurantName: "Error inesperado al crear el restaurante.",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className="flex flex-col">
            {/* Campo para el nombre del restaurante */}
            <div className="mb-4">
              <Field
                name="restaurantName"
                placeholder="Nombre del restaurante"
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.restaurantName && touched.restaurantName
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="restaurantName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Campo para la dirección */}
            <div className="mb-4">
              <Field
                name="address"
                placeholder="Dirección"
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.address && touched.address ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Campo para la ciudad */}
            <div className="mb-4">
              <Field
                name="city"
                placeholder="Ciudad"
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.city && touched.city ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-300 ${
                isValid && dirty
                  ? "bg-principal text-white cursor-pointer hover:bg-principal"
                  : "bg-blanco-marino text-grey-basic cursor-not-allowed"
              }`}
              disabled={!isValid || !dirty || isSubmitting} // Solo habilitado si es válido y modificado
            >
              {isSubmitting ? "Enviando..." : "Agregar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRestaurant;
