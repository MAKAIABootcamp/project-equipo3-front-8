import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Settings = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      bio: '',
      gender: '',
      website: '',
      notificationsEnabled: true,
      avatar: null,
      banner: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('El nombre de usuario es requerido'),
      bio: Yup.string().max(150, 'La bio no puede exceder 150 caracteres'),
      gender: Yup.string().required('El género es requerido'),
      website: Yup.string().url('El URL del sitio debe ser válido').nullable(),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // Esta función maneja el cambio de archivo (cuando el usuario selecciona una imagen)
  const handleFileChange = (e, field) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue(field, file);
    }
  };

  // Función para disparar el input file cuando el botón "Cambiar foto" es clicado
  const handleClickFileInput = (inputId) => {
    document.getElementById(inputId).click();
  };

  return (
    <div className="flex justify-center items-start py-10 bg-gray-100">
      <div className="w-11/12 lg:w-3/5 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Configuración</h1>

        {/* Profile section */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : 'default-avatar-url'}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            {/* Input para seleccionar una nueva foto de perfil */}
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'avatar')}
              className="hidden"  // Lo ocultamos pero sigue siendo funcional
            />
          </div>
          <div className="ml-4">
            <p className="font-semibold">{formik.values.username || 'lui.tamayo27'}</p>
            {/* Botón para cambiar la foto de perfil */}
            <button
              type="button"
              className="mt-2 text-sm text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition duration-300"
              onClick={() => handleClickFileInput('avatar')}  // Disparamos el click en el input de archivo
            >
              Cambiar foto
            </button>
          </div>
        </div>

        {/* Banner section */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Cambiar banner</label>
          <div className="relative">
            <img
              src={formik.values.banner ? URL.createObjectURL(formik.values.banner) : 'default-banner-url'}
              alt="banner"
              className="w-full h-32 rounded-lg object-cover"
            />
            {/* Input para seleccionar un nuevo banner */}
            <input
              id="banner"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'banner')}
              className="hidden"  // Lo ocultamos pero sigue siendo funcional
            />
            {/* Botón para cambiar el banner */}
            <button
              type="button"
              className="mt-2 w-full text-sm text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition duration-300"
              onClick={() => handleClickFileInput('banner')}  // Disparamos el click en el input de archivo
            >
              Cambiar banner
            </button>
          </div>
        </div>

        {/* Resto del formulario */}
        <div className="mb-6">
          <label htmlFor="website" className="block font-semibold mb-2">
            Sitio web
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://tu-sitio-web.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="bio" className="block font-semibold mb-2">
            Presentación
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Escribe algo sobre ti..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            value={formik.values.bio}
            maxLength={150}
          />
          <p className="text-right text-gray-500 text-sm">
            {formik.values.bio.length} / 150
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="gender" className="block font-semibold mb-2">
            Género
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="">Selecciona</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="font-semibold">Mostrar sugerencias de cuentas en los perfiles</label>
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={formik.values.notificationsEnabled}
            onChange={formik.handleChange}
            className="w-6 h-6 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          onClick={formik.handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default Settings;
