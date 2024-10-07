const UserProfile = ({ name,imageUrl }) => {
    return (
      <div className="flex flex-col items-center mx-2">
        <div className="w-16 h-16 rounded-full border-4 border-pink-400 flex items-center justify-center">
          {/* Aquí puedes agregar la imagen del usuario */}
          <img 
            src={imageUrl} 
            alt={name} 
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <p className="text-sm mt-2 text-center">{name}</p>
      </div>
    );
  };

  export default UserProfile;