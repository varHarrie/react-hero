import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Link, Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import { RouteComponentProps, RouteOption, RouterView } from '@react-hero/router-view'

interface MainViewProps extends RouteComponentProps {}

function MainView (props: MainViewProps) {
  return (
    <div>
      <h1>Main</h1>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/product'>Product</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/404'>404</Link>
        </li>
      </ul>
      <RouterView routes={props.routes} />
    </div>
  )
}

const routes: RouteOption[] = [
  {
    path: '/404',
    component: () => (
      <div>
        <h1>404</h1>
        <Link to='/'>back</Link>
      </div>
    )
  },
  {
    path: '/',
    component: MainView,
    routes: [
      {
        path: '/home',
        component: () => <h2>Home</h2>
      },
      {
        path: '/product',
        component: () => <h2>Product</h2>
      },
      {
        path: '/about',
        component: () => <h2>About</h2>
      },
      {
        redirect: '/404'
      }
    ]
  }
]

const history = createHashHistory()

storiesOf('Components', module).add('RouterView', () => {
  return (
    <Router history={history}>
      <div>
        <RouterView routes={routes} />
      </div>
    </Router>
  )
})
