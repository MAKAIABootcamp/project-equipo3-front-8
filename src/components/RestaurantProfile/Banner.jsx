import Choco from "../../assets/User/choco.jpg"

const Banner = () => {
  return (
     <div className="flex items-center justify-center w-full h-40 aspect-[4/3] overflow-hidden"> 
      <img src={Choco} alt="banner" className="w-full object-cover items-center  " />
    </div>
    );
  };
  
export default Banner;
  