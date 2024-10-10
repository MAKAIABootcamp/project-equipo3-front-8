import React from 'react';
import { useDispatch } from 'react-redux';
//import { closeLoginModal } from '../../redux/modales/modalSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const GoogleLogin = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            //dispatch(closeLoginModal()); // Cierra el modal al iniciar sesión correctamente
        } catch (error) {
            console.error('Error al iniciar sesión con Google: ', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Iniciar sesión en Foddies con Google</h2>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-pink-600 text-white p-2 rounded"
                >
                    Iniciar sesión con Google
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;
