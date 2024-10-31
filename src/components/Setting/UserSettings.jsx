// src/components/UserSettings.js
import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

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
    
  );
};

export default UserSettings;
