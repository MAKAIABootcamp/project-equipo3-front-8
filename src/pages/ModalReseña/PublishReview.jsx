import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from 'react-redux';
import TagModal from "./TagModal";

const ReviewSchema = Yup.object().shape({
  review: Yup.string()
    .max(200, 'Máximo 200 caracteres')
    .required('Este campo es requerido'),
});

const PublishReview = ({ user }) => {
  const [tagsSelected, setTagsSelected] = useState([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false); // Controla la visibilidad del modal

  // Selecciona la imagen cargada desde el estado de Redux
  const uploadedImage = useSelector((state) => state.modal.image);

  const handleTagSelection = (selectedTags) => {
    setTagsSelected(selectedTags);
    setIsTagModalOpen(false);  // Cierra el modal después de seleccionar
  };

  const handleSubmit = (values) => {
    console.log('Reseña enviada:', values);
    console.log('Tags seleccionados:', tagsSelected);
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
          <img
            src={uploadedImage || '/default-image.png'}
            alt="Review visual"
            className="rounded-lg w-[350px] h-[350px] object-cover"
          />
        </div>

        {/* Formulario (derecha) */}
        <div className="w-1/2 pl-6">
          <Formik
            initialValues={{ review: '' }}
            validationSchema={ReviewSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched,values }) => (
              <Form>
                {/* Imagen y nombre de usuario */}
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-gray-300 w-10 h-10 overflow-hidden mr-3">
                    <img
                      src={user?.image || '/default-user.png'}
                      alt={user?.name || 'Username'}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-semibold">{user?.name || 'Username'}</span>
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
                  {tagsSelected.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      className="border px-4 py-2 rounded-full bg-purple-500 text-white"
                    >
                      {tag}
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
      {isTagModalOpen && <TagModal onClose={handleTagSelection} selectedTags={tagsSelected} />}
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
