import * as React from 'react'
import { RouteComponentProps as RouteProps } from 'react-router'

export interface RouteComponentProps<P = {}> extends RouteProps<P> {
  routes?: RouteOption[]
  payload?: any
}

export interface RouteOption {
  path?: string
  exact?: boolean
  component?: React.ComponentType<RouteComponentProps<any>>
  redirect?: string
  routes?: RouteOption[]
  payload?: any
}
