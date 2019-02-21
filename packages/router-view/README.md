# `@react-hero/router-view`

> Route configuration component for `react-router`.

## Installation

```bash
npm install @react-hero/router-view --save
# or
yarn add @react-hero/router-view
```

## Basic Usage

```javascript
import { Router } from 'react-router'
import { RouterView } from '@react-hero/form'
import { createHashHistory } from 'history'

const history = createHashHistory()

const routes = [
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
  }
]

function App() {
  return (
    <Router history={history}>
      <div>
        <h1>App</h1>
        <RouterView routes={routes} />
      </div>
    </Router>
  )
}
```

## APIs

### Route Option

- `path` URL string.
- `component` React component.
- `exact` Whether only matches with `location.pathname` exactly.
- `redirect` Navigates to new location.
- `routes` Nested child routes.
- `payload` Pass as a prop into route component.

### Route Component Props

Includes all props from `react-router` and the following props.

- `routes` Nested child routes from route option.
- `payload` payload from route option.

### RouterView Props

- `switched` Use `Switch` as the wrapped component, default to `true`.
- `routes` Nested child routes, come from `this.props`.
- `extraProps` Pass as extra props into child routes.
