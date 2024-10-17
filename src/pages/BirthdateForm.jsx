import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { nextStep } from '../redux/modals/modalSlice';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';


// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  day: Yup.number()
    .required('Requerido')
    .min(1, 'Día inválido')
    .max(31, 'Día inválido'),
  month: Yup.string().required('Requerido'),
  year: Yup.number()
    .required('Requerido')
    .min(1900, 'Año inválido')
    .max(new Date().getFullYear(), 'Año inválido'),
});

const BirthdateForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    day: '',
    month: '',
    year: '',
  };

  const onSubmit = (values) => {
    console.log(values);
    dispatch(nextStep());
  };

  return (
    <div className='p-10'>
      {/* <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 h-[60%] justify-center flex items-center flex-col relative"> */}
        {/* <button
          className="absolute top-4 right-4 font-bold text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button> */}


        <h1 className="text-[30px] leading-1.2 font-bold mb-4 text-negro-carbon text-start">¿Cuál es tu fecha de nacimiento?</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className='w-full'>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div>
                  <Field
                    as="select"
                    name="day"
                    className="border rounded-md p-2 text-gray-700 w-full"
                  >
                    <option value="">Día</option>
                    {[...Array(31).keys()].map(day => (
                      <option key={day} value={day + 1}>{day + 1}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="day" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="month"
                    className="border rounded-md p-2 text-gray-700 w-full"
                  >
                    <option value="">Mes</option>
                    {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="month" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="year"
                    className="border rounded-md p-2 text-gray-700 w-full"
                  >
                    <option value="">Año</option>
                    {[...Array(100).keys()].map(year => (
                      <option key={year} value={2024 - year}>{2024 - year}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="year" component="div" className="text-red-500 text-xs" />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
                className={`w-full text-white font-semibold py-2 rounded-lg mb-4 ${isValid && dirty ? 'bg-red-500' : 'bg-gray-300'}`}
              >
                {isSubmitting ? 'Enviando...' : 'Siguiente'}
              </button>

              <div className="text-center">
                <p className="text-gray-600">¿Ya tienes cuenta? <Link to="/login" className="text-principal"> Iniciar sesión</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      {/* </div> */}
    </div>
  );
};

export default BirthdateForm;
