import React from 'react';
import UserProfile from '../components/UserProfile';
import RestaurantCard from '../components/RestaurantCard';
import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Modal from '../components/Modal';


const HomePage2 = () => {
  // const { isActiveModal } = useSelector(store => store.modal);
  return (

    <div className="bg-gray-100 max-w-[749px] h-[904px] p-0 shadow-lg rounded-lg flex flex-col justify-end ">
      <div className='pt-[0px] pr-[30px] pb-[0px] pl-[30px]'>
        {/* Sección de Perfiles de Usuario */}
        <div className="flex justify-center mb-12">
          <UserProfile name="Olmar" imageUrl={"https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid"} />
          <UserProfile name="Holger" imageUrl={"https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid"} />
          <UserProfile name="Luisa" imageUrl={"https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid"} />
          <UserProfile name="Josefina" imageUrl={"https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid"} />
          <UserProfile name="Witney" imageUrl={"https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid"} />
          <UserProfile name="Meta" imageUrl={"https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-gris-profilo-usuario-avatar-imagen-perfil-icono-persona-adecuado-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantilla-x9xa_719432-1256.jpg?semt=ais_hybrid"} />
        </div>

        {/* Tarjeta de Restaurante */}
        <RestaurantCard foodImage={"https://elikaeskola.com/wp-content/uploads/dieta-parchis-11-1024x683.jpg"} />
      </div>
      {/* {
        isActiveModal && <Modal/>
      }
         */}
      <Outlet/>
    </div>
  );
};

export default HomePage2;
