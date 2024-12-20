import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLoginThunk, loginWithFacebookThunk } from "../../redux/auth/authSlice";


const SignInMethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginMethod = [
    {
      method: "Iniciar con email / contraseña",
      action: () => navigate("/loginWithEmailAndPassword"),
    },
    {
      method: "Iniciar con Teléfono",
      action: () => navigate("/loginWithPhoneNumber"),
    },
    {
      method: "Iniciar con Google",
      action: () => dispatch(googleLoginThunk()),
    },
    {
      method: "Iniciar con Facebook",
      action: () => dispatch(loginWithFacebookThunk()),
    },
  ];
  return (

    <div  className="text-gray-600">
      <h1 className='text-xl m-4 font-bold  font-goldplay text-center'>Iniciar sesión en Foddies</h1>
      <section>
        {
          loginMethod.map((item, index) => <button key={index} onClick={item.action} className='w-full p-2 mb-2 border rounded bg-[#f8f9fa] transition-all active:duration-75 active:scale-75'>{item.method}</button>)
        }
      </section>
      <div className='gap-y-4 py-3 text-gray-600 flex flex-col items-center justify-center' >

        <span>¿No tienes cuenta?</span>
        <button
          className='rounded-lg  transition-all gap-2 active:duration-75  p-2 w-[200px] hover:scale-[1.01] ease-in-out  bg-violet-500 text-white  '>
          <Link to={'/register'}>Registrate Ya!!!</Link>
        </button>
        <p className='text-center font-light text-[9px]  text-gray-600'>
          Al seguir usando una cuenta en Colombia, acepto los Términos del servicio de Foddies
          y autorizo que mis datos personales se
          recopilen y se traten para los fines y según los derechos descritos en la Política de privacidad.
        </p>
      </div>
    </div>
  )
}

export default SignInMethod