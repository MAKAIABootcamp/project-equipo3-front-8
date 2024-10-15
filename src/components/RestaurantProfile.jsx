import Banner from "./RestaurantProfile/Banner";
import AvatarSection from "./RestaurantProfile/AvatarSection";
import DetailList from "./RestaurantProfile/DetailList";
import IconList from "./RestaurantProfile/IconList";
import Photos from "./RestaurantProfile/Photos"

const RestaurantProfile = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <Banner />
      <AvatarSection />
      <DetailList />
      <IconList />
      <Photos />
    </div>
  );
};

export default RestaurantProfile;
