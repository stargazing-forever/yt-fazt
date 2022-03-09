import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export const PublicRoute = ({isAuth, component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      component={ props => (
                    !isAuth
                      ? <Component {...props} />
                      : <Redirect to="/" />

      )}
    />
  )
}

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}