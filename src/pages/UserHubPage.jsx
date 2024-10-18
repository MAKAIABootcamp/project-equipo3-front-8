import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../redux/users/usersSlice';

const UserHubPage = () => {
  const dispatch = useDispatch();
  const { username } = useParams(); // Captura el nombre de usuario de la URL
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const { data: otherUser, loading, error } = useSelector((store) => store.users);

  useEffect(() => {
    // Verificar si hay un usuario autenticado
    if (isAuthenticated) {
      // Verificar si el username en la URL es diferente al del usuario autenticado
      if (username !== user.username) {
        // Obtiene los datos del otro usuario solo si no es el mismo usuario autenticado
        dispatch(fetchUserData(username));
      }
    }
  }, [dispatch, username, user.username, isAuthenticated]);

  // Si no hay un usuario autenticado, muestra un mensaje o redirige
  if (!isAuthenticated) {
    return <div>You need to log in to see this page.</div>;
  }

  // Determinar si el perfil que se está viendo es el del usuario autenticado
  const isCurrentUser = user.username === username;

  // Muestra cargando mientras obtienes los datos
  if (loading && !isCurrentUser) return <div>Cargando...</div>; 

  // Manejo de errores para otros usuarios
  if (!isCurrentUser && error) {
    return <div>Error: {error}</div>; // Muestra el error para otros usuarios
  }

  // Usa los datos del usuario autenticado o de otro usuario si no es el mismo
  const displayUser = isCurrentUser ? user : otherUser;

  return (
    <div>
      <h1>{displayUser.displayName}</h1>
      <img 
        src={displayUser.photoURL} 
        alt={displayUser.displayName} 
      />
      <p>Email: {displayUser.email}</p>
      {isCurrentUser && <button>Configuración</button>}
    </div>
  );
};

export default UserHubPage;
