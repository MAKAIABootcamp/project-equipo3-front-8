// src/components/RestaurantSettings.js
import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../../redux/setting/profileSlice';

const RestaurantSettings = () => {
  const dispatch = useDispatch();
  const { restaurantInfo } = useSelector((state) => state.profile);

  const formik = useFormik({
    initialValues: restaurantInfo,
    onSubmit: (values) => {
      dispatch(setProfileData({ restaurantInfo: values }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Menú */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Menú</label>
        <textarea
          name="menu"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={formik.handleChange}
          value={formik.values.menu}
        />
      </div>

      {/* Horario */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Horario</label>
        <input
          name="hours"
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={formik.handleChange}
          value={formik.values.hours}
        />
      </div>

      {/* Ubicación */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Ubicación</label>
        <input
          name="location"
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-principal text-white py-2 rounded-lg hover:bg-principal"
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default RestaurantSettings;
