import * as React from 'react'
import ModalContext, { ModalComponent } from './ModalContext'

type ModalData = {
  key: number
  visible: boolean
  payload: any
  component: ModalComponent<any>
}

export interface Props {
  children: React.ReactNode
}

export default function ModalProvider (props: Props) {
  const { children } = props

  const [modals, setModals] = React.useState<ModalData[]>([])

  const mount = React.useCallback((key: number, component: ModalComponent<any>) => {
    const modal = { key, component, visible: false, payload: {} }
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

  return (
    <ModalContext.Provider value={{ mount, unmount, show, hide }}>{children}</ModalContext.Provider>
  )
}
