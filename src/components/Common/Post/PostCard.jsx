import {useState, useEffect} from 'react'
import PuntovIcon from '../../../assets/navegacion/PuntosHome.png';
import './PostCard.css';
import UserAvatar from '../User/UserAvatar';

import HeartIcon from '../../../assets/icons/core/heart_icon_outline.svg';
import HeartIconFilled from '../../../assets/icons/core/heart_icon_filled.svg';

import DislikeIcon from '../../../assets/icons/core/dislike_icon_outline.svg';
import DislikeIconFilled from '../../../assets/icons/core/dislike_icon_filled.svg';

import ShareIcon from '../../../assets/icons/core/share_icon_outline.svg';
import ShareIconFilled from '../../../assets/icons/core/share_icon_filled.svg';

import MoreIconVert from '../../../assets/icons/core/more_icon_vertical.svg';

import SmallArrowIcon from '../../../assets/icons/core/small_arrow_icon.svg';
import KidStarIcon from '../../../assets/icons/core/kid_star_icon_filled.svg';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { getRestaurantById } from '../../../redux/restaurants/restaurantSlice';

const RestaurantCard = ({ foodImage, description, tags, restaurantId }) => {
  const dispatch = useDispatch()
  const [restaurant, setRestaurant] = useState(null)

  async function getRestaurants() {
    const restaurants = await dispatch(getRestaurantById(restaurantId))
    setRestaurant(restaurants.payload)
    console.log("restaurants.payload", restaurants.payload)
  }

  useEffect(()=>{
    getRestaurants()
  },[])

  console.log(tags);
  return (
    <article>
      <div className="flex flex-col w-full h-auto rounded-xl text-[14px] mb-4 shadow-xl justify-start">
        <div className="pt-4 px-4">
          {/* Información del restaurante y cliente */}
          <div className="flex justify-between items-center w-full mb-3">
            <div className="flex items-center w-full">
              {/* Avatar del usuario */}
              <div className="flex items-center flex-shrink-0">
                <UserAvatar srcAvatar={foodImage} showStoryBorder={true} />
                <div className="ml-2">
                  <p className="font-bold text-sm">Hice Klent</p>
                  <p className="text-xs text-grey-dim">57 Reseñas</p>
                </div>
              </div>

              <figure className="mx-2">
                <SmallArrowIcon className="fill-grey-dim w-5" />
              </figure>

              {/* Avatar del restaurante */}
              <div className="flex items-center flex-shrink-0">
                <UserAvatar srcAvatar={foodImage} showStoryBorder={false} />
                <div className="ml-2">
                  <p className="font-bold text-sm">{restaurant?.displayName}</p>
                  <p className="text-xs text-grey-dim">{restaurant?.location?.city}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <KidStarIcon className="w-6 h-6 fill-principal" />
              <span className="text-[1rem] font-bold ml-1">4.5</span>
            </div>
          </div>

          {/* Descripción del comentario */}
          <p className="text-negro-carbon text-sm mb-4 font-medium">
            {description}
          </p>

          {/* Botones - Tag */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tagObj, index) => (
              <button
                key={index}
                type="button"
                className="border px-4 py-2 rounded-full bg-purple-500 text-white"
                title={`Categoría: ${tagObj.category}, Valor: ${tagObj.value}`}
              >
                {tagObj.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Imagen de la comida */}
        <div className="w-full aspect-square">
          <img src={foodImage} alt="Imagen de la comida" className="w-full h-full object-cover" />
        </div>

        {/* Pie con íconos y fecha */}
        <div className="flex justify-between items-center text-negro-carbon w-full h-[57px] px-4">
          <div className="flex items-center">
            <div className="flex items-center mr-2 pr-2 border-r-2">
              <HeartIcon className="cursor-pointer" />
              <p className="ml-1 text-xs font-bold select-none">100</p>
            </div>
            <DislikeIcon className="cursor-pointer" />
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


RestaurantCard.propTypes = {
  foodImage: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RestaurantCard;
