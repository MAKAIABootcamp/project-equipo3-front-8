import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import PropTypes from 'prop-types'



const PrivateRoutes = ({isAutenticate,redirect = "/login", children}) => {
    if (!isAutenticate) {
      return <Navigate replace to={redirect} />
    }
  return children || <Outlet/>
}

PrivateRoutes.propTypes = {
    isAutenticate: PropTypes.bool.isRequired,
    redirect: PropTypes.string,
    children: PropTypes.node

}

export default PrivateRoutes
