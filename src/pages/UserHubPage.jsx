import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchOtherUserData,
  clearOtherUserData,
  fetchAllUsersData,
} from "../redux/users/otherUserSlice";
import { getRestaurantByUsername } from "../redux/restaurants/restaurantSlice";
import { fetchPosts } from "../redux/post/postSlice";
import NotFound from "./NotFound";
import AvatarSection from "../components/RestaurantProfile/AvatarSection";
import {
  calculateRestaurantScore,
  calculateUserProfile,
  assignStars,
} from "../utils/reviewsOperations";
import StarsRaiting from "../components/Common/Raiting/StarsRaiting";
import StatsPanel from "../components/Panels/StatsPanel";
import Banner from "../components/RestaurantProfile/Banner";


const UserHubPage = () => {
  const dispatch = useDispatch();
  const { userType, username } = useParams();
  console.log(userType);
  console.log(username);
  const { user, isAuthenticated } = useSelector((store) => store.auth);



  const {
    data: otherUser,
    allUsers,
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

  const { posts } = useSelector((store) => store.posts);

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
    dispatch(fetchPosts());
    dispatch(fetchAllUsersData());
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
  const userReviews =
    posts.filter((p) => {
      if (userType === "restaurant") {
        return p.restaurantId === displayUser?.id;
      } else {
        return p.userId === displayUser?.id;
      }
    }) || [];

  console.log(userReviews);

  if (!displayUser && !isCurrentUser) {
    return <NotFound />;
  }
  const statsPanelData = [
    { count: userReviews.length, label: "reviews" },


  ]
  const score =
    userType === "restaurant" &&
      posts.length &&
      allUsers.length &&
      displayUser?.id
      ? calculateRestaurantScore(posts, allUsers, displayUser?.id)
      : calculateUserProfile(displayUser, userReviews, posts);

  const stars = userType === "restaurant" ? assignStars(score, userReviews) : null;

  console.log('Puntación del usuario:', score);
  console.log('stars', stars)
  return (
    <div className="flex flex-col items-center p-6 md:p-10">
      {/* Sección de Banner y Avatar */}
      <div className="w-full mb-8 ">
        <Banner userBanner={displayUser?.userBanner} />
        <AvatarSection
          photo={displayUser?.userAvatar}
          alt={displayUser?.displayName}
          username={displayUser?.username}
          displayName={displayUser?.displayName}
        />
        {userType === "restaurant" && <StarsRaiting rating={stars} />}
      </div>

      {/* Información del usuario y botón de configuración */}
      <div className="flex flex-col items-center text-center md:text-left">
        <h1 className="text-2xl font-semibold mb-2">{displayUser?.displayName}</h1>
        <p className="text-gray-600">{displayUser?.email}</p>
        {/* {isCurrentUser && (
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Configuración
          </button>
        )} */}
      </div>

      {/* Panel de estadísticas */}
      <div className="mt-6">
        <StatsPanel statsItems={statsPanelData} />
      </div>

      {/* Galería de fotos */}
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

      {/* Galería de reseñas */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {userReviews.map((review) => (
          <div
            key={review.id}
            className="relative group cursor-pointer"
            onClick={() => openModal(review, "foto")}
          >
            <img
              src={review.postImage}
              alt={review.alt}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg">❤️ {review.likes.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHubPage;
