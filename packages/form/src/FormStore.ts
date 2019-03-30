import { deepCopy, deepGet, deepSet } from './utils'

export type FormListener = (name: string) => void

export type FormValidator = (value: any, values: any) => boolean | string

export type FormRules = { [key: string]: FormValidator }

export type FormErrors = { [key: string]: string | undefined }

export default class FormStore<T extends Object = any> {
  private initialValues: T

  private listeners: FormListener[] = []

  private values: T

  private rules: FormRules

  private errors: FormErrors = {}

  public constructor (values: Partial<T> = {}, rules: FormRules = {}) {
    this.initialValues = values as any
    this.values = deepCopy(values) as any
    this.rules = rules

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.reset = this.reset.bind(this)
    this.error = this.error.bind(this)
    this.validate = this.validate.bind(this)
    this.subscribe = this.subscribe.bind(this)
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

  public error (): FormErrors
  public error (name: number | string): string | undefined
  public error (name: string, value: string | undefined): string | undefined
  public error (...args: any[]) {
    let [name, value] = args

    if (args.length === 0) return this.errors

    if (typeof name === 'number') {
      name = Object.keys(this.errors)[name]
    }

    if (args.length === 2) {
      if (value === undefined) {
        delete this.errors[name]
      } else {
        this.errors[name] = value
      }
    }

    return this.errors[name]
  }

  public validate (): [Error | undefined, T]
  public validate (name: string): [Error | undefined, any]
  public validate (name?: string) {
    if (name === undefined) {
      Object.keys(this.rules).forEach((n) => this.validate(n))
      this.notify('*')

      const message = this.error(0)
      const error = message === undefined ? undefined : new Error(message)
      return [error, this.get()]
    } else {
      const validator = this.rules[name]
      const value = this.get(name)
      const result = validator ? validator(value, this.values) : true
      const message = this.error(name, result === true ? undefined : result || '')

      const error = message === undefined ? undefined : new Error(message)
      return [error, value]
    }
  }

  public subscribe (listener: FormListener) {
    this.listeners.push(listener)

    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) this.listeners.splice(index, 1)
    }
  }
}
