import * as React from 'react'

export type ModalComponentProps<T extends Object> = T & {
  visible: boolean
}

export type ModalComponent<T extends Object> = React.ComponentType<ModalComponentProps<T>>

export type ModalContextType = {
  mount: (key: number, component: ModalComponent<any>) => void
  unmount: (key: number) => void
  show: (key: number, payload?: any) => void
  hide: (key: number) => void
}

const ModalContext = React.createContext<ModalContextType>(null as any)

export default ModalContext
