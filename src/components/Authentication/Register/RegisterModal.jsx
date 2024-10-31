import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { closeLoginModal } from '../../redux/modales/modalSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Firebase función para registrar al usuario
            await createUserWithEmailAndPassword(auth, email, password);
            // Cierra el modal al registrarse correctamente
        } catch (error) {
            console.error('Error al registrarse: ', error);
            setError('Error al registrarse. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-blanco-puro p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <button
                    className="absolute  right-[480px] font-bold text-gray-500 hover:text-gray-700"
                    
                > 
                    &#10005; 
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                         type={showPassword ? 'text' : 'password'}
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Botón "ojito" */}
                    <button
                        type="button"
                        className="absolute right-12 mt-3 justify-center items-center text-gray-500 hover:text-gray-700"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M1 1l22 22" />
                                <path d="M9.51 9.51a5 5 0 0 0 5.98 5.98M12 19c-7.73 0-10-7-10-7a16.29 16.29 0 0 1 2.51-3.51M17.73 17.73A16.29 16.29 0 0 0 22 12S19.73 5 12 5a9.77 9.77 0 0 0-4.73 1.27" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M1 12S4.27 5 12 5s10 7 10 7-2.27 7-10 7S1 12 1 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                    <input
                         type={showPassword ? 'text' : 'password'}
                        className="w-full p-2 mb-4 border rounded"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {/* Botón "ojito" */}
                    <button
                        type="button"
                        className="absolute top-[338px] right-[500px] flex items-center text-gray-500 hover:text-gray-700"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M1 1l22 22" />
                                <path d="M9.51 9.51a5 5 0 0 0 5.98 5.98M12 19c-7.73 0-10-7-10-7a16.29 16.29 0 0 1 2.51-3.51M17.73 17.73A16.29 16.29 0 0 0 22 12S19.73 5 12 5a9.77 9.77 0 0 0-4.73 1.27" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M1 12S4.27 5 12 5s10 7 10 7-2.27 7-10 7S1 12 1 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                    <button type="submit" className="w-full bg-[#ff0066] text-white p-2 rounded">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
