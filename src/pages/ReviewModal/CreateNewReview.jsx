import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { nextStep, setStep } from '../../redux/modals/modalSlice';
import { searchRestaurants } from '../../redux/restaurants/restaurantSlice';
import useDebounce from '../../hooks/useDebounce'; // Ajusta la ruta del hook

const CreateNewReview = () => {
    const dispatch = useDispatch();
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const restaurants = useSelector((state) => state.restaurant.restaurants);
    const loading = useSelector((state) => state.restaurant.loading);
    const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem('searchTerm') || ''); // Cargar desde sessionStorage
    const [selectedRestaurant, setSelectedRestaurant] = useState(
        sessionStorage.getItem('selectedRestaurant') 
        ? JSON.parse(sessionStorage.getItem('selectedRestaurant')) 
        : null
    ); // Cargar selección desde sessionStorage

    // Debounce del valor de búsqueda
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500 ms de delay

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        searchTerm: Yup.string()
            .required('Este campo es obligatorio')
            .min(2, 'Debe tener al menos 2 caracteres'),
    });

    const handleSearch = (value) => {
        if (value.length >= 2) {
            console.log('Buscando:', value);
            dispatch(searchRestaurants(value));
        } else {
            setFilteredRestaurants([]); // Reinicia los resultados si la búsqueda es demasiado corta
        }
    };

    // Efecto para ejecutar la búsqueda cuando el valor debounced cambie
    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        setFilteredRestaurants(restaurants); // Actualiza los restaurantes filtrados
    }, [restaurants]);

    // Limpiar búsqueda si se borra el texto
    useEffect(() => {
        if (!searchTerm) {
            setFilteredRestaurants([]);
        }
    }, [searchTerm]);

    // Guardar en sessionStorage cada vez que cambie la búsqueda o selección
    useEffect(() => {
        sessionStorage.setItem('searchTerm', searchTerm);
        if (selectedRestaurant) {
            sessionStorage.setItem('selectedRestaurant', JSON.stringify(selectedRestaurant));
        } else {
            sessionStorage.removeItem('selectedRestaurant');
        }
    }, [searchTerm, selectedRestaurant]);

    const clearSelection = () => {
        setSelectedRestaurant(null);
        setSearchTerm(''); // Limpiar el input cuando se borre la selección
    };

    // Nueva función para manejar el envío del formulario y avanzar al paso 4
    const handleSubmit = (values) => {
        console.log('Formulario enviado:', values);
        dispatch(setStep(3));  // Cambia a paso 4
    };

    return (
        <div>
            <h2 className="text-center text-xl font-semibold mb-4">Crea una nueva Reseña</h2>

            <Formik
                initialValues={{ searchTerm }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit} // Cambiar aquí para usar la nueva función
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form>
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 focus-within:border-blue-500">
                                <Field
                                    name="searchTerm"
                                    type="text"
                                    placeholder="Buscar un restaurante"
                                    className="w-full focus:outline-none"
                                    onChange={(e) => {
                                        handleChange(e); // Mantiene la sincronización con Formik
                                        setSearchTerm(e.target.value); // Actualiza el estado de búsqueda local
                                    }}
                                    value={selectedRestaurant ? selectedRestaurant.displayName : values.searchTerm} // Muestra el restaurante seleccionado o el texto buscado
                                    disabled={!!selectedRestaurant} // Deshabilitar input si hay un restaurante seleccionado
                                />
                                {selectedRestaurant ? (
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        onClick={clearSelection} // Limpiar selección
                                    >
                                        ✖
                                    </button>
                                ) : null} {/* La "X" solo se muestra si hay un restaurante seleccionado */}
                                <button
                                    type="submit"
                                    disabled={!selectedRestaurant || isSubmitting || loading}
                                    className={`ml-2 p-2 transition duration-300 ${selectedRestaurant ? 'bg-principal text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                            {values.searchTerm && !selectedRestaurant && (
                                <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                                    {filteredRestaurants.length > 0 ? (
                                        filteredRestaurants.map((restaurant) => (
                                            <div
                                                key={restaurant.id}
                                                className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                                onClick={() => {
                                                    setSelectedRestaurant(restaurant); // Selecciona el restaurante
                                                    setSearchTerm(restaurant.displayName); // Muestra el nombre en el input
                                                }}
                                            >
                                                <span>{restaurant.displayName}</span>
                                                <span>{restaurant.location.city}</span>
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

export default CreateNewReview;
