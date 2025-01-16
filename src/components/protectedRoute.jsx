import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import auth from './services/authService'

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  console.log('this', auth.getCurrentUser)

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default ProtectedRoute
