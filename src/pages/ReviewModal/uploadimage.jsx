import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nextStep, setImage } from '../../redux/modals/modalSlice';
import uploadFile from '../../services/uploadFile';

const UploadImage = () => {
  const [preview, setPreview] = useState(null); // Estado para la vista previa
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      photo: null,
    },
    validationSchema: Yup.object({
      photo: Yup.mixed().required('Debes subir una foto'),
    }),
    onSubmit: async (values) => {
      const file = values.photo;
      try {
        // Subir archivo a Cloudinary
        const response = await uploadFile(file);
        const imageUrl = response; // URL segura de la imagen subida
        console.log(imageUrl);
        // Guarda la URL en el estado de Redux o en otro lugar que necesites
        dispatch(setImage(imageUrl)); 
        dispatch(nextStep()); // Pasamos al siguiente paso del modal
      } catch (error) {
        console.error('Error subiendo la imagen:', error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('photo', file);

    // Crear una URL de vista previa utilizando FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // Guarda la vista previa en el estado
    };
    if (file) {
      reader.readAsDataURL(file); // Convertir el archivo en una URL de base64
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Crea una nueva Reseña</h2>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            {/* Vista previa de la imagen */}
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                className="mb-4 w-64 h-64 object-cover rounded-lg"
              />
            ) : (
              // Mostrar este bloque solo si no hay vista previa
              <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89-5.26a2 2 0 012.22 0L21 8M3 8v12a2 2 0 002 2h14a2 2 0 002-2V8m-18 0l9 6 9-6"
                    ></path>
                  </svg>
                  <p className="text-gray-600 mt-2">Arrastra tus fotos aquí</p>
                </div>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleImageChange} // Evento que maneja la vista previa
                  className="hidden"
                />
              </label>
            )}
            {formik.errors.photo && formik.touched.photo ? (
              <p className="text-red-500 text-sm mt-2">{formik.errors.photo}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg"
          >
            {preview ? 'Siguiente' : 'Abrir desde mi ordenador'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
