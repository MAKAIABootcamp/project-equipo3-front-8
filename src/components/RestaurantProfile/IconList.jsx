const icons = [1, 2, 3, 4]; 

const IconList = () => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="w-12 h-12 bg-gray-400 rounded-full"
        />
      ))}
    </div>
  );
};

export default IconList;
