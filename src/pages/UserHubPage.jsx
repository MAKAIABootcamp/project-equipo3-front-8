import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOtherUserData, clearOtherUserData } from "../redux/users/otherUserSlice"; // Importar del nuevo slice

import NotFound from './NotFound'; // Asegúrate de importar el componente NotFound

const UserHubPage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const { data: otherUser, loading, error } = useSelector((store) => store.otherUser); // Cambiado para usar el estado de otherUser

  useEffect(() => {
    if (isAuthenticated) {
      if (username && username !== user.username) {
        dispatch(fetchOtherUserData(username)); // Obtener datos del otro usuario si no es el usuario autenticado
      } else {
        dispatch(clearOtherUserData()); // Limpiar los datos de otherUser si el usuario autenticado está viendo su propio perfil
      }
    }
  }, [dispatch, username, user.username, isAuthenticated]);

  // Si no está autenticado, muestra un mensaje
  if (!isAuthenticated) {
    return <div>Necesitas iniciar sesión para ver esta página.</div>;
  }

  const isCurrentUser = user.username === username;

  // Si está cargando y no es el usuario actual, muestra un mensaje de carga
  if (loading && !isCurrentUser) return <div>Cargando...</div>;

  // Manejo de errores: si hay un error y no es el usuario actual, muestra NotFound
  if (!isCurrentUser && error) {
    return <NotFound />;
  }

  // Verifica si el usuario autenticado o el otro usuario existen
  const displayUser = isCurrentUser ? user : otherUser;

  // Verifica que displayUser no sea undefined antes de intentar acceder a sus propiedades
  if (!displayUser && !isCurrentUser) {
    return <NotFound />; // Muestra NotFound si no hay datos de usuario
  }

  return (
    <div>
      <h1>{displayUser.displayName}</h1>
      <img src={displayUser.photoURL} alt={displayUser.displayName} />
      <p>Email: {displayUser.email}</p>
      {isCurrentUser && <button>Configuración</button>}
    </div>
  );
};

export default UserHubPage;
