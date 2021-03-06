# `@react-hero/modal`

> 基于 React Hooks 的模态窗口封装。

## 安装

```bash
npm install @react-hero/modal --save
# 或者
yarn add @react-hero/modal
```

## 基础用法

在根组件中使用`ModalProvider`：

```javascript
function App() {
  return (
    <ModalProvider>
      <DemoView />
    </ModalProvider>
  )
}
```

通过`useModal`获得模态窗口显示状态和`show`、`hide`函数，用于控制窗口的显示和隐藏。

```javascript
function DemoView() {
  const { visible, show, hide } = useModal(MyModal)

  const onShow = React.useCallback(() => {
    show({ title: 'Modal Title' })
  }, [])

  const onHide = React.useCallback(() => {
    hide()
  }, [])

  return (
    <div>
      <span>visible: {visible.toString()}</span>
      <button onClick={onShow}>open</button>
      <button onClick={onHide}>hide</button>
    </div>
  )
}
```

模态窗口组件：

```javascript
const modalStyles = (visible) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  padding: '30px',
  display: visible ? 'block' : 'none',
  background: '#fff',
  border: '1px solid #ddd',
  transform: 'translate(-50%, -50%)'
})

function MyModal(props: ModalProps) {
  const { visible, title, onHide } = props

  return ReactDOM.createPortal(
    <div style={modalStyles(visible)}>
      <div>{title}</div>
      <button onClick={onHide}>close</button>
    </div>,
    document.body
  )
}
```

## APIs

- `useModal(Component)` 传入模态窗口组件，返回`visible`、`show函数`、`hide函数`。
- `show(payload)` 显示窗口，传入的 payload 会当做 props 传入到模态窗口组件中。
- `hide()` 隐藏窗口。
