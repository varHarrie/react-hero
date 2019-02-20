import { deepCopy, deepGet, deepSet } from './utils'

export type FormListener = (name: string) => void

export type FormValidator = (value: any, values: any) => boolean | string

export type FormRules = { [key: string]: FormValidator }

export default class FormStore<T extends Object = any> {
  private initialValues: T

  private listeners: FormListener[] = []

  private values: T

  private rules: FormRules

  private errors: { [key: string]: string } = {}

  public constructor (values: Partial<T> = {}, rules: FormRules = {}) {
    this.initialValues = values as any
    this.values = deepCopy(values) as any
    this.rules = rules
  }

  private notify (name: string) {
    this.listeners.forEach((listener) => listener(name))
  }

  public get (name?: string) {
    return name === undefined ? { ...this.values } : deepGet(this.values, name)
  }

  public set (values: Partial<T>): void
  public set (name: string, value: any, validate?: boolean): void
  public set (name: any, value?: any, validate: boolean = true) {
    if (typeof name === 'string') {
      deepSet(this.values, name, value)
      if (validate) this.validate(name)
      this.notify(name)
    } else if (name) {
      Object.keys(name).forEach((n) => this.set(n, name[n]))
    }
  }

  public reset () {
    this.errors = {}
    this.values = deepCopy(this.initialValues)
    this.notify('*')
  }

  public validate (): [string | undefined, T]
  public validate (name: string): string
  public validate (name?: string) {
    if (name === undefined) {
      Object.keys(this.rules).forEach((n) => this.validate(n))
      this.notify('*')
      return [this.error(), this.get()]
    }

    const validator = this.rules[name]
    const result = validator ? validator(this.get(name), this.values) : true
    const message = result === true ? undefined : result || ''

    if (message === undefined) {
      delete this.errors[name]
    } else {
      this.errors[name] = message
    }

    return message
  }

  public error (name?: string, value?: string) {
    if (name === undefined) name = Object.keys(this.errors)[0]
    if (value === undefined) return this.errors[name]
    return (this.errors[name] = value)
  }

  public subscribe (listener: FormListener) {
    this.listeners.push(listener)

    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) this.listeners.splice(index, 1)
    }
  }
}
