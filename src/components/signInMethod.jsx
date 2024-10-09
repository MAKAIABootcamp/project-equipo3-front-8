import { useNavigate, Link } from "react-router-dom";


const SignInMethod = () => {
    const navigate = useNavigate();
    const loginMethod = [
        {
            method: 'Iniciar con email / contraseña',
            action: () => navigate('/loginWithEmailAndPassword')
        },
        {
            method: 'Iniciar con Teléfono',
            action: () => navigate('/loginWithPhoneNumber')
        },
        {
            method: 'Iniciar con Google',
            action: () => navigate('/')
        },
        {
            method: 'Iniciar con Facebook',
            action: () => navigate('/')
        }
    ]
    return (

        <div>
            <h1 className='text-xl m-4 font-bold font-goldplay text-center'>Iniciar sesión en Foddies</h1>
            <section>
                {
                    loginMethod.map((item, index) => <button key={index} onClick={item.action} className='w-full p-2 mb-2 border rounded bg-[#f8f9fa] transition-all active:duration-75 active:scale-75'>{item.method}</button>)
                }
            </section>
            <div className='gap-y-4 py-3 flex flex-col items-center justify-center' >

                <span>¿No tienes cuenta?</span>
                <button
                    className='rounded-lg transition-all gap-2 active:duration-75  p-2 w-[200px] hover:scale-[1.01] ease-in-out  bg-violet-500 text-white  '>
                    <Link to={'/'}>Registrate Ya!!!</Link>
                </button>
                <p className='text-center text-[12px] font-goldplay text-gray-600'>
                    Al seguir usando una cuenta en Colombia, acepto los Términos del servicio de Foddies
                    y autorizo que mis datos personales se
                    recopilen y se traten para los fines y según los derechos descritos en la Política de privacidad.
                </p>
            </div>
        </div>
    )
}

export default SignInMethod