import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { RouteOption } from './types'

export interface Props {
  switched?: boolean
  routes?: RouteOption[]
  extraProps?: any
}

export default function RouterView (props: Props) {
  const { switched = true, routes, extraProps = {} } = props
  const Wrapper = switched ? Switch : React.Fragment

  if (!routes || !routes.length) return null

  return (
    <Wrapper>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          render={(routeProps) =>
            route.redirect && route.path === routeProps.location.pathname ? (
              <Redirect to={route.redirect} />
            ) : route.component ? (
              <route.component
                {...routeProps}
                {...extraProps}
                routes={route.routes}
                payload={route.payload}
              />
            ) : null
          }
        />
      ))}
    </Wrapper>
  )
}
