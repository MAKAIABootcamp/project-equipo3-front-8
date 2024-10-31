
import StarHalfIcon from "../../../assets/icons/core/star_half_icon.svg";
import StarIconFilled from "../../../assets/icons/core/star_icon_filled.svg";

const StarsRaiting = ({ rating = { stars: 0, message: "Insuficientes reseñas recientes para asignar estrellas. Se requieren al menos 30 reseñas en los últimos 6 meses." } }) => {
    // Generamos un array de 5 elementos para las estrellas
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        // Lógica para determinar el tipo de estrella
        if (rating.stars >= starValue) {
            return <StarIconFilled key={index} className="text-yellow-400" />; // Estrella llena
        } else if (rating.stars >= starValue - 0.5) {
            return <StarHalfIcon key={index} className="text-yellow-400" />; // Media estrella
        }
        return null; // No renderizar nada si no es una estrella llena o media estrella
    });

    return (
        <div className="flex space-x-1 justify-center font-semibold">
            {rating.stars > 0 ? stars : <p className="text-gray-600">{rating.message}</p>}
        </div>
    );
};


export default StarsRaiting;
