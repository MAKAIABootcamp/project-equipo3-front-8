import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const FormQuestions = () => {
  const navigate = useNavigate();

  // Definir las preguntas y opciones
  const questions = [
    {
      title: "¿Qué tan seguido te das una escapadita a comer al mes?",
      options: [
        "1 vez al mes",
        "2-3 veces al mes",
        "Una vez por semana",
        "Más de una vez por semana"
      ]
    },
    {
      title: "¿Qué tipo de comida prefieres cuando sales a comer?",
      options: [
        "Comida rápida",
        "Comida saludable",
        "Restaurantes de lujo",
        "Comida tradicional"
      ]
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Controlamos cuando llegamos a la última pregunta
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleNext = (values, { setFieldValue }) => {
    if (isLastQuestion) {
      // Si es la última pregunta, redirigimos o finalizamos el flujo
      console.log("Respuestas finales:", values);
      navigate("/"); // Cambia esta ruta según el flujo de tu aplicación
    } else {
      // Si no es la última, pasamos a la siguiente pregunta
      setCurrentQuestion(currentQuestion + 1);
      // Resetear el valor de answer a vacío
      setFieldValue("answer", "");
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 h-[60%] justify-center flex items-center">
        <Formik
          initialValues={{ answer: "" }}
          onSubmit={handleNext}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Título de la pregunta */}
              <h1 className="text-2xl font-bold font-goldplay text-gray-800 mb-6 text-center">
                {questions[currentQuestion].title}
              </h1>

              {/* Selector de opciones */}
              <div className="flex flex-col text-center">

                <Field
                  as="select"
                  name="answer"
                  id="answer"
                  value={values.answer}
                  onChange={(e) => setFieldValue("answer", e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 bg-blanco-marino text-grey-basic focus:outline-none focus:ring-2 focus:ring-Blue focus:border-pink-400 text-center"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {questions[currentQuestion].options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </div>

              {/* Botón de siguiente */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!values.answer}
                  className={`w-full px-6 py-2 font-bold rounded-lg shadow-md transition-colors duration-300 
                    ${!values.answer
                      ? "bg-blanco-marino text-grey-basic opacity-50 cursor-not-allowed"
                      : "bg-principal text-blanco-puro hover:bg-principal"
                    }`}
                >
                  {isLastQuestion ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormQuestions;
