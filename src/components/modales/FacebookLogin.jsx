import React from 'react';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '../../redux/modales/modalSlice';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const handleFacebookLogin = async () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            dispatch(closeLoginModal()); // Cierra el modal al iniciar sesión correctamente
        } catch (error) {
            console.error('Error al iniciar sesión con Facebook: ', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión con Facebook</h2>
            <button
                onClick={handleFacebookLogin}
                className="w-full bg-blue-600 text-white p-2 rounded"
            >
                Iniciar sesión con Facebook
            </button>
        </div>
    );
};

export default FacebookLogin;
