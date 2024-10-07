import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginModal, setActiveSubModal } from '../../redux/modales/modalSlice';
// import EmailLogin from './EmailLogin';
// import PhoneLogin from './PhoneLogin';
// import GoogleLogin from './GoogleLogin';
// import FacebookLogin from './FacebookLogin';
// import RegisterModal from './RegisterModal';

const LoginModal = () => {
    const dispatch = useDispatch();
    const { isLoginModalOpen, activeSubModal } = useSelector((state) => state.modal);

    if (!isLoginModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <button
                    onClick={() => dispatch(closeLoginModal())}
                    className="absolute top-3 right-3 text-xl font-bold"
                >
                    &times;
                </button>

                {/* Si hay un submodal activo, mostrarlo */}
                {activeSubModal === 'email' && <EmailLogin />}
                {activeSubModal === 'phone' && <PhoneLogin />}
                {activeSubModal === 'google' && <GoogleLogin />}
                {activeSubModal === 'facebook' && <FacebookLogin />}
                {activeSubModal === 'register' && <RegisterModal />}

                {/* Si no hay submodal activo, mostrar los botones */}
                {!activeSubModal && (
                    <>
                        <button
                            onClick={() => dispatch(setActiveSubModal('email'))}
                            className="w-full bg-blue-500 text-white p-2 my-2 rounded"
                        >
                            Iniciar sesión con correo o usuario
                        </button>
                        <button
                            onClick={() => dispatch(setActiveSubModal('phone'))}
                            className="w-full bg-blue-500 text-white p-2 my-2 rounded"
                        >
                            Iniciar sesión con número de teléfono
                        </button>
                        <button
                            onClick={() => dispatch(setActiveSubModal('google'))}
                            className="w-full bg-blue-500 text-white p-2 my-2 rounded"
                        >
                            Iniciar sesión con Google
                        </button>
                        <button
                            onClick={() => dispatch(setActiveSubModal('facebook'))}
                            className="w-full bg-blue-500 text-white p-2 my-2 rounded"
                        >
                            Iniciar sesión con Facebook
                        </button>
                        <button
                            onClick={() => dispatch(setActiveSubModal('register'))}
                            className="w-full bg-green-500 text-white p-2 my-2 rounded"
                        >
                            Registrarse
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginModal;


// const LoginForm = () => {
//   return (
//     <div className='flex w-full h-screen bg-[#1f1f1f]/10'>
//       <div className=' w-[368px] h-[542px]  m-14 flex flex-col bg-white items-center rounded-lg justify-center lg:w-1/2 lg:h-1'>
//         <span className='relative left-[138px] bottom-[28px] '>x</span>
//         <form action="" className='w-[300px]  items-center justify-center '>
//           <h1 className='text-xl m-4 font-bold font-goldplay text-center'>Iniciar sesión en Foddies</h1>
//           <div className='  flex flex-col gap-y-2 '>
//             <div className='text-lg font-goldplay  p-1 rounded-lg border-2 text-center
//             + transition-all active:duration-75 '>
//               <button className=' ' type="submit">
//                 <a href="http://localhost:5173/singin">Usar Email/ Usuario </a>                
//               </button>
//             </div>
//             <div className='font-goldplay rounded-lg border-2 p-1 text-lg text-center transition-all active:duration-75 active:scale-75'>
//             <button type="submit">
//               <a href="">Usar Telefono</a>
//               </button>
//             </div>

           
//             <button className='flex items-center p-1 border-2 rounded-lg justify-center text-lg font-goldplay transition-all active:duration-75' type="submit">
//               Iniciar con Google
//             </button>
//             <button className='flex items-center p-1 border-2 rounded-lg text-lg font-goldplay transition-all active:duration-75 justify-center ' type="submit">
//               Iniciar con Facebook
//             </button>
//           </div>
//           <div className='gap-y-4 py-3 flex flex-col items-center justify-center' >
//             <span>¿No tienes cuenta?</span>
//             <button className='rounded-lg transition-all gap-2 active:duration-75  p-2 w-[200px] hover:scale-[1.01] ease-in-out  bg-violet-500 text-white  '><a href="">Registrate Ya!!!</a></button>
//             <p className='text-center text-[12px] font-goldplay text-gray-600'>
//               Al seguir usando una cuenta en Colombia, acepto los Términos del servicio de Foddies y autorizo que mis datos personales se
//               recopilen y se traten para los fines y según los derechos descritos en la Política de privacidad.
//             </p>
//           </div>

//         </form>

//       </div>

//     </div>
//   )
// }

// export default LoginForm