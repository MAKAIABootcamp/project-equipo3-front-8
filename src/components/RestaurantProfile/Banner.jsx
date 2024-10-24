import FotoBanner from "../../assets/User/choco.jpg"

const Banner = () => {
  return (
     <div className="flex items-center justify-center w-full aspect-[4/3] overflow-hidden"> 
       <div className="w-full h-90 ">
         <img
            src={FotoBanner}
           alt="Foto-Banner"
            className="w-full h-full object-cover cursor-pointer"
           onClick={() =>
             openModal({ src: Banner, alt: "Foto de Banner", likes: 50, dislikes: 5, comments: [] }, "banner")
          }
          />
      </div>
    </div>
    );
  };
  
export default Banner;
  