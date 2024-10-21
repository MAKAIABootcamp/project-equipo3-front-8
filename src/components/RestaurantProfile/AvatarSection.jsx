import Comida from "../../assets/User/mariscos.jfif"

const AvatarSection = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="flex items-center flex-col justify-center">
        <img src={Comida} alt="" className="w-32 h-32 rounded-full items-center justify-center flex " />
        <h2 className="text-xl font-bold mt-4 text-center">Sabores Del Pacífico</h2>
        <p className="text-sm text-grey-dim text-center">Restaurante Chocoano</p>
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-principal text-lg">★★★★★</span>
        <span className="ml-2  text-gray-500">2000 Reviews</span>
      </div>
    </div>
  );
};

export default AvatarSection;
