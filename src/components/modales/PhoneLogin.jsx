import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '../../redux/modales/modalSlice';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PhoneLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const dispatch = useDispatch();

    // Configura el reCAPTCHA antes de enviar el código
    const setUpRecaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
                console.log('reCAPTCHA resuelto');
            }
        }, auth);
    };

    const sendVerificationCode = async () => {
        setUpRecaptcha();
        const auth = getAuth();
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            alert('Código de verificación enviado');
        } catch (error) {
            console.error('Error enviando código de verificación: ', error);
        }
    };

    const verifyCode = async () => {
        const auth = getAuth();
        const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);

        try {
            await auth.signInWithCredential(credential);
            alert('Número de teléfono verificado');
            dispatch(closeLoginModal()); // Cierra el modal al iniciar sesión correctamente
        } catch (error) {
            console.error('Error verificando el código: ', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <button
                    className="absolute  right-[480px] font-bold text-gray-500 hover:text-gray-700"
                    //onClick={() => dispatch(closeLoginModal())}
                > 
                    &#10005; 
                </button>
                <h2 className="text-2xl font-bold mb-4">Iniciar sesión con teléfono</h2>

                {/* Entrada para el número de teléfono */}
                <input
                    type="text"
                    className="w-full p-2 mb-4 bg-[#f8f9fa] border rounded"
                    placeholder="Número de teléfono"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <button
                    onClick={sendVerificationCode}
                    className="w-full bg-[#ff0066] text-white p-2 mb-4 rounded"
                >
                    Enviar código de verificación
                </button>

                {/* Entrada para el código de verificación */}
                {verificationId && (
                    <>
                        <input
                            type="text"
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="Código de verificación"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />

                        <button
                            onClick={verifyCode}
                            className="w-full bg-[#ff0066] text-white p-2 rounded"
                        >
                            Verificar código
                        </button>
                        <span className='text-gray-500'>¿No tienes cuenta? <a href="" className='text-center flex justify-center text-gray-500 '>Registrate</a></span>
                    </>
                )}

                {/* Este div es necesario para el reCAPTCHA */}
                <div id="recaptcha-container"></div>

            </div>
        </div>
    );
};

export default PhoneLogin;
