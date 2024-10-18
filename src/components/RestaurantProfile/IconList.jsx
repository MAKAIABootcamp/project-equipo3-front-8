import Comida from '../../assets/User/comida.jfif'
import Mariscos from "../../assets/User/mariscos.jfif"
import Jaiba from "../../assets/User/jaiba.jpg"
import Pastel from "../../assets/User/pastel.webp"
import Bocachico from "../../assets/User/bocachico.jfif"
const IconList = () => {
  
  return (
    <div className="flex justify-center gap-4 mt-4">
      
     <img alt="" src= {Comida} className="w-14 h-14 rounded-full" />
     <img src={ Bocachico} alt=""  className="w-14 h-14 rounded-full" />
      <img src={Mariscos} alt="" className="w-14 h-14 rounded-full" />
      <img src={Jaiba} alt="" className="w-14 h-14 rounded-full"/>
      <img src={Pastel} alt="" className="w-14 h-14 rounded-full"/> 
   
    </div>
  );
};

export default IconList;
