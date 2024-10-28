import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostReviewIcon from "../../../../assets/icons/core/post_review_icon.svg";
import "./PostReviewButton.css";

const PostReviewButton = ({ location }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const restaurant = useSelector((state) => state.authRestaurant.restaurant);

   const handlePostReviewNavigate = () => {
     if (isAuthenticated || restaurant) {
       navigate("/new-review", { state: { background: location } });
     } else {
       navigate("/login");
     }
   };

  return (
    <button
      onClick={handlePostReviewNavigate}
      aria-label="Publicar una reseña"
      className="
    min-w-[50px] lg:w-full 
    h-[50px]
    relative
    text-white
    flex
    items-center
    justify-center
    rounded-full
    active:shadow-[0_0_0_6px_#ff77ad8b]
    active:scale-95
    hover:shadow-[0_0_0_4px_#ff77ad8b]
    
    transition-transform 
        duration-200
    animated-gradient-bg

    
  "
    >
      <div className="w-[104px] flex items-center justify-center leading-[50px]">
        <PostReviewIcon className="lg:mr-3 w-[26px] h-[26px]" />
        <span className="hidden lg:block text-lg font-bold">Postear</span>
      </div>
    </button>
  );
};

export default PostReviewButton;
