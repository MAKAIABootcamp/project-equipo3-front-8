import React, { useEffect } from "react";
import UserProfile from "../components/Common/Storys/StoryAvatar";
import PostCard from "../components/Common/Post/PostCard";
import ComidaImg from "../assets/imagenes/comida.png";
import { useSelector, useDispatch } from "react-redux";
import ModalRegistro from "../components/Layout/RegistryModal";
import { fetchPosts } from "../redux/post/postSlice";
import { fetchAllUsersData } from "../redux/users/otherUserSlice";
import { fetchAllRestaurants } from "../redux/restaurants/restaurantSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { allUsers } = useSelector((store) => store.otherUser);
  const { restaurants } = useSelector((store) => store.restaurant);

  // Cargar publicaciones al montar el componente
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchAllUsersData());
    dispatch(fetchAllRestaurants());
  }, [dispatch]);


  const prueba = [
    {
      name: "olmar",
      imgUrl:
        "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "Holguer",
      imgUrl:
        "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl:
        "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl:
        "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl:
        "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl:
        "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
  ];
  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex justify-center flex-row items-stretch">
        <div className="max-w-[630px] w-full">
          <div className="mt-4">
            <div className="flex justify-center mb-6">
              {prueba.map((items, index) => (
                <UserProfile
                  key={index}
                  name={items.name}
                  imageUrl={items.imgUrl}
                />
              ))}
            </div>

            {/* Muestra cada publicación de Firebase */}
            <div className="flex flex-col items-center justify-start self-auto">
              <div className="w-full maxWhitMinW content-stretch flex flex-col flex-shrink-0 items-stretch justify-start flex-grow-0">
                {posts.length &&
                  allUsers.length &&
                  restaurants.length &&
                  posts.map((post) => {
                    const restaurantPost = restaurants?.find(
                      (r) => r.id === post.restaurantId
                    );
                    const userPost = allUsers?.find(
                      (u) => u.id === post.userId
                    );
                    return (
                      <PostCard
                        key={post.id}
                        foodImage={post.postImage} // Usa la imagen de la publicación o una de ejemplo
                        description={post.description}
                        tags={post?.questions?.tags || []}
                        restaurantId={post.restaurantId}
                        restaurant={restaurantPost}
                        userPost={userPost}
                        date = {post.createdAt}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated &&
      (!user?.eatingOutFrecuency || !user?.interests?.length) ? (
        <ModalRegistro step={4} />
      ) : null}
    </>
  );
};

export default Home;
