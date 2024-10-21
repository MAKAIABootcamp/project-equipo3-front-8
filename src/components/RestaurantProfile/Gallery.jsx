import Borojo from "../../assets/User/choco.jpg"
import Comida from "../../assets/User/comida.jfif"
import Mariscos from "../../assets/User/mariscos.jfif"
import Jaiba from "../../assets/User/jaiba.jpg"
import Pastel from "../../assets/User/pastel.webp"
import Bocachico from "../../assets/User/bocachico.jfif"
const Gallery = () => {
     
  return (
    <div className="grid grid-cols-3 w-full gap-0.5 mt-6">
      <img src={Borojo} alt="img-banner" className="aspect-square w-full  object-cover " />
      <img src={Comida} alt=""  className="aspect-square w-full   object-cover " />
      <img src={Mariscos} alt="" className="aspect-square w-full  object-cover " />
      <img src={Jaiba} alt="" className="aspect-square w-full  object-cover " />
      <img src={Pastel} alt="" className="aspect-square w-full  object-cover "/>
      <img src={Bocachico} alt="" className="aspect-square w-full object-cover " />
    </div>
  );
};

export default Gallery;
