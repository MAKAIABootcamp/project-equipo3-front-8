import { useState, useEffect } from "react";
import "./PostCard.css";
import UserAvatar from "../User/UserAvatar";

import HeartIcon from "../../../assets/icons/core/heart_icon_outline.svg";
import HeartIconFilled from "../../../assets/icons/core/heart_icon_filled.svg";

import DislikeIcon from "../../../assets/icons/core/dislike_icon_outline.svg";
import DislikeIconFilled from "../../../assets/icons/core/dislike_icon_filled.svg";

import ShareIcon from "../../../assets/icons/core/share_icon_outline.svg";
import ShareIconFilled from "../../../assets/icons/core/share_icon_filled.svg";

import MoreIconVert from "../../../assets/icons/core/more_icon_vertical.svg";

import SmallArrowIcon from "../../../assets/icons/core/small_arrow_icon.svg";
import KidStarIcon from "../../../assets/icons/core/kid_star_icon_filled.svg";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { setLikesPost } from "../../../redux/post/postSlice";

const PostCard = ({
  foodImage,
  description,
  tags,
  restaurant = null,
  userPost = null,
  date,
  reviewScore,
  userReviews,
  likes,
  postId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formattedDate = date
    ? formatDistanceToNow(new Date(date), { addSuffix: true })
    : "";
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  const handleNavigateToProfile = (userType, username) =>
    navigate(`/profile/${userType}/${username}`);

  const handleLikes = () => {
    if (isAuthenticated) {
      dispatch(setLikesPost({ postId, userId: user?.id, likes }));
    } else {
      navigate("/login");
    }
  };
  return (
    <article>
      <div className="flex flex-col w-full h-auto rounded-xl text-[14px] mb-4 shadow-xl justify-start">
        <div className="pt-4 px-4">
          {/* Información del restaurante y cliente */}
          <div className="flex justify-between items-center w-full mb-3">
            <div className="flex items-center w-full">
              {/* Avatar del usuario */}
              <div className="flex items-center flex-shrink-0">
                <UserAvatar
                  srcAvatar={userPost?.userAvatar}
                  showStoryBorder={false}
                />
                <div className="ml-2">
                  <p className="font-bold text-sm capitalize">{userPost?.displayName}</p>
                  <p className="text-xs text-grey-dim">{`${userReviews} Reseñas`}</p>
                </div>
              </div>

              <figure className="mx-2">
                <SmallArrowIcon className="fill-grey-dim w-5" />
              </figure>

              {/* Avatar del restaurante */}
              <div
                className="flex items-center flex-shrink-0"
                onClick={() =>
                  handleNavigateToProfile("restaurant", restaurant?.username)
                }
              >
                <UserAvatar srcAvatar={restaurant?.userAvatar} showStoryBorder={false} />
                <div className="ml-2">
                  <p className="font-bold text-sm capitalize">{restaurant?.displayName}</p>
                  <p className="text-xs text-grey-dim capitalize">
                    {restaurant?.location?.city}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <KidStarIcon className="w-6 h-6 fill-principal" />
              <span className="text-[1rem] font-bold ml-1">
                {Number(reviewScore.toFixed(1))}
              </span>
            </div>
          </div>

          {/* Descripción del comentario */}
          <p className="text-negro-carbon text-sm mb-4 font-medium">
            {description}
          </p>

          {/* Botones - Tag */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tagObj, index) => (
              <button
                key={index}
                type="button"
                className="bg-morazul text-white px-4 py-2.5 rounded-full text-sm font-extrabold"
                title={`Categoría: ${tagObj.category}, Valor: ${tagObj.value}`}
              >
                {tagObj.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Imagen de la comida */}
        <div className="w-full aspect-square">
          <img
            src={foodImage}
            alt="Imagen de la comida"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pie con íconos y fecha */}
        <div className="flex justify-between items-center text-negro-carbon w-full h-[57px] px-4">
          <div className="flex items-center">
            <div
              className="flex items-center mr-2 pr-2 border-r-2"
              onClick={handleLikes}
            >
              {likes?.length && user?.id && likes?.some((item) => item === user.id) ? (
                <HeartIconFilled className="cursor-pointer" />
              ) : (
                <HeartIcon className="cursor-pointer" />
              )}

              <p className="ml-1 text-xs font-bold select-none">
                {likes?.length}
              </p>
            </div>
            {/* <DislikeIcon className="cursor-pointer" /> */}
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-500 text-xs font-medium tracking-wide font-nunito">
              {formattedDate}
            </p>
            {/* <ShareIcon className="cursor-pointer" />
            <MoreIconVert className="cursor-pointer" /> */}
          </div>
        </div>
      </div>
    </article>
  );
};

PostCard.propTypes = {
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

export default PostCard;
