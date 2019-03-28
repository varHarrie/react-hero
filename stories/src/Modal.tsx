import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { storiesOf } from '@storybook/react'
import { ModalProvider, useModal } from '@react-hero/modal'

declare const document: any

const modalStyles = (visible: boolean): React.CSSProperties => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  padding: '30px',
  display: visible ? 'block' : 'none',
  background: '#fff',
  border: '1px solid #ddd',
  transform: 'translate(-50%, -50%)'
})

interface ModalProps {
  visible: boolean
  title: string
  onHide: () => void
}

function Modal (props: ModalProps) {
  const { visible, title, onHide } = props

  return ReactDOM.createPortal(
    <div style={modalStyles(visible)}>
      <div>{title}</div>
      <button onClick={onHide}>close</button>
    </div>,
    document.body
  )
}

function App () {
  const { visible, show, hide } = useModal(Modal)

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

storiesOf('Components', module).add('Modal', () => {
  return (
    <ModalProvider>
      <App />
    </ModalProvider>
  )
})
