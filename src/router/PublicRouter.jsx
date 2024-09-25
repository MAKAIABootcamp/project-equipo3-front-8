import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import PropTypes from 'prop-types'



const PublicRouter = ({isAutenticate,redirect = "/", children}) => {
    if (isAutenticate) {
      return <Navigate replace to={redirect} />
    }
  return children || <Outlet/>
}

PublicRouter.propTypes = {
    isAutenticate: PropTypes.bool.isRequired,
    redirect: PropTypes.string,
    children: PropTypes.node

}

export default PublicRouter