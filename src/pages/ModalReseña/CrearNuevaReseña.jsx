import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { nextStep } from '../../redux/modals/modalSlice';

// Lista simulada de restaurantes
const RESTAURANTS = [
    { name: "Restaurant 1", location: "Barranquilla" },
    { name: "Restaurant 2", location: "Barranquilla" },
    { name: "Restaurant 3", location: "Barranquilla" },
];

const CrearNuevaReseña = () => {
    const dispatch = useDispatch();
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    
    const handleSearch = (value) => {
        const filtered = RESTAURANTS.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRestaurants(filtered);
    };

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        searchTerm: Yup.string()
            .required('Este campo es obligatorio')
            .min(2, 'Debe tener al menos 2 caracteres')
    });

    return (
        <div>
            <h2 className="text-center text-xl font-semibold mb-4">Crea una nueva Reseña</h2>

            <Formik
                initialValues={{ searchTerm: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Formulario enviado:', values);
                    dispatch(nextStep()); // Pasamos al siguiente paso del modal
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <div className="relative">
                            {/* Contenedor para el Field y el botón */}
                            <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 focus-within:border-blue-500">
                                <Field
                                    name="searchTerm"
                                    type="text"
                                    placeholder="Buscar un restaurante"
                                    className="w-full focus:outline-none"
                                    onKeyUp={(e) => handleSearch(e.target.value)}
                                />
                                
                                {/* Botón con la flecha dentro del campo */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="ml-2 bg-principal text-white p-2 hover:bg-principal transition duration-300"
                                >
                                    ➡️
                                </button>
                            </div>
                            <ErrorMessage
                                name="searchTerm"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />

                            {/* Resultados de búsqueda */}
                            {values.searchTerm && (
                                <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                                    {filteredRestaurants.length > 0 ? (
                                        filteredRestaurants.map((restaurant, index) => (
                                            <div
                                                key={index}
                                                className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                                onClick={() => {
                                                    console.log(`Restaurante seleccionado: ${restaurant.name}`);
                                                    // Aquí autenticarías el restaurante a tu propiedad
                                                }}
                                            >
                                                <span>{restaurant.name}</span>
                                                <span>{restaurant.location}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-2 text-gray-500">
                                            No se encontraron restaurantes.
                                        </div>
                                    )}
                                    <div
                                        className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                        onClick={() => {
                                            console.log('Añadir nuevo lugar');
                                            dispatch(nextStep());
                                            
                                        }}
                                    >
                                        <span>Añadir un nuevo lugar</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CrearNuevaReseña;
