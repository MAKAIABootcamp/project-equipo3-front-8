import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Layout from '../components/Layout'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from "react-redux";
import { restoreActiveSessionThunk } from '../redux/auth/authSlice'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import { auth } from '../Firebase/firebaseConfig'
import Home from '../pages/Home'
import HomePage2 from '../pages/HomePage2'




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
        <Route path='/' element={<HomePage2/>} />
        <Route element={<PublicRouter isAutenticate={isAuthenticated}/>}>
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
        </Route>
        
        
        <Route element={<PrivateRouter isAutenticate={isAuthenticated}/>}>
            <Route path='news' element={<Dashboard/>}>
                <Route path=':newid' element={<Dashboard/>} />
            </Route>
        </Route>
      
    </Route>
    </Routes>
  )
}

export default AppRouter