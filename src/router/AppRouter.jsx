import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
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
import LoginOption from '../pages/LoginOption';
import SignIn from '../pages/SignIn';
// import PhoneLogin from '../components/modales/PhoneLogin'
// import LoginModal from '../components/modales/LoginModal'
// import EmailLogin from '../components/modales/EmailLogin'
// import GoogleLogin from '../components/modales/GoogleLogin'
// import RegisterModal from '../components/modales/RegisterModal'
// import FacebookLogin from '../components/modales/FacebookLogin'




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




  if (loading || checking) return <div className='text-center inset-8 justify-center items-center text-pink-600' > FODDIES </div>;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage2 />}>
          <Route element={<PublicRouter isAutenticate={isAuthenticated} />}>
            <Route path='loginOptions' element={<LoginOption />} />
            <Route path='loginWithEmailAndPassword' element={<SignIn />} />
            <Route path='loginWithPhoneNumber' element={<SignIn isPhone={true} />} />
          </Route>
        </Route>
        {/* <Route element={<PublicRouter isAutenticate={isAuthenticated}/>}> */}
        {/* <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} /> */}
        {/* <Route path='phonelogin' element={<PhoneLogin/>} />
            <Route path='loginmodal' element={<LoginModal/>} />
            <Route path='emailLogin' element={<EmailLogin/>} />
            <Route path='GoogleLogin' element={<GoogleLogin/>} />
            <Route path='facebook' element={<FacebookLogin/>} />
            <Route path='registermodal' element={<RegisterModal/>} /> */}
        {/*             
        </Route> */}


        <Route element={<PrivateRouter isAutenticate={isAuthenticated} />}>
          <Route path='news' element={<Dashboard />}>
            <Route path=':newid' element={<Dashboard />} />
          </Route>
        </Route>

      </Route>
    </Routes>




  )
}

export default AppRouter