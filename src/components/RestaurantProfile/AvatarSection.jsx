import Comida from "../../assets/User/mariscos.jfif"

const AvatarSection = () => {
  return (
    <div className="flex flex-col items-center justify-center -mt-[70px]">
      <div className="flex items-center flex-col justify-center">
        <img src={Comida} alt="" className="w-[150px] h-[150px] rounded-full items-center justify-center flex " />
        <h2 className="mt-4 text-center text-sm">@SaboresDelPacífico</h2>
        <p className=" font-black text-center">Restaurante Chocoano</p>
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-principal text-lg">★★★★★</span>
       
      </div>
      <div className="flex flex-col items-center justify-center cursor-normal"> 
        <span className="text-lg font-black leading-none ">2000</span>
        <span className="text-[10px] text-grey-dim font-bold">Reviews</span>
        </div>
    </div>
  );
};

export default AvatarSection;
