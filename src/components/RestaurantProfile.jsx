import Banner from "./RestaurantProfile/Banner";
import AvatarSection from "./RestaurantProfile/AvatarSection";
import DetailList from "./RestaurantProfile/DetailList";
//import IconList from "./RestaurantProfile/IconList";
import Gallery from "./RestaurantProfile/Gallery"

const RestaurantProfile = () => {

  return (
    <div className="mx-auto w-full max-w-[938px] " >
       <div>
          <Banner />
          <AvatarSection />
          <DetailList />
          {/* <IconList /> */}
          <Gallery/> 
       </div>
    </div>
  );
};

export default RestaurantProfile;
