import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { hiddenModal } from '../../redux/modales/modalSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const EmailLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
   

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            
            await signInWithEmailAndPassword(auth, email, password);
           //dispatch(hiddenModal()); // Cierra el modal
        } catch (error) {
            console.error('Error al iniciar sesión: ', error);
            setError('Error al iniciar sesión. Por favor, revisa tus credenciales.');
        }
    };

    return (
        <>
        
           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
               <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                    <button
                      className="absolute  right-[480px] font-bold text-gray-500 hover:text-gray-700"
                      
                    > <Modal/>
                      &#10005; 
                   </button>
                 
                   <h1 className="text-2xl text-center font-bold mb-4">Iniciar sesión </h1>
                   <p className='text-gray-500 m-2'>Correo electrónico o Nombre de usuario</p>
                     {error && <p className="text-red-500">{error}
                    </p>}
                    <form onSubmit={handleLogin}>
                        <input
                          type="email"
                          className="w-full p-2 mb-2 border rounded bg-[#f8f9fa] "
                          placeholder="Correo electrónico o usuario"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input
                           type="password"
                           className="w-full p-2 mb-4 border rounded bg-[#f8f9fa] "
                           placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                         {/* Botón "ojito" */}
                        <button
                          type="button"
                          className="absolute inset-y-0 bottom-4 right-[500px] flex items-center text-gray-500 hover:text-gray-700"
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
                        <span className=' flex m-2 items-center justify-center text-center text-gray-500'>
                              ¿Olvidaste tu contraseña?
                        </span>
                        <button type="submit"
                           className="w-full bg-[#ff0066] text-white p-2 rounded">

                          Iniciar sesión
                        </button>
                        <span
                           className='justify-center items-center text-center text-gray-500 m-4 flex '>
                           ¿No tienes cuenta?
                          <a href="http://localhost:5173/registermodal" 
                             className='text-pink-600 '>
                             Registrarte
                          </a>
                        </span>
                   </form>
               </div>
            </div>

        </>
        
        
    );
};

export default EmailLogin;


// const SingIn = () => {
//     return (
//         <div className='wrapper bg-[#1f1f1f]/10 w-full h-screen'>
//             <div className=''>
//                 <form className=' w-[283px] h-[642px] m-8 bg-[#FFFFFF] items-center justify-center'>
//                     <h1 className='font-bold font-goldplay text-center'>Iniciar Sesión</h1>
//                     <div className='gap-y-4 flex flex-col  '>
//                         <label> Correo electrónico o Nombre de usuario
//                             <input type="email"                                                       
//                                 className='border-2 rounded-lg '
//                                 name="Username"
//                                 placeholder='Correo electrónico / Username'
//                                 required
//                             />
//                         </label>
//                     </div>
//                     <div className=' text-lg font-goldplay  p-1 rounded-lg'>
//                         <label> Password
//                             <input type="password"
//                                 name="password"
//                                 className='border-2 rounded-lg'
//                                 placeholder='Contraseña / password'
//                                 required
//                             />
//                         </label>
//                     </div>
//                     <div className=''>
//                         <span>¿Olvidaste tu contraseña?</span>
//                         <button type='submit'>
//                            Iniciar sesión
//                         </button>
                        
//                     </div>
                   
//                     <div>
//                         <span className='text-gray-600 p-1'>¿No tienes cuenta?<a href="" className='text-pink-600'>Registrarse</a></span>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SingIn