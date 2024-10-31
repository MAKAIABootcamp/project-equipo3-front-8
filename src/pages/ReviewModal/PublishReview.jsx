import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TagModal from "./TagModal";
import { createPostThunk, clearNewPost } from "../../redux/post/postSlice";
import uploadFile from "../../services/uploadFile";
import UploadImage from "./uploadimage";
import { hiddenModal, resetStep } from "../../redux/modals/modalSlice";
import { useNavigate } from "react-router-dom";

const ReviewSchema = Yup.object().shape({
  review: Yup.string()
    .max(200, "Máximo 200 caracteres")
    .required("Este campo es requerido"),
});

const PublishReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tagsSelected, setTagsSelected] = useState([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false); // Controla la visibilidad del modal
  const [image, setImage] = useState(null);
  const { user } = useSelector((store) => store.auth); // Obtener datos del usuario desde el estado
  const { newPost } = useSelector((state) => state.posts);

  console.log(newPost);

  const handleTagSelection = (selectedTags) => {
    setTagsSelected(selectedTags);
    setIsTagModalOpen(false); // Cierra el modal después de seleccionar
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (values) => {
    try {
      const restaurantId = sessionStorage.getItem("restaurantId") || "";
      const imageUrl = image ? await uploadFile(image) : ""; // Asegúrate de tener la referencia a `imageFile`
      const post = {
        ...newPost,
        postImage: imageUrl,
        description: values.review,
        tags: tagsSelected || [],
      };
      if (restaurantId) {
        post.restaurantId = restaurantId;
      }

      // Crear el post en el servidor
      dispatch(createPostThunk(post));
      sessionStorage.removeItem("restaurantId");
      navigate(-1);

      // Limpiar el estado de la publicación
      dispatch(clearNewPost());
      dispatch(resetStep());

      // Limpiar estados locales también
      setTagsSelected([]);
      setImage(null);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return; // Termina la ejecución si hay error en la subida
    }
  };

  return (
    <div className="p-2">
      {/* título */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-xl font-semibold">Crea una nueva Reseña</h2>
      </div>

      <div className="flex">
        {/* Imagen cargada o de ejemplo (izquierda) */}
        <div className="w-1/2 flex justify-center items-center">
          <UploadImage setImage={setImage} />
          {/* <img
            src={uploadedImage || '/default-image.png'}
            alt="Review visual"
            className="rounded-lg w-[350px] h-[350px] object-cover"
          /> */}
        </div>

        {/* Formulario (derecha) */}
        <div className="w-1/2 pl-6">
          <Formik
            initialValues={{ review: "" }}
            validationSchema={ReviewSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                {/* Imagen y nombre de usuario */}
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-gray-300 w-10 h-10 overflow-hidden mr-3">
                    <img
                      src={user?.userAvatar || "/default-image.png"} // Imagen del usuario
                      alt={user?.displayName || "Usuario"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-semibold">
                    {user?.displayName || "Username"}
                  </span>
                </div>

                {/* Campo de reseña */}
                <div className="mb-4">
                  <Field
                    as="textarea"
                    name="review"
                    placeholder="Texto de Ejemplo"
                    className="w-full border border-gray-300 rounded-lg p-4 resize-none h-40"
                  />
                  {errors.review && touched.review ? (
                    <div className="text-red-500 text-sm">{errors.review}</div>
                  ) : null}
                  {/* Actualización dinámica del contador de caracteres */}
                  <div className="text-right text-gray-400 text-sm">
                    {values.review.length} / 200
                  </div>
                </div>

                {/* Botón para agregar tags */}
                <div className="mb-4">
                  <button
                    type="button"
                    className="border border-purple-500 text-purple-500 rounded-lg px-4 py-2 hover:bg-purple-100"
                    onClick={() => setIsTagModalOpen(true)}
                  >
                    Agrega un Tag!!!
                  </button>
                </div>

                {/* Mostrar tags seleccionados como botones */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tagsSelected.map((tagObject, index) => (
                    <button
                      key={index}
                      type="button"
                      className="border px-4 py-2 rounded-full bg-purple-500 text-white"
                      title={`Valor: ${tagObject.value}, Categoría: ${tagObject.category}`} // Tooltip para mostrar info adicional
                    >
                      {tagObject.tag}
                    </button>
                  ))}
                </div>

                {/* Botón de publicar */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-principal text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600"
                  >
                    Publicar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Modal de Tags */}
      {isTagModalOpen && (
        <TagModal onClose={handleTagSelection} selectedTags={tagsSelected} />
      )}
    </div>
  );
};

PublishReview.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default PublishReview;
