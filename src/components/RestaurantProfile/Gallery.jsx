const Gallery = () => {
    const images = [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ]; 
  return (
    <div className="grid grid-cols-3 gap-2 mt-6">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery ${index}`}
          className="w-full h-32 object-cover rounded-lg"
        />
      ))}
    </div>
  );
};

export default Gallery;
