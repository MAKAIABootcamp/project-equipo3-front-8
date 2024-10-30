import { Routes, Route } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { restoreActiveSessionThunk } from "../redux/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
// import Dashboard from "../pages/Dashboard";
import LoginPanel from "../pages/LoginPanel";
import SignIn from "../pages/SignIn";
import PageLoader from "../components/Loaders/PageLoader";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import NotFound from "../pages/NotFound";
import ModalRegistro from "../components/Layout/RegistryModal";
import RestaurantProfile from "../components/RestaurantProfile";
import UserHubPage from "../pages/UserHubPage";
import UserSettingPage from "../pages/UserSettingPage";
import ModalReseña from "../components/Layout/ReviewModal";
import { useLocation } from "react-router-dom";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((store) => store.auth);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const background = location.state?.background;
  // const { isActiveModal } = useSelector((store) => store.modal);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(restoreActiveSessionThunk(authUser.uid));
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (checking || loading) return <PageLoader />;

  // if (isAuthenticated && !user?.eatingOutFrecuency && !user?.interests.length)
  //   return <ModalRegistro step={4} />;
  return (
    <>
      <Routes location={background || location}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="restaurantprofile" element={<RestaurantProfile />} /> */}
          <Route path="profile/:userType/:username" element={<UserHubPage />} />

          <Route element={<PublicRouter isAutenticate={isAuthenticated} />}>
            <Route path="login" element={<LoginPanel />} />
            <Route path="loginWithEmailAndPassword" element={<SignIn />} />
            <Route
              path="loginWithPhoneNumber"
              element={<SignIn isPhone={true} />}
            />
            {/* {background && <Route path="register" element={<ModalRegistro />} />} */}
            {/* <Route path='restaurantprofile' element={<RestaurantProfile />} /> */}
          </Route>

          <Route element={<PrivateRouter isAutenticate={isAuthenticated} />}>
            {/* <Route path="news" element={<Dashboard />}>
            <Route path=":newid" element={<Dashboard />} />
          </Route> */}
            {/* {background && <Route path="new-review" element={<ModalReseña />} />} */}
          </Route>
          <Route path="setting" element={<UserSettingPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route element={<PublicRouter isAutenticate={isAuthenticated} />}>
            <Route path="/register" element={<ModalRegistro />} />
          </Route>
          <Route element={<PrivateRouter isAutenticate={isAuthenticated} />}>
            <Route path="/new-review" element={<ModalReseña />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
