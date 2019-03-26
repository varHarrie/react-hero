import * as React from 'react'

import ModalContext from './ModalContext'
import { ModalComponentProps, ModalComponentType } from './types'

type ModalOwnProps<P> = Pick<P, Exclude<keyof P, keyof ModalComponentProps>>

let currentKey = 0

function generateKey () {
  return currentKey++
}

export default function useModal<P extends ModalComponentProps = any> (
  component: ModalComponentType<P>
) {
  const key = React.useMemo(generateKey, [])
  const { mount, unmount, show: showModal, hide: hideModal } = React.useContext(ModalContext)

  const [visible, setVisible] = React.useState(false)
  const refPayload = React.useRef({})

  const show = React.useCallback((payload?: ModalOwnProps<P>) => {
    refPayload.current = payload || {}
    setVisible(true)
  }, [])

  const hide = React.useCallback(() => {
    setVisible(false)
  }, [])

  React.useEffect(() => {
    mount(key, component, hide)
    return () => unmount(key)
  }, [])

  React.useEffect(() => {
    if (visible) {
      showModal(key, refPayload.current)
    } else {
      hideModal(key)
    }
  }, [visible])

  return { visible, show, hide }
}
