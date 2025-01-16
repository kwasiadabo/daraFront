import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import auth from '../components/services/authService'
import { useHistory } from 'react-router-dom'
import { useIdleTimer } from 'react-idle-timer'
// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  let history = useHistory()

  const onIdle = () => {
    auth.logout()
    history.push('/login')
  }

  const { isIdle } = useIdleTimer({ onIdle, timeout: 2000 * 60 * 1 })

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        {localStorage.getItem('token') ? (
                          <route.component {...props} />
                        ) : (
                          Redirect('/login')
                        )}
                      </CFade>
                    )}
                  />
                )
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
