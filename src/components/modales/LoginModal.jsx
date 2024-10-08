import React from 'react';


const LoginModal = () => {
   
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3" >
                    <button
                        className="absolute  right-[480px] font-bold text-gray-500 hover:text-gray-700"
                    > 
                        &#10005;
                    </button>
                   
                    <div >
                        <h1 className='text-xl m-4 font-bold font-goldplay text-center'>Iniciar sesión en Foddies</h1>
                        <button
                            className='w-full p-2 mb-2 border rounded bg-[#f8f9fa] transition-all active:duration-75 active:scale-75'
                            type="submit">
                            <a href=" http://localhost:5173/EmailLogin">Usar Email/ Usuario </a>
                        </button>
                        <button
                            className='w-full p-2 mb-2 border rounded bg-[#f8f9fa] transition-all active:duration-75 active:scale-75'
                            type="submit"
                        >
                            <a href=" http://localhost:5173/PhoneLogin"> Usar Telefono</a>
                        </button>
                        <button
                            className='w-full p-2 mb-2 border rounded bg-[#f8f9fa] transition-all active:duration-75 active:scale-75'
                            type="submit">
                            <a href=" http://localhost:5173/GoogleLogin"> Iniciar con Google</a>
                        </button>
                        <button
                            className='w-full p-2 mb-2 border rounded bg-[#f8f9fa] transition-all active:duration-75 active:scale-75'
                            type="submit">
                            <a href=" http://localhost:5173/FacebookLogin"> Iniciar con Facebook</a>
                        </button>
                        <div className='gap-y-4 py-3 flex flex-col items-center justify-center' >

                            <span>¿No tienes cuenta?</span>
                            <button
                                className='rounded-lg transition-all gap-2 active:duration-75  p-2 w-[200px] hover:scale-[1.01] ease-in-out  bg-violet-500 text-white  '>
                                <a href=" http://localhost:5173/RegisterModal">Registrate Ya!!!</a>
                            </button>
                            <p className='text-center text-[12px] font-goldplay text-gray-600'>
                                Al seguir usando una cuenta en Colombia, acepto los Términos del servicio de Foddies
                                y autorizo que mis datos personales se
                                recopilen y se traten para los fines y según los derechos descritos en la Política de privacidad.
                            </p>
                        </div>

                    </div>

                </div >

            </div >

        </>
    )
}

export default LoginModal