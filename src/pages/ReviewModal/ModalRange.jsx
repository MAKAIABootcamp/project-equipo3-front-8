import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nextStep, setQuestionsData} from '../../redux/modals/modalSlice';

const ModalRange = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstQuestion: '',
      secondQuestion: '',
      thirdQuestion: '',
    },
    validationSchema: Yup.object({
      firstQuestion: Yup.string().required('Requerido'),
      secondQuestion: Yup.string().required('Requerido'),
      thirdQuestion: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      console.log('Reseña enviada:', values);

      // Guardar los valores de las preguntas en Redux
      dispatch(setQuestionsData(values));

      // Avanzar al siguiente paso del modal
      dispatch(nextStep());
    },
  });

  return (
    <div>
        <h2 className="text-lg font-semibold mb-4">Crea una nueva Reseña</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* firstQuestion */}
          <div className="mb-4">
            <label className="block mb-2">¿Cómo calificarías el firstQuestion del platillo?</label>
            <div className="flex justify-between">
              {['😡', '🙁', '😐', '🙂', '😃'].map((emoji, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="firstQuestion"
                    value={emoji}
                    onChange={formik.handleChange}
                    checked={formik.values.firstQuestion === emoji}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values.firstQuestion === emoji ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors.firstQuestion ? <div className="text-red-500 text-sm">{formik.errors.firstQuestion}</div> : null}
          </div>

          {/* Tiempo de espera */}
          <div className="mb-4">
            <label className="block mb-2">¿El tiempo de espera fue adecuado para recibir tu pedido?</label>
            <div className="flex justify-between">
              {['😡', '🙁', '😐', '🙂', '😃'].map((emoji, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="secondQuestion"
                    value={emoji}
                    onChange={formik.handleChange}
                    checked={formik.values.secondQuestion === emoji}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values.secondQuestion === emoji ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors.secondQuestion ? <div className="text-red-500 text-sm">{formik.errors.secondQuestion}</div> : null}
          </div>

          {/* Costo vs Calidad */}
          <div className="mb-4">
            <label className="block mb-2">¿El costo de la comida se ajustó a la calidad que recibiste?</label>
            <div className="flex justify-between">
              {['😡', '🙁', '😐', '🙂', '😃'].map((emoji, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="thirdQuestion"
                    value={emoji}
                    onChange={formik.handleChange}
                    checked={formik.values.thirdQuestion === emoji}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values.thirdQuestion === emoji ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors.thirdQuestion ? <div className="text-red-500 text-sm">{formik.errors.thirdQuestion}</div> : null}
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

export default ModalRange;
