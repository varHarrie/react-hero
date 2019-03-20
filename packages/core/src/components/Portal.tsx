import * as React from 'react'
import * as ReactROM from 'react-dom'

export interface Props {
  container?: Element
  children?: React.ReactNode
}

export default function Portal (props: Props) {
  const { container = document.body, children } = props
  return ReactROM.createPortal(children, container)
}
