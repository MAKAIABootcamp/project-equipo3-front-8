import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nextStep } from '../../redux/modals/modalSlice';

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    placeName: Yup.string().required('El nombre del lugar es requerido'),
    placeAddress: Yup.string().required('La dirección del lugar es requerida'),
  });

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
        </div>
        <h2 className="text-lg font-medium mb-4">Agrega un nuevo lugar.</h2>
        <Formik
          initialValues={{ placeName: '', placeAddress: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            dispatch(nextStep());
          }}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="mb-4">
                <Field
                  name="placeName"
                  placeholder="Nombre del lugar"
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.placeName && touched.placeName ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="placeName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  name="placeAddress"
                  placeholder="Dirección del lugar"
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.placeAddress && touched.placeAddress ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="placeAddress"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              
              {/* Botón que se activa solo cuando el formulario es válido y está modificado */}
              <button
                type="submit"
                className={`w-full py-2 rounded-lg transition duration-300 ${
                  isValid && dirty
                    ? 'bg-principal text-white cursor-pointer hover:bg-principal'
                    : 'bg-blanco-marino text-grey-basic cursor-not-allowed'
                }`}
                disabled={!isValid || !dirty || isSubmitting}  // Solo habilitado si es válido y modificado
              >
                {isSubmitting ? 'Enviando...' : 'Agregar'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRestaurant;
