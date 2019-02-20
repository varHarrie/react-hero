import './style.less'

import * as React from 'react'

import FormField from './FormField'
import FormStore from './FormStore'
import FormStoreContext from './FormStoreContext'
import FormOptionsContext, { FormOptions } from './FormOptionsContext'

export interface Props extends FormOptions {
  store: FormStore
  className?: string
  children?: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

export default function Form (props: Props) {
  const { className = '', children, store, onSubmit, ...options } = props

  const classNames = 'rh-form ' + className

  return (
    <FormStoreContext.Provider value={store}>
      <FormOptionsContext.Provider value={options}>
        <form className={classNames} onSubmit={onSubmit}>
          {children}
        </form>
      </FormOptionsContext.Provider>
    </FormStoreContext.Provider>
  )
}

Form.Field = FormField
