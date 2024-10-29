// src/pages/SettingsPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import UserSettings from '../components/Setting/UserSettings';
import RestaurantSettings from '../components/Setting/restaurantSettings';

const UserSettingPage = () => {
  const { userType } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-11/12 md:w-3/5 lg:w-2/5 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Configuración</h1>
        {userType === 'restaurant' ? <RestaurantSettings /> : <UserSettings />}
      </div>
    </div>
  );
};

export default UserSettingPage;
