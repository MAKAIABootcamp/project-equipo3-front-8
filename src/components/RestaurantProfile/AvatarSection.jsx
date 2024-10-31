import Perfil from "../../assets/User/mariscos.jfif";
import UserIconAlt from "../../assets/icons/core/person_icon_filled.svg"

const AvatarSection = ({
  photo,
  alt = "Foto de perfil",
  likes = 0,
  dislikes = 0,
  comments = [],
  username = "SaboresDelPacífico",
  displayName = "Restaurante Chocoano",
  // reviews = 0,
  // score,
}) => {
  const defaultBgColor = "bg-gray-300"; // Cambia este color según tus preferencias

  return (
    <div className="flex flex-col items-center justify-center -mt-[70px]">
      {/* Foto de perfil */}
      <div
        className={` bg-blanco-marino  relative w-32 h-32 flex items-center justify-center rounded-full overflow-hidden mx-auto mt-18 border-4 border-white cursor-pointer ${
          photo ? "" : defaultBgColor
        }`}
        onClick={() =>
          openModal(
            { src: photo || Perfil, alt, likes, dislikes, comments },
            "perfil"
          )
        }
      >
        {photo ? (
          <img
            src={photo}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIconAlt className="text-grey-basic text-4xl" /> // Icono de usuario en blanco
        )}
      </div>

      <div className="flex flex-col items-center mt-2">
        <h2 className="mt-4 text-center text-sm">@{username}</h2>
        <p className="font-black text-center capitalize">{displayName}</p>
      </div>
    </div>
  );
};

export default AvatarSection;
