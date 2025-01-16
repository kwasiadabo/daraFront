import React, { useState, useEffect } from 'react'
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index'
import auth from '../components/services/authService'
import 'src/sidebar.css'

const TheLayout = () => {
  const [user, setUser] = useState(auth.getCurrentUser())
  const token = localStorage.getItem('token')
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        {token && (
          <TheHeader
            className="header float-right"
            staff={user.nameOfStaff}
            role={user.userRole}
            branch={user.branch}
          />
        )}
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
