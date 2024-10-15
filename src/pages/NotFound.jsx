import { useNavigate } from 'react-router-dom';
import useCountdown from '../hooks/useCountdown'; // Asegúrate de que la ruta sea correcta

const NotFound = () => {
  const navigate = useNavigate();
  const countdown = useCountdown(5, () => navigate('/'));

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-grey-500 ">404 - Página no encontrada</h1>
      <p className="mt-4">Volverás al inicio en {countdown} segundos.</p>
    </div>
  );
};

export default NotFound;
