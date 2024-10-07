import React from 'react';
import UserProfile from '../components/UserProfile';
import RestaurantCard from '../components/RestaurantCard';
import ComidaImg from '../assets/imagenes/comida.png';


const HomePage2 = () => {
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
  return (


    <div className="bg-gray-100 max-w-[749px] h-[904px] p-0 shadow-lg rounded-lg flex flex-col justify-end ">
      <div className='pt-[0px] pr-[30px] pb-[0px] pl-[30px]'>
        {/* Sección de Perfiles de Usuario */}
        <div className="flex justify-center mb-12">
          {prueba.map((items,index)=>(
            <UserProfile key={index} name={items.name} imageUrl={items.imgUrl} />
          ))}
        </div>

        {/* Tarjeta de Restaurante */}
        <RestaurantCard foodImage={ComidaImg} />
      </div>
    </div>
  );
};

export default HomePage2;
