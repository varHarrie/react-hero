import * as React from 'react'

import { ModalComponentType } from './types'

export type ModalContextType = {
  mount: (key: number, component: ModalComponentType<any>, hide: () => void) => void
  unmount: (key: number) => void
  show: (key: number, payload?: any) => void
  hide: (key: number) => void
}

const ModalContext = React.createContext<ModalContextType>(null as any)

export default ModalContext
