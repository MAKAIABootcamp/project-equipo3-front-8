// src/components/UserSettings.js
import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { setProfileData } from '../../redux/setting/profileSlice';
import { storage } from '../../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserSettings = () => {
  const dispatch = useDispatch();
  const { profilePhoto, coverPhoto, bio, website, gender, notificationsEnabled } = useSelector(
    (state) => state.profile
  );

  const formik = useFormik({
    initialValues: {
      bio: bio || '',
      website: website || '',
      gender: gender || '',
      notificationsEnabled: notificationsEnabled,
      avatar: null,
      banner: null,
    },
    validationSchema: Yup.object({
      bio: Yup.string().max(150, 'La bio no puede exceder 150 caracteres'),
      website: Yup.string().url('El URL del sitio debe ser válido').nullable(),
      gender: Yup.string().required('Selecciona tu género'),
    }),
    onSubmit: async (values) => {
      dispatch(setProfileData(values));
      console.log('Datos guardados:', values);
    },
  });

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `${field}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      dispatch(setProfileData({ [field]: url }));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Foto de Perfil */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <img
            src={profilePhoto || 'default-avatar-url'}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={(e) => handleFileChange(e, 'profilePhoto')}
          />
          <button
            type="button"
            className="ml-4 text-blue-500 hover:underline"
            onClick={() => document.getElementById('avatar').click()}
          >
            Cambiar foto
          </button>
        </div>
      </div>

      {/* Foto de Portada */}
      <div className="mb-6">
        <img
          src={coverPhoto || 'default-banner-url'}
          alt="banner"
          className="w-full h-32 object-cover rounded-lg"
        />
        <input
          type="file"
          id="banner"
          className="hidden"
          onChange={(e) => handleFileChange(e, 'coverPhoto')}
        />
        <button
          type="button"
          className="mt-2 text-blue-500 hover:underline"
          onClick={() => document.getElementById('banner').click()}
        >
          Cambiar banner
        </button>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Presentación</label>
        <textarea
          name="bio"
          className="w-full px-4 py-2 border rounded-lg"
          maxLength={150}
          onChange={formik.handleChange}
          value={formik.values.bio}
        />
        <p className="text-sm text-right text-gray-500">
          {formik.values.bio.length} / 150
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
          className="w-6 h-6"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default UserSettings;
