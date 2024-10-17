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

  const {  isAuthenticated, user } = useSelector((store) => store.auth);
  return (

    <>
    <main className=" max-w-[749px] h-auto p-0 shadow-lg rounded-lg flex flex-col justify-end md:mr-[15vw] md:ml-[21.875rem]">
      <div className='pt-[0px] pr-[30px] pb-[0px] pl-[30px]'>
        {/* Sección de Perfiles de Usuario */}
        <div className="flex justify-center mb-12">
          {prueba.map((items, index) => (
            <UserProfile key={index} name={items.name} imageUrl={items.imgUrl} />
          ))}
        </div>

        {/* Tarjeta de Restaurante */}
        <PostCard foodImage={ComidaImg} />
      </div>
    </main>
    {
      (isAuthenticated && (!user?.eatingOutFrecuency || !user?.interests?.length))?<ModalRegistro step={4} />:null
    }
    </>
  );
};

export default Home;
