# `@react-hero/modal`

> Modal util based on react hooks.

## Installation

```bash
npm install @react-hero/modal --save
# Or
yarn add @react-hero/modal
```

## Basic Usage

Put `ModalProvider` on your root component:

```javascript
function App() {
  return (
    <ModalProvider>
      <DemoView />
    </ModalProvider>
  )
}
```

Get `visible`, `show()` and `hide()` by `useModal`.

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

Here is the modal component:

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

- `useModal(Component)` Pass into your modal component and return `visible`、`show()`、`hide()`.
- `show(payload)` Show modal, the `payload` will be treated as a `prop` of `Component`.
- `hide()` hide modal.
