import Perfil from "../../assets/User/mariscos.jfif";

const AvatarSection = ({
  photo = Perfil,
  alt = "Foto de perfil",
  likes = 0,
  dislikes = 0,
  comments = [],
  username = "SaboresDelPacífico",
  displayName = "Restaurante Chocoano",
  reviews=0
}) => {
  return (
    <div className="flex flex-col items-center justify-center -mt-[70px]">
      {/* Foto de perfil */}
      <div className="relative w-32 h-32  items-center flex-col justify-center rounded-full overflow-hidden mx-auto mt-18 border-4 border-white cursor-pointer">
        <img
          src={photo}
          alt={alt}
          className="w-full h-full object-cover"
          onClick={() =>
            openModal(
              { src: photo, alt: alt, likes: likes, dislikes, comments },
              "perfil"
            )
          }
        />
      </div>

      <div className="flex flex-col items-center mt-2">
        <h2 className="mt-4 text-center text-sm">@{username}</h2>
        <p className=" font-black text-center">{ displayName}</p>
        <span className="text-principal text-lg">★★★★★</span>
      </div>
      <div className="flex flex-col items-center justify-center cursor-normal">
        <span className="text-lg font-black leading-none ">{reviews }</span>
        <span className="text-[10px] text-grey-dim font-bold">Reviews</span>
      </div>
    </div>
  );
};

export default AvatarSection;
