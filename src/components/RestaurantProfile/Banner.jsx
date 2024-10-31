const Banner = ({ userBanner }) => {
  return (
    <div className="flex items-center justify-center w-full h-48 aspect-[4/3] overflow-hidden">
      {userBanner ? (
        <img
          src={userBanner}
          alt="Foto-Banner"
          className="w-full h-full object-cover cursor-pointer"
        />
      ) : (
        <div className="w-full h-full bg-gray-300" />
      )}
    </div>
  );
};

export default Banner;

  