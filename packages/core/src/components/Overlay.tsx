import * as React from 'react'

let newId = 0

export interface OverlayEntity<T> {
  id: number
  visible: boolean
  payload: T
}

export interface OverlayMethods<T> {
  add: (payload: T, visible?: boolean) => void
  show: (id: number) => void
  hide: (id: number) => void
  remove: (id: number) => void
}

export interface Props<T> {
  renderEntity: (entity: OverlayEntity<T>, methods: OverlayMethods<T>) => React.ReactNode
}

export interface State<T> {
  entities: Array<OverlayEntity<T>>
}

export default class Overlay<T> extends React.Component<Props<T>, State<T>> {
  public state: State<T> = {
    entities: []
  }

  public add = (payload: T, visible: boolean = true) => {
    this.setState((state) => ({
      entities: [...state.entities, { id: newId++, visible, payload }]
    }))
  }

  public show = (id: number) => {
    this.setState((state) => ({
      entities: state.entities.map((e) => (e.id === id ? { ...e, visible: true } : e))
    }))
  }

  public hide = (id?: number) => {
    this.setState((state) => ({
      entities:
        id === undefined
          ? state.entities.map((e) => ({ ...e, visible: false }))
          : state.entities.map((e) => (e.id === id ? { ...e, visible: false } : e))
    }))
  }

  public remove = (id?: number) => {
    this.setState((state) => ({
      entities: id === undefined ? [] : state.entities.filter((m) => m.id !== id)
    }))
  }

  public render () {
    const { renderEntity } = this.props
    const { entities } = this.state

    const methods: OverlayMethods<T> = {
      add: this.add,
      show: this.show,
      hide: this.hide,
      remove: this.remove
    }

    return <React.Fragment>{entities.map((e) => renderEntity(e, methods))}</React.Fragment>
  }
}
