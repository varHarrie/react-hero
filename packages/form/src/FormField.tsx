import * as React from 'react'

import FormStoreContext from './FormStoreContext'
import FormOptionsContext, { FormOptions } from './FormOptionsContext'

export interface Props extends FormOptions {
  className?: string
  label?: string
  name?: string
  valueProp?: string | ((type: any) => string)
  valueGetter?: (...args: any[]) => any
  suffix?: React.ReactNode
  children?: React.ReactNode
}

export default function FormField (props: Props) {
  const {
    className,
    label,
    name,
    valueProp = 'value',
    valueGetter = getValueFromEvent,
    suffix,
    children,
    ...restProps
  } = props

  const store = React.useContext(FormStoreContext)
  const options = React.useContext(FormOptionsContext)
  const [value, setValue] = React.useState(name && store ? store.get(name) : undefined)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const onChange = React.useCallback(
    (...args: any[]) => name && store && store.set(name, valueGetter(...args)),
    [name, store, valueGetter]
  )

  React.useEffect(() => {
    if (!name || !store) return

    return store.subscribe((n) => {
      if (n === name || n === '*') {
        setValue(store.get(name))
        setError(store.error(name))
      }
    })
  }, [name, store])

  let child: any = children

  if (name && store && React.isValidElement(child)) {
    const prop = getPropName(valueProp, child && child.type)
    const childProps = { [prop]: value, onChange }
    child = React.cloneElement(child, childProps)
  }

  const { inline, compact, required, labelWidth, gutter, errorClassName } = {
    ...options,
    ...restProps
  }

  const classNames = [
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
    error ? classes.error : '',
    className ? className : '',
    error ? errorClassName : ''
  ].join('')

  const headerStyle = {
    width: labelWidth,
    marginRight: gutter
  }

  return (
    <div className={classNames}>
      {label !== undefined && (
        <div className={classes.header} style={headerStyle}>
          {label}
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.control}>{child}</div>
        <div className={classes.message}>{error}</div>
      </div>
      {suffix !== undefined && <div className={classes.footer}>{suffix}</div>}
    </div>
  )
}

const classes = {
  field: 'rh-form-field ',
  inline: 'rh-form-field--inline ',
  compact: 'rh-form-field--compact ',
  required: 'rh-form-field--required ',
  error: 'rh-form-field--error ',

  header: 'rh-form-field__header',
  container: 'rh-form-field__container',
  control: 'rh-form-field__control',
  message: 'rh-form-field__message',
  footer: 'rh-form-field__footer'
}

function getPropName (valueProp: string | ((type: any) => string), type: any) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp
}

function getValueFromEvent (e: React.ChangeEvent<any>) {
  return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
}
