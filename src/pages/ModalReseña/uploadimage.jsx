import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nextStep, setImage } from '../../redux/modals/modalSlice';

const uploadimage = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      photo: null,
    },
    validationSchema: Yup.object({
      photo: Yup.mixed().required('Debes subir una foto'),
    }),
    onSubmit: (values) => {
      const file = values.photo;
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImage(reader.result)); // Guarda la imagen en Redux
        dispatch(nextStep()); // Pasamos al siguiente paso del modal
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Crea una nueva Reseña</h2>

        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center mb-4">
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
                onChange={(event) => {
                  formik.setFieldValue('photo', event.currentTarget.files[0]);
                }}
                className="hidden"
              />
            </label>
            {formik.errors.photo && formik.touched.photo ? (
              <p className="text-red-500 text-sm mt-2">{formik.errors.photo}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg"
          >
            Abrir desde mi ordenador
          </button>
        </form>
      </div>
    </div>
  );
};

export default uploadimage;
