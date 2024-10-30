import React from 'react';
import { useSelector} from 'react-redux';
import UserSettings from '../components/Setting/UserSettings';
import RestaurantSettings from '../components/Setting/restaurantSettings';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


const UserSettingPage = () => {
  const navigate = useNavigate(); // Hook de navegación
  const { userType } = useSelector((state) => state.profile);

  const handleSave = () => {
    navigate(`/:username${userType}`); // Redirigir al perfil tras guardar
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-11/12 md:w-3/5 lg:w-2/5 bg-white p-8 rounded-xl shadow-lg">
        <button
        //  onClick={() => navigate("/setting")}
         className="text-3xl font-bold mb-6"
        >
          Configuración
        </button>
        {userType === 'restaurant' ? (
          <RestaurantSettings onSave={handleSave} />
        ) : (
          <UserSettings onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default UserSettingPage;
