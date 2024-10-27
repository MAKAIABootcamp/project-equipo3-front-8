import Banner from "./RestaurantProfile/Banner";
import AvatarSection from "./RestaurantProfile/AvatarSection";
import DetailList from "./RestaurantProfile/DetailList";
import Gallery from "./RestaurantProfile/Gallery"


const RestaurantProfile = () => {

  return (
    <div className="mx-auto  w-full  md:w-1/2 lg:w-1/3" >
      <div>
        <Banner />
        <AvatarSection />
  
        <DetailList />          
        <Gallery/> 
      </div>
    </div>
  );
};

export default RestaurantProfile;
