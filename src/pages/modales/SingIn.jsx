import React from 'react'

const SingIn = () => {
    return (
        <div className='wrapper bg-[#1f1f1f]/10 w-full h-screen'>
            <div className=''>
                <form className=' w-[283px] h-[642px] m-8 bg-[#FFFFFF] items-center justify-center'>
                    <h1 className='font-bold font-goldplay text-center'>Iniciar Sesión</h1>
                    <div className='gap-y-4 flex flex-col  '>
                        <label> Correo electrónico o Nombre de usuario
                            <input type="email"                                                       
                                className='border-2 rounded-lg '
                                name="Username"
                                placeholder='Correo electrónico / Username'
                                required
                            />
                        </label>
                    </div>
                    <div className=' text-lg font-goldplay  p-1 rounded-lg'>
                        <label> Password
                            <input type="password"
                                name="password"
                                className='border-2 rounded-lg'
                                placeholder='Contraseña / password'
                                required
                            />
                        </label>
                    </div>
                    <div className=''>
                        <span>¿Olvidaste tu contraseña?</span>
                        <button type='submit'>
                           Iniciar sesión
                        </button>
                        
                    </div>
                   
                    <div>
                        <span className='text-gray-600 p-1'>¿No tienes cuenta?<a href="" className='text-pink-600'>Registrarse</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingIn