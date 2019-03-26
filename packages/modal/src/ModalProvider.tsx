import * as React from 'react'

import ModalContext from './ModalContext'
import { ModalComponentType } from './types'

type ModalData = {
  key: number
  visible: boolean
  payload: any
  component: ModalComponentType<any>
  onHide: () => void
}

export interface Props {
  children: React.ReactNode
  container?: React.ComponentType
}

export default function ModalProvider (props: Props) {
  const { children, container: Container = React.Fragment } = props
  const [modals, setModals] = React.useState<ModalData[]>([])

  const mount = React.useCallback((key: number, component: ModalComponentType<any>, onHide) => {
    const modal = { key, component, visible: false, payload: {}, onHide }
    setModals([...modals, modal])
  }, [])

  const unmount = React.useCallback((key: number) => {
    setModals((oldModals) => {
      return oldModals.filter((modal) => modal.key !== key)
    })
  }, [])

  const show = React.useCallback((key: number, payload?: any) => {
    setModals((oldModals) => {
      return oldModals.map((modal) =>
        modal.key === key ? { ...modal, visible: true, payload } : modal
      )
    })
  }, [])

  const hide = React.useCallback((key: number) => {
    setModals((oldModals) => {
      return oldModals.map((modal) => (modal.key === key ? { ...modal, visible: false } : modal))
    })
  }, [])

  const context = React.useMemo(() => ({ mount, unmount, show, hide }), [])

  return (
    <ModalContext.Provider value={context}>
      {children}
      <Container>
        {modals.map(({ payload, component: Modal, ...rest }) => (
          <Modal {...payload} {...rest} />
        ))}
      </Container>
    </ModalContext.Provider>
  )
}
