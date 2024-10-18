import Banner from "./RestaurantProfile/Banner";
import AvatarSection from "./RestaurantProfile/AvatarSection";
import DetailList from "./RestaurantProfile/DetailList";
import IconList from "./RestaurantProfile/IconList";
import Gallery from "./RestaurantProfile/Gallery"

const RestaurantProfile = () => {

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden" >
       <div>
          <Banner />
          <AvatarSection />
          <DetailList />
          <IconList />
          <Gallery/> 
       </div>
    </div>
  );
};

export default RestaurantProfile;
