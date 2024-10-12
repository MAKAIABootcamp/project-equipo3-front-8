import { Navigate, Outlet } from "react-router-dom"
import PropTypes from "prop-types"


const PrivateRouter = ({ isAutenticate, redirect = "/login", children }) => {
  if (!isAutenticate) {
    return <Navigate replace to={redirect} />
  }
  return children || <Outlet />
}

PrivateRouter.propTypes = {
  isAutenticate: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
  children: PropTypes.node

}

export default PrivateRouter
