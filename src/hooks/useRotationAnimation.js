import { useState, useRef, useCallback } from 'react';

const useRotationAnimation = (rotationSpeed = 5, rotationStep = Math.PI / 10) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const animationRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = useCallback(() => {
        if (isAnimating) return; // Evitar reiniciar la animación si ya está en curso

        setIsAnimating(true);
        const maxAngle = 2 * Math.PI; // Una vuelta completa
        let currentAngle = 0;

        const animate = () => {
            currentAngle += rotationStep; // Incrementar el ángulo según el paso configurado

            if (currentAngle >= maxAngle) {
                currentAngle = 0; // Reiniciar la posición una vez que complete un giro
                setRotationAngle(0);
                setIsAnimating(false); // Marcar la animación como detenida
            } else {
                setRotationAngle(currentAngle);
                animationRef.current = setTimeout(animate, rotationSpeed); // Continuar la animación según la velocidad
            }
        };

        animate(); // Iniciar la animación
    }, [isAnimating, rotationSpeed, rotationStep]);

    const resetAnimation = useCallback(() => {
        if (animationRef.current) {
            clearTimeout(animationRef.current);
            animationRef.current = null;
        }
        setRotationAngle(0); // Resetea el ángulo al valor inicial
        setIsAnimating(false); // Marcar la animación como detenida
    }, []);

    return { rotationAngle, startAnimation, resetAnimation };
};

export default useRotationAnimation;
