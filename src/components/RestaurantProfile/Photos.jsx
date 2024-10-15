const Photos = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-32 bg-gray-300 rounded-lg"
          />
        ))}
    </div>
  );
};

export default Photos;
