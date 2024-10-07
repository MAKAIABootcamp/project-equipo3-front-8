const UserProfile = ({ name,imageUrl }) => {
    return (
      <div className="flex flex-col items-center mx-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 p-[4px]" style={{ background: 'linear-gradient(65deg, rgba(255,0,102,1) 0%, rgba(94,0,190,1) 100%)' }}>
          {/* Aquí puedes agregar la imagen del usuario */}
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            <img 
              src={imageUrl} 
              alt={name} 
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="text-sm mt-2 text-center">{name}</p>
      </div>
    );
  };

  export default UserProfile;