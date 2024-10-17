import { Routes, Route } from 'react-router-dom'
import { auth } from '../Firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { restoreActiveSessionThunk } from '../redux/auth/authSlice'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import LoginPanel from '../pages/LoginPanel'
import SignIn from '../pages/SignIn'
import PageLoader from '../components/Loaders/PageLoader'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import NotFound from '../pages/NotFound';
import ModalRegistro from '../components/Layout/ModalRegistro';
import RestaurantProfile from '../components/RestaurantProfile'

const AppRouter = () => {
  const dispatch = useDispatch()
  const { loading, isAuthenticated } = useSelector((store) => store.auth);
  const [checking, setChecking] = useState(true)


  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(restoreActiveSessionThunk(authUser.uid))
      }
      setChecking(false)
    });
  }, [dispatch]);


  if (checking || loading) return <PageLoader />

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path='restaurantprofile' element={<RestaurantProfile />} />
        <Route element={<PublicRouter isAutenticate={isAuthenticated} />}>
          <Route path='login' element={<LoginPanel />} />
          <Route path='loginWithEmailAndPassword' element={<SignIn />} />
          <Route path='loginWithPhoneNumber' element={<SignIn isPhone={true} />} />
          <Route path='register' element={<ModalRegistro />} />
          {/* <Route path='restaurantprofile' element={<RestaurantProfile />} /> */}

        </Route>


        <Route element={<PrivateRouter isAutenticate={isAuthenticated} />}>
          <Route path='news' element={<Dashboard />}>
            <Route path=':newid' element={<Dashboard />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>

  )
}

export default AppRouter