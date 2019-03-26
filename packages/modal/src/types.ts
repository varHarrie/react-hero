export type ModalComponentProps = {
  visible: boolean
  onHide: () => void
}

export type ModalComponentType<T extends ModalComponentProps> = React.ComponentType<T>
