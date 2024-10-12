import { useEffect, useState } from 'react';

/**
 * Hook para manejar una cuenta regresiva.
 * @param {number} initialCount - El valor inicial del contador.
 * @param {function} onComplete - Función a ejecutar cuando la cuenta regresiva finaliza.
 * @returns {[number]} - El valor actual del contador.
 */
const useCountdown = (initialCount, onComplete) => {
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    if (countdown === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(timer);
  }, [countdown, onComplete]);

  return countdown;
};

export default useCountdown;
