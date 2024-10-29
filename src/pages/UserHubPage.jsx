import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchOtherUserData,
  clearOtherUserData,
} from "../redux/users/otherUserSlice";
import { getRestaurantByUsername } from "../redux/restaurants/restaurantSlice";
import NotFound from "./NotFound";
import AvatarSection from "../components/RestaurantProfile/AvatarSection";

const UserHubPage = () => {
  const dispatch = useDispatch();
  const { userType, username } = useParams();
  console.log(userType);
  console.log(username);
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  const {
    data: otherUser,
    loading,
    error,
  } = useSelector(
    (store) => store.otherUser || { data: null, loading: false, error: null }
  );

  const { restaurant: restaurantAuth } = useSelector(
    (store) => store.authRestaurant
  );
  const { restaurant } = useSelector(
    (store) => store.restaurant || { restaurant: null }
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (username && userType === "user" && username !== user.username) {
        dispatch(fetchOtherUserData(username));
      } else {
        dispatch(clearOtherUserData());
      }
    }

    if (userType === "restaurant") {
      dispatch(getRestaurantByUsername(username));
    }
  }, [dispatch, username, user.username, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-center text-gray-700 mt-8">
        Necesitas iniciar sesión para ver esta página.
      </div>
    );
  }

  const isCurrentUser = user.username === username;

  if (loading && !isCurrentUser)
    return <div className="text-center text-gray-700 mt-8">Cargando...</div>;

  if (!isCurrentUser && error) {
    return <NotFound />;
  }

  const displayUser = isCurrentUser ? user : otherUser || restaurant;

  if (!displayUser && !isCurrentUser) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-center p-6 md:p-10">
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
        {/* Banner superior */}
        <div className="w-full h-50 bg-gray-300 mb-8"></div>
        <AvatarSection
          photo={displayUser?.userAvatar}
          alt={displayUser?.displayName}
          username={displayUser?.username}
          displayName={displayUser?.displayName}
        />
        {/* <img
          className="w-32 h-32 md:w-48 md:h-48 object-cover mb-4 md:mb-0 rounded-full border-4 border-principal"
          src={displayUser?.userAvatar}
          alt={displayUser.displayName}
        /> */}

        <div className="flex flex-col  text-center  md:text-left">
          {/* <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {displayUser.displayName}
          </h1> */}
          <p className="text-gray-600">{displayUser.email}</p>
          {isCurrentUser && (
            <button className="mt-4 px-4 py-2 bg-principal text-blanco-puro rounded-lg hover:bg-principal transition">
              Configuración
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-lg md:max-w-3xl lg:max-w-4xl">
        {displayUser.photos &&
          displayUser.photos.map((photo, index) => (
            <div
              key={index}
              className="relative w-full pt-[100%] overflow-hidden rounded-lg shadow-md"
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={photo}
                alt={`Photo ${index + 1}`}
              />
            </div>
          ))}
      </div>

      <h1 className="mt-10 text-center text-lg md:text-2xl font-bold text-gray-700 max-w-xl mx-auto px-4 leading-1.2">
        Nuestra aplicación está en etapa beta. Estamos trabajando en nuevas
        funcionalidades importantes para mejorar tu experiencia.
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-lg">
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
      </div>
    </div>
  );
};

export default UserHubPage;
