# `@react-hero/router-view`

> 用于`react-router`的路由配置组件。

## 安装

```bash
npm install @react-hero/router-view --save
# or
yarn add @react-hero/router-view
```

## 基础用法

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

### 路由配置项

- `path` URL 字符串。
- `component` React 组件。
- `exact` 是否精确匹配`location.pathname`。
- `redirect` 导航到新的路由。
- `routes` 嵌套子路由。
- `payload` 作为属性传递给当前路由组件。

### Route Component Props

包含`react-router`中的所有属性，以及下列属性。

- `routes` 嵌套子路由，来自路由配置项中的`routes`。
- `payload` 来自路由配置项中的`payload`。

### RouterView Props

- `switched` 使用`Switch`作为包装组件，默认值为`true`。
- `routes` 嵌套子路由，来自`this.props`。
- `extraProps` 可传递给子路由组件的额外属性。
