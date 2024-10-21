import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nextStep, setImage } from '../../redux/modals/modalSlice';

const RangoModal = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      sabor: '',
      tiempoEspera: '',
      costoCalidad: '',
    },
    validationSchema: Yup.object({
      sabor: Yup.string().required('Requerido'),
      tiempoEspera: Yup.string().required('Requerido'),
      costoCalidad: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      console.log('Reseña enviada:', values);
      dispatch(nextStep()); // Pasamos al siguiente paso del modal
    },
  });

  return (
    <div>
        <h2 className="text-lg font-semibold mb-4">Crea una nueva Reseña</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Sabor */}
          <div className="mb-4">
            <label className="block mb-2">¿Cómo calificarías el sabor del platillo?</label>
            <div className="flex justify-between">
              {['😡', '🙁', '😐', '🙂', '😃'].map((emoji, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="sabor"
                    value={emoji}
                    onChange={formik.handleChange}
                    checked={formik.values.sabor === emoji}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values.sabor === emoji ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors.sabor ? <div className="text-red-500 text-sm">{formik.errors.sabor}</div> : null}
          </div>

          {/* Tiempo de espera */}
          <div className="mb-4">
            <label className="block mb-2">¿El tiempo de espera fue adecuado para recibir tu pedido?</label>
            <div className="flex justify-between">
              {['😡', '🙁', '😐', '🙂', '😃'].map((emoji, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="tiempoEspera"
                    value={emoji}
                    onChange={formik.handleChange}
                    checked={formik.values.tiempoEspera === emoji}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values.tiempoEspera === emoji ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors.tiempoEspera ? <div className="text-red-500 text-sm">{formik.errors.tiempoEspera}</div> : null}
          </div>

          {/* Costo vs Calidad */}
          <div className="mb-4">
            <label className="block mb-2">¿El costo de la comida se ajustó a la calidad que recibiste?</label>
            <div className="flex justify-between">
              {['😡', '🙁', '😐', '🙂', '😃'].map((emoji, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="costoCalidad"
                    value={emoji}
                    onChange={formik.handleChange}
                    checked={formik.values.costoCalidad === emoji}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values.costoCalidad === emoji ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors.costoCalidad ? <div className="text-red-500 text-sm">{formik.errors.costoCalidad}</div> : null}
          </div>

          {/* Botones */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Siguiente
            </button>
          </div>
        </form>
    </div>
  );
};

export default RangoModal;
