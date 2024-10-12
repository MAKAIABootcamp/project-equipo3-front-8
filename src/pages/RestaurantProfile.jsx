import React from 'react';

const RestaurantProfile = () => {
  return (
    <div className="flex flex-col items-center p-4">
      {/* Banner superior */}
      <div className="w-full h-48 bg-gray-300 mb-6"></div>

      {/* Imagen de perfil */}
      <div className="relative -top-20 mb-4">
        <div className="w-32 h-32 bg-gray-400 rounded-full border-4 border-white"></div>
      </div>

      {/* Información principal */}
      <div className="text-center">
        <h1 className="text-lg font-bold">Restaurante Ejemplo</h1>
        <h2 className="text-red-500">⭐⭐⭐⭐⭐</h2>
        <div className="flex justify-center space-x-4 text-sm mt-2">
          <span>5 Publicaciones</span>
          <span>2000 Seguidores</span>
          <span>0 Siguiendo</span>
        </div>
      </div>

      {/* Detalles de contacto */}
      <div className="border rounded-lg p-4 mt-6 w-full max-w-md">
        <div className="flex justify-around text-sm">
          <span>📞 +57 324 608 7758</span>
          <span>📍 Barranquilla</span>
          <span>🌐 www.restaurante.com</span>
        </div>
      </div>

      {/* Sección inferior (tres tarjetas) */}
      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-lg">
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
        <div className="bg-gray-300 h-32"></div>
      </div>
    </div>
  );
};

export default RestaurantProfile;