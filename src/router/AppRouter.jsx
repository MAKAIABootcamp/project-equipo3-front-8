import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import ProfileRestaurant from '../pages/ProfileRestaurant'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Layout from '../components/Layout'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/firebaseConfig'
import { useDispatch, useSelector } from "react-redux";
import { restoreActiveSessionThunk } from '../redux/auth/authSlice'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import EmailLogin from '../components/modales/EmailLogin'
import GoogleLogin from '../components/modales/GoogleLogin'
import LoginModal from '../components/modales/LoginModal'
import PhoneLogin from '../components/modales/PhoneLogin'
import FacebookLogin from '../components/modales/FacebookLogin'
import RegisterModal from '../components/modales/RegisterModal'


const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((store) => store.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(restoreActiveSessionThunk(authUser.uid));
      }
      setChecking(false);
    });
  }, [dispatch]);
  



  if (loading || checking) return <div>...Cargando</div>;

  return (
    <>
      
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
         
          {/* <Route path='EmailLogin' element={<EmailLogin />} />
          <Route path='PhoneLogin' element={<PhoneLogin />} />
          <Route path='GoogleLogin' element={<GoogleLogin />} />
          <Route path='Facebook' element={<FacebookLogin />} />
           */}
          <Route element={<PublicRouter isAutenticate={isAuthenticated} />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='LoginModal' element={<LoginModal />} />
            <Route path='EmailLogin' element={<EmailLogin />} />
            <Route path='PhoneLogin' element={<PhoneLogin />} /> 
            <Route path='GoogleLogin' element={<GoogleLogin />} />
            <Route path='Facebook' element={<FacebookLogin />} />
            <Route path='registermodal' element={<RegisterModal/>} />

          </Route>


          <Route element={<PrivateRouter isAutenticate={isAuthenticated} />}>
            <Route path='news' element={<ProfileRestaurant />}>
              <Route path=':newid' element={<ProfileRestaurant />} />
            </Route>
          </Route>

        </Route>
      </Routes>
      


    </>
  )
}

export default AppRouter