const AvatarSection = () => {
  return (
    <div className="flex flex-col items-center -mt-12">
      <div className="w-24 h-24 bg-gray-400 rounded-full" />
      <h2 className="text-xl font-bold mt-4">Josefina Valoyes</h2>
      <p className="text-sm text-gray-500">Regular Person</p>
      <div className="flex items-center mt-2">
        <span className="text-principal text-lg">★★★★★</span>
        <span className="ml-2 text-gray-500">2000 Reviews</span>
      </div>
    </div>
  );
};

export default AvatarSection;
