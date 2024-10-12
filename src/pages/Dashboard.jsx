const Home = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full border-2 border-pink-500">
            {/* Imagen del cliente */}
            <img
              src="https://via.placeholder.com/100"
              alt="Cliente"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <p className="font-bold">Hice Klent</p>
            <p className="text-sm text-gray-500">57 Reseñas</p>
          </div>
          <span className="mx-4">→</span>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full border-2 border-purple-500">
              {/* Imagen del restaurante */}
              <img
                src="https://via.placeholder.com/100"
                alt="Restaurante"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <p className="font-bold">Papas Jhons</p>
              <p className="text-sm text-gray-500">Barranquilla</p>
            </div>
          </div>
        </div>
        <div className="text-red-500 text-xl font-bold">4.5 ★</div>
      </div>
      <p className="mt-4 text-gray-600">
        El restaurante sorprendió con sabores exquisitos. Probé un risotto cremoso de mariscos y una tarta de queso con frutos rojos. Servicio excelente y ambiente acogedor. ¡Definitivamente volveré!
      </p>

      {/* Imagen de la comida */}
      <div className="mt-4">
        <img
          src={ foodImage }
          alt="Imagen de la comida"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button className="bg-purple-500 text-white py-2 px-4 rounded-lg">Excelente Servicio</button>
        <button className="bg-pink-500 text-white py-2 px-4 rounded-lg">Precios Bajos</button>
      </div>
      <div className="flex justify-between mt-6 text-gray-500">
        <div className="flex items-center">
          <span>💖</span>
          <p className="ml-2">100</p>
        </div>
        <p>Sep 27 / 2024</p>
        <span>🔗</span>
      </div>
    </div>
  )
}


export default Home