import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types'

const PublicRoutes = ({ isAuthenticated, redirectPath = "/", children }) => {
  if (isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }
  return children || <Outlet />;
};

PrivateRoutes.propTypes = {
  isAutenticate: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
  children: PropTypes.node

}

export default PublicRoutes;