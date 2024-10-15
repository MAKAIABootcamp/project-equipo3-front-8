import CorazonBlancoIcon from '../../../assets/like/CorazonBlanco.png';
import DislikeIcon from '../../../assets/dislike/DislikeNormal.png';
import ShareIcon from '../../../assets/shareIcon/ShareHome.png'
import PuntovIcon from '../../../assets/navegacion/PuntosHome.png';

const RestaurantCard = ({ foodImage }) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="flex flex-col flex-nowrap bg-white rounded-lg shadow-lg font-titulo text-[14px] justify-center content-stretch" style={{ width: '470px', height: '722px' }}>
        {/* Información del restaurante y cliente */}
        <div className='pt-[10px] pr-[15px] pb-[0px] pl-[15px]'>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 flex-shrink-0 relative rounded-full p-[2px]" style={{ background: 'linear-gradient(65deg, rgba(255,0,102,1) 0%, rgba(94,0,190,1) 100%)' }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Restaurante"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="ml-3">
                <p className="font-bold text-sm">Hice Klent</p>
                <p className="text-xs text-gray-500">57 Reseñas</p>
              </div>
              <span className="mx-2">→</span>
              <div className="flex items-center">
                {/* Contenedor con borde y gradiente aplicado */}
                <div className="w-12 h-12 flex-shrink-0 relative rounded-full p-[2px]" style={{ background: 'linear-gradient(65deg, rgba(255,0,102,1) 0%, rgba(94,0,190,1) 100%)' }}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Restaurante"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="font-bold text-sm">Papas Jhons</p>
                  <p className="text-xs text-gray-500">Barranquilla</p>
                </div>
              </div>
            </div>
            <div className="text-red-500 text-lg font-bold flex-shrink-0">4.5 ★</div>
          </div>

          {/* Descripción del comentario */}
          <p className="mb-4 leading-1.2 font-normal text-negro-carbon">
            El restaurante sorprendió con sabores exquisitos. Probé un risotto cremoso de mariscos y una tarta de queso con frutos rojos. Servicio excelente y ambiente acogedor. ¡Definitivamente volveré!
          </p>

          {/* Botones */}
          <div className="flex flex-nowrap space-x-2 mb-4 font-bold">
            <button className="py-2.5 px-4 bg-morazul text-white rounded-[50px]">Excelente Servicio</button>
            <button className="py-2.5 px-4 bg-morazul text-white rounded-[50px]">Precios Bajos</button>
          </div>
        </div>

        {/* Imagen de la comida */}
        <div className="w-full h-[470px]">
          <img
            src={foodImage}
            alt="Imagen de la comida"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pie con íconos y fecha */}
        <div className="flex flex-nowrap justify-between items-center text-gray-500 text-xs font-bold w-full h-[57px]">
          <div className="flex items-center">
            <img src={CorazonBlancoIcon} alt="Corazón Rojo" className="w-4 h-4" />
            <p className="ml-1">100</p>
            <img src={DislikeIcon} alt="Corazón Rojo" className="w-4 h-4 ml-2" />
          </div>
          <div className="flex items-center space-x-4">
            <p className="">Sep 27 / 2024</p>
            <img src={ShareIcon} alt="Compartir" className="w-4 h-4" />
            <img src={PuntovIcon} alt="Puntos" className="w-4 h-4" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;