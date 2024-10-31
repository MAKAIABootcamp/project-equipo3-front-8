import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nextStep, } from '../../redux/modals/modalSlice';
import { setNewPost } from '../../redux/post/postSlice';


const ModalRange = () => {
  const dispatch = useDispatch();
  
  const questions = [
    {
      label: '¿Cómo calificarías el sabor del platillo?',
      name: 'firstQuestion',
      options: [
        { emoji: '😡', value: 1 },
        { emoji: '🙁', value: 2 },
        { emoji: '😐', value: 3 },
        { emoji: '🙂', value: 4 },
        { emoji: '😃', value: 5 },
      ],
    },
    {
      label: '¿El tiempo de espera fue adecuado para recibir tu pedido?',
      name: 'secondQuestion',
      options: [
        { emoji: '😡', value: 1 },
        { emoji: '🙁', value: 2 },
        { emoji: '😐', value: 3 },
        { emoji: '🙂', value: 4 },
        { emoji: '😃', value: 5 },
      ],
    },
    {
      label: '¿El costo de la comida se ajustó a la calidad que recibiste?',
      name: 'thirdQuestion',
      options: [
        { emoji: '😡', value: 1 },
        { emoji: '🙁', value: 2 },
        { emoji: '😐', value: 3 },
        { emoji: '🙂', value: 4 },
        { emoji: '😃', value: 5 },
      ],
    },
  ];

  const formik = useFormik({
    initialValues: {
      firstQuestion: "",
      secondQuestion: "",
      thirdQuestion: "",
    },
    validationSchema: Yup.object({
      firstQuestion: Yup.number().required("Requerido"),
      secondQuestion: Yup.number().required("Requerido"),
      thirdQuestion: Yup.number().required("Requerido"),
    }),
    onSubmit: (values) => {
      console.log("Reseña enviada:", values);
      dispatch(setNewPost({ questions: values }));
      dispatch(nextStep());
    },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Crea una nueva Reseña</h2>
      <form onSubmit={formik.handleSubmit}>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <label className="block mb-2">{question.label}</label>
            <div className="flex justify-between">
              {question.options.map(({ emoji, value }, eIndex) => (
                <label key={eIndex}>
                  <input
                    type="radio"
                    name={question.name}
                    value={value}
                    onChange={formik.handleChange}
                    checked={formik.values[question.name] === value}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-2xl ${
                      formik.values[question.name] === value ? 'text-purple-500' : ''
                    }`}
                  >
                    {emoji}
                  </span>
                </label>
              ))}
            </div>
            {formik.errors[question.name] ? (
              <div className="text-red-500 text-sm">{formik.errors[question.name]}</div>
            ) : null}
          </div>
        ))}
        <div className="flex justify-end">
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalRange;
