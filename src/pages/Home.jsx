import UserProfile from '../components/Common/Storys/StoryAvatar';
import PostCard from '../components/Common/Post/PostCard';
import ComidaImg from '../assets/imagenes/comida.png';
import { useSelector } from "react-redux";
import ModalRegistro from '../components/Layout/ModalRegistro';


const Home = () => {
  const prueba = [
    {
      name: "olmar",
      imgUrl: "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "Holguer",
      imgUrl: "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl: "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl: "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl: "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },
    {
      name: "olmar",
      imgUrl: "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid",
    },

  ]

  const { isAuthenticated, user } = useSelector((store) => store.auth);
  return (
    <>
      <div className='flex justify-center flex-row items-stretch'>

        <div className='max-w-[630px] w-full'>
          <div className='mt-4'>
            <div className="flex justify-center mb-6">
              {prueba.map((items, index) => (
                <UserProfile key={index} name={items.name} imageUrl={items.imgUrl} />
              ))}
            </div>

            {/* Tarjeta de Restaurante */}
            <div className='flex flex-col items-center justify-start self-auto'>
              <div className='w-full maxWhitMinW content-stretch flex flex-col flex-shrink-0 items-stretch justify-start flex-grow-0  '>
                <PostCard foodImage={ComidaImg} />
              </div>
            </div>
          </div>
        </div>
        {/* Sección de Perfiles de Usuario */}
      </div>

      {
        (isAuthenticated && (!user?.eatingOutFrecuency || !user?.interests?.length)) ? <ModalRegistro step={4} /> : null
      }
    </>
  );
};

export default Home;
