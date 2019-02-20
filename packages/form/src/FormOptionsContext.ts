import * as React from 'react'

export interface FormOptions {
  inline?: boolean
  compact?: boolean
  required?: boolean
  labelWidth?: number
  gutter?: number
  errorClassName?: string
}

const FormOptionsContext = React.createContext<FormOptions>({})

export default FormOptionsContext
