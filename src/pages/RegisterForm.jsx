import React from 'react';
import { useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../redux/modales/modalSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';  // Importación de Link

const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Requerido'),
    password: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
    username: Yup.string().required('Requerido'),
});

const RegisterForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log('Datos del formulario:', values);
        dispatch(nextStep());
    };

    return (
        <div className='p-10'>
            {/* // <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10 backdrop-blur-sm">
        //     <div className="bg-white p-10 rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3 h-[60%] relative"> */}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    username: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form className="space-y-4">
                        {/* Título */}
                        <h2 className="text-3xl font-bold mb-4 text-black text-start">Regístrate</h2>

                        {/* Correo electrónico */}
                        <div className="space-y-1">
                            <Field
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-1 relative">
                            <Field
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <i className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">👁️</i>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Nombre de usuario */}
                        <div className="space-y-1">
                            <Field
                                type="text"
                                name="username"
                                placeholder="Nombre de usuario"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* CheckBox */}
                        <div className="flex items-start">
                            <Field
                                type="checkbox"
                                name="newsletter"
                                className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Recibe contenido popular, boletines, promociones, sugerencias y novedades por correo electrónico
                            </label>
                        </div>

                        {/* Botón de envío */}
                        <button
                            type="submit"
                            disabled={!dirty || !isValid || isSubmitting}
                            className={`w-full py-3 font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 
                                    ${(!dirty || !isValid || isSubmitting) ? 'bg-blanco-marino text-grey-basic cursor-not-allowed' : 'bg-principal text-blanco-puro hover:bg-principal'}`}
                        >
                            {isSubmitting ? 'Enviando...' : 'Iniciar sesión'}
                        </button>

                        {/* Link para iniciar sesión */}
                        <p className="text-center text-sm mt-4 text-gray-600">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="text-red-500 hover:underline">
                                Iniciar sesión
                            </Link>
                        </p>

                        {/* Términos y políticas */}
                        <p className="text-center text-xs mt-2 text-gray-500">
                            Al registrarme acepto los{' '}
                            <Link to="/terms" className="text-gray-700 hover:underline">
                                Términos del servicio
                            </Link>{' '}
                            y la{' '}
                            <Link to="/privacy" className="text-gray-700 hover:underline">
                                Política de privacidad
                            </Link>.
                        </p>
                    </Form>
                )}
            </Formik>
            {/* </div>
        </div> */}
        </div>
    );
};

export default RegisterForm;
