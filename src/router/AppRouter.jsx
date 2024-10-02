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
import LoginForm from '../pages/modales/LoginForm'
import SingIn from '../pages/modales/SingIn'


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
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route element={<PublicRouter isAutenticate={isAuthenticated}/>}>
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
            <Route path='loginform' element={<LoginForm/>} />
            <Route path='singin' element={<SingIn/>} />
        </Route>
        
        
        <Route element={<PrivateRouter isAutenticate={isAuthenticated}/>}>
            <Route path='news' element={<ProfileRestaurant/>}>
                <Route path=':newid' element={<ProfileRestaurant/>} />
            </Route>
        </Route>
      
    </Route>
    </Routes>
  )
}

export default AppRouter