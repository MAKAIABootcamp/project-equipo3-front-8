import Borojo from "../../assets/User/choco.jpg"
import Comida from "../../assets/User/comida.jfif"
import Mariscos from "../../assets/User/mariscos.jfif"
import Jaiba from "../../assets/User/jaiba.jpg"
import Pastel from "../../assets/User/pastel.webp"
import Bocachico from "../../assets/User/bocachico.jfif"
const Gallery = () => {
     
  return (
    <div className="grid grid-cols-3 gap-2 mt-6">
      <img src={Borojo} alt="img-banner" className="w-full h-32 object-cover rounded-lg" />
      <img src={Comida} alt=""  className="w-full h-32 object-cover rounded-lg" />
      <img src={Mariscos} alt="" className="w-full h-32 object-cover rounded-lg" />
      <img src={Jaiba} alt="" className="w-full h-32 object-cover rounded-lg" />
      <img src={Pastel} alt="" className="w-full h-32 object-cover rounded-lg"/>
      <img src={Bocachico} alt="" className="w-full h-32 object-cover rounded-lg" />
    </div>
  );
};

export default Gallery;
