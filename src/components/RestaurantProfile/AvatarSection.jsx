import Perfil from "../../assets/User/mariscos.jfif"

const AvatarSection = () => {
  return (
    <div className="flex flex-col items-center justify-center -mt-[70px]">
      {/* Foto de perfil */}
      <div className="relative w-32 h-32  items-center flex-col justify-center rounded-full overflow-hidden mx-auto mt-18 border-4 border-white cursor-pointer">
        <img
          src={Perfil}
          alt="Perfil"
          className="w-full h-full object-cover"
          onClick={() =>
            openModal({ src: Perfil, alt: "Foto de Perfil", likes: 100, dislikes: 2, comments: [] }, "perfil")
          }
        />        
        
      </div>     
        
      <div className="flex flex-col items-center mt-2">
        <h2 className="mt-4 text-center text-sm">@SaboresDelPacífico</h2>
         <p className=" font-black text-center">Restaurante Chocoano</p>
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
