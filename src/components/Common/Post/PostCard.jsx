
import PuntovIcon from '../../../assets/navegacion/PuntosHome.png';
import './PostCard.css';
import UserAvatar from '../User/UserAvatar';

import HeartIcon from '../../../assets/icons/core/heart_icon_outline.svg'
import HeartIconFilled from '../../../assets/icons/core/heart_icon_filled.svg'

import DislikeIcon from '../../../assets/icons/core/dislike_icon_outline.svg'
import DislikeIconFilled from '../../../assets/icons/core/dislike_icon_filled.svg'

import ShareIcon from '../../../assets/icons/core/share_icon_outline.svg'
import ShareIconFilled from '../../../assets/icons/core/share_icon_filled.svg'

import MoreIconVert from '../../../assets/icons/core/more_icon_vertical.svg'

import SmallArrowIcon from '../../../assets/icons/core/small_arrow_icon.svg'
import KidStarIcon from '../../../assets/icons/core/kid_star_icon_filled.svg'

const RestaurantCard = ({ foodImage }) => {


  return (

    <article >

      <div className="flex flex-col w-full h-full postMinWhit aspect-[2/3] rounded-xl  text-[14px] max-h-[722px] mb-2 shadow-xl justify-start">

        <div className='pt-[10px] px-4 pb-[0px] '>

          {/* Información del restaurante y cliente */}
          <div className="flex justify-start items-center w-full mb-3 ">
            <div className="flex items-center self-auto w-full">


              <div className="flex items-center">
                <UserAvatar srcAvatar={foodImage} showStoryBorder={true} />


                <div className="">
                  <p className="font-bold text-sm ">Hice Klent</p>
                  <p className="text-xs text-grey-dim ">57 Reseñas</p>
                </div>
              </div>
              <figure className="mx-2"><SmallArrowIcon className="fill-grey-dim w-5" /></figure>

              <div className="flex items-center">
                <UserAvatar srcAvatar={foodImage} showStoryBorder={false} />

                <div className="">
                  <p className="font-bold text-sm ">Papas Jhons</p>
                  <p className="text-xs text-grey-dim ">Barranquilla</p>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0">
              <KidStarIcon className="w-6 h-6 fill-principal" />
              <span className='text-[1rem] font-goldplay text-negro-carbon ml-1 '> 4.5 </span>
            </div>
          </div>

          {/* Descripción del comentario */}
          <p className="  text-negro-carbon text-sm mb-4 font-medium">
            El restaurante sorprendió con sabores exquisitos. Probé un risotto cremoso de mariscos y una tarta de queso con frutos rojos. Servicio excelente y ambiente acogedor. ¡Definitivamente volveré!
          </p>

          {/* Botones */}
          <div className="flex flex-nowrap space-x-2 mb-4 font-bold">
            <span className="py-2.5 px-4 border border-violet-300 text-violet-600 rounded-full text-xs font-black">Excelente Servicio</span>
            <span className="py-2.5 px-4 border border-violet-300 text-violet-600 rounded-full text-xs font-black">Precios Bajos</span>
          </div>
        </div>

        {/* Imagen de la comida */}
        <div className="w-full  aspect-square">
          <img
            src={foodImage}
            alt="Imagen de la comida"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pie con íconos y fecha */}
        <div className="flex flex-nowrap justify-between items-center text-negro-carbon  w-full h-[57px] px-4">
          <div className="flex items-center">
            <div className='flex items-center mr-2 pr-2 border-r-2'>
              <HeartIcon className=" cursor-pointer" />
              <p className="ml-1 text-xs font-bold select-none">100</p>
            </div>
            <DislikeIcon className=" cursor-pointer" />
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-[10px]">Sep 27 / 2024</p>
            <ShareIcon className="cursor-pointer" />
            <MoreIconVert className="cursor-pointer" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default RestaurantCard;