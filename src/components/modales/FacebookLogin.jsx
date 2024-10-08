import React from 'react';
import { useDispatch } from 'react-redux';
//import { closeLoginModal } from '../../redux/modales/modalSlice';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const handleFacebookLogin = async () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();

        try {
            await signInWithPopup(auth, provider);
           // dispatch(closeLoginModal()); // Cierra el modal al iniciar sesión correctamente
        } catch (error) {
            console.error('Error al iniciar sesión con Facebook: ', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-blanco-puro p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3" >
                <h2 className="text-2xl font-bold mb-4">Iniciar sesión con Facebook</h2>
                <button
                    onClick={handleFacebookLogin}
                    className="w-full bg-principal text-blanco-puro p-2 rounded"
                >
                    Iniciar sesión con Facebook
                </button>
            </div>
        </div>
    );
};

export default FacebookLogin;
