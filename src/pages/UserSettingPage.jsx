import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { updateUserProfile, uploadImageAndUpdateProfile } from '../redux/setting/profileSlice'

const UserSettingPage = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const formik = useFormik({
      initialValues: {
    displayName: user?.displayName || '',
    username: user?.username || '',
    userDescription: user?.userDescription || '',
    website: user?.website || '',
    birthday: user?.birthday || '',
    gender: user?.gender || '',
    location: { 
      city: user?.location?.city || '', 
      country: user?.location?.country || '', 
      state: user?.location?.state || '', 
      street: user?.location?.street || ''
    },
    notificationsEnabled: user?.notificationsEnabled ?? true, // Deja `true` si no tiene valor
    avatar: user?.avatar || '',
    banner: user?.banner || '',
  },
    validationSchema: Yup.object({
      bio: Yup.string().max(150, 'La bio no puede exceder 150 caracteres'),
      website: Yup.string().url('El URL del sitio debe ser válido').nullable(),
      gender: Yup.string().required('Selecciona tu género'),
    }),
    onSubmit: async (values) => {
      dispatch(updateUserProfile(values));
      console.log('Datos guardados:', values);
    },
  });

  const handleFileChange = async (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Llama al thunk para subir imagen a Cloudinary y actualizar Firestore
    dispatch(uploadImageAndUpdateProfile({ file, imageType }));
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-11/12 md:w-3/5 lg:w-2/5 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Configuración</h1>
        {/* {userType === 'restaurant' ? <RestaurantSettings /> : <UserSettings />} */}
        <form onSubmit={formik.handleSubmit}>
          {/* Foto de Perfil */}
          <div className="flex items-center mb-6">
            <div className="relative">
              <img
                src={user?.userAvatar || 'default-avatar-url'}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <input
                type="file"
                id="avatar"
                className="hidden "
                onChange={(e) => handleFileChange(e, 'avatar')}
              />
              <button
                type="button"
                className="ml-2 bg-principal p-2 rounded-lg text-blanco-puro hover:underline"
                onClick={() => document.getElementById('avatar').click()}
              >
                Cambiar foto
              </button>
            </div>
          </div>
          {/* Cambiar userName */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Nombre de Usuario</label>
            <input
              name="username"
              type="text"
              className="w-64 px-4 py-2 border rounded-lg"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <button
              type="button"
              className="ml-4 absolute bg-principal text-blanco-puro hover:underline rounded-lg p-2"
              onClick={() => document.getElementById('username').click()}
            >
              Cambiar
            </button>
          </div>

          {/* Foto de Portada */}
          <div className="mb-6">
            <img
              src={user?.userBanner || 'default-banner-url'}
              alt="banner"
              className="w-full h-32 object-cover rounded-lg"
            />
            <input
              type="file"
              id="banner"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'userBanner')}
            />
            <button
              type="button"
              className="mt-2 bg-principal rounded-lg text-blanco-puro p-2 hover:underline"
              onClick={() => document.getElementById('banner').click()}
            >
              Cambiar banner
            </button>
          </div>
          {/* cumpleaños*/}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Fecha de Cumpleaños</label>
            <input
              name="birthday"
              type='date'
              className="w-64 px-4 py-2 text-gray-500 border rounded-lg"
              onChange={formik.handleChange}
              value={formik.values.birthday}
            />
            <button
              type="button"

              className="ml-4 absolute bg-principal text-blanco-puro hover:underline rounded-lg p-2"
              onClick={() => document.getElementById('username').click()}
            >
              Agregar
            </button>
          </div>
          {/* Location*/}
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Información de Dirección</h2>

          {/* Campo de Ciudad */}
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-600 mb-1">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="location.city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location.city}
              className={`w-full px-3 py-2 border ${formik.touched.location?.city && formik.errors.location?.city
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {formik.touched.location?.city && formik.errors.location?.city && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location.city}</div>
            )}
          </div>

          {/* Campo de País */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-600 mb-1">
              País
            </label>
            <input
              type="text"
              id="country"
              name="location.country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location.country}
              className={`w-full px-3 py-2 border ${formik.touched.location?.country && formik.errors.location?.country
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {formik.touched.location?.country && formik.errors.location?.country && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location.country}</div>
            )}
          </div>

          {/* Campo de Estado */}
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-600 mb-1">
              Estado
            </label>
            <input
              type="text"
              id="state"
              name="location.state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location.state}
              className={`w-full px-3 py-2 border ${formik.touched.location?.state && formik.errors.location?.state
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {formik.touched.location?.state && formik.errors.location?.state && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location.state}</div>
            )}
          </div>

          {/* Campo de Calle */}
          <div className="mb-6">
            <label htmlFor="street" className="block text-gray-600 mb-1">
              Calle
            </label>
            <input
              type="text"
              id="street"
              name="location.street"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location.street}
              className={`w-full px-3 py-2 border ${formik.touched.location?.street && formik.errors.location?.street
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {formik.touched.location?.street && formik.errors.location?.street && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location.street}</div>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-principal text-white py-2 rounded-md hover:bg-principal transition-colors"
          >
            Enviar
          </button>

          {/* Bio */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Presentación</label>
            <textarea
              name="userDescription"
              className="w-full px-4 py-2 border rounded-lg"
              maxLength={150}
              onChange={formik.handleChange}
              value={formik.values.userDescription}
            />
            <p className="text-sm text-right text-gray-500">
              {formik.values.userDescription.length} / 150
            </p>
          </div>

          {/* Sitio Web */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Sitio Web</label>
            <input
              name="website"
              type="url"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={formik.handleChange}
              value={formik.values.website}
            />
          </div>

          {/* Género */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Género</label>
            <select
              name="gender"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value="">Selecciona</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
                                           

          {/* Notificaciones */}
          <div className="flex items-center justify-between mb-6">
            <label className="font-semibold">Sugerencias de cuentas</label>
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={formik.values.notificationsEnabled}
              onChange={formik.handleChange}
              className="w-6 h-6 bg-principal"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-principal text-blanco-puro py-2 rounded-lg hover:bg-principal"
          >
            Guardar cambios
          </button>
        </form>
      </div>

    </div>
  );
};

export default UserSettingPage;
