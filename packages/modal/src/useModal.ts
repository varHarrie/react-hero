import * as React from 'react'
import ModalContext, { ModalComponent } from './ModalContext'

let currentKey = 0

function generateKey () {
  return currentKey++
}

export default function useModal<P extends Object = any> (component: ModalComponent<P>) {
  const key = React.useMemo(generateKey, [])
  const [visible, setVisible] = React.useState(false)
  const { mount, unmount, show: showModal, hide: hideModal } = React.useContext(ModalContext)

  const show = React.useCallback((payload: P) => {
    // ???
    setVisible(true)
    showModal(key, payload)
  }, [])

  const hide = React.useCallback(() => {
    setVisible(false)
    hideModal(key)
  }, [])

  React.useEffect(() => {
    mount(key, component)

    return () => {
      unmount(key)
    }
  }, [])

  return { visible, show, hide }
}
