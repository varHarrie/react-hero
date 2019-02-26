import 'jest'

import { FormStore } from '..'

describe('FormStore', () => {
  it('set', () => {
    const store = new FormStore()

    store.set('key', 'value')
    expect(store.get('key')).toBe('value')

    store.set({ a: 1, b: 2 })
    expect(store.get('a')).toBe(1)
    expect(store.get('b')).toBe(2)

    store.set('this.is.a.deep.key', 'value')
    expect(store.get()).toHaveProperty('this.is.a.deep.key', 'value')
    expect(store.get('this.is.a.deep.key')).toBe('value')
  })

  it('reset', () => {
    const store = new FormStore({ default: 'value' })

    store.set('default', 'modifiedValue')
    store.set('new', 'value')
    store.reset()

    expect(store.get()).toEqual({ default: 'value' })
  })

  it('error', () => {
    const store = new FormStore()

    store.error('key0', 'error0')
    store.error('key1', 'error1')
    store.error('deep.key', 'error2')

    expect(store.error('key1')).toBe('error1')
    expect(store.error('deep.key')).toBe('error2')
    expect(store.error(0)).toBe('error0')
    expect(store.error()).toEqual({ key0: 'error0', key1: 'error1', 'deep.key': 'error2' })
  })

  it('validate', () => {
    const store = new FormStore(
      {
        username: '',
        password: '',
        contacts: {
          phone: '123456',
          email: 'email'
        }
      },
      {
        username: (val) => val.length > 0 || 'Username is required',
        password: (val) => (val.length >= 6 && val.length <= 18) || 'Password length is invalid',
        'contacts.email': (email) => email.includes('@') || 'Email is invalid'
      }
    )

    store.set('username', 'Harrie')
    store.set('password', '123')

    expect(store.error('username')).toBe(undefined)
    expect(store.error('password')).toBe('Password length is invalid')

    const [error, password] = store.validate('password')
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Password length is invalid')
    expect(password).toBe('123')

    store.set('password', '123456')
    const [error2, values] = store.validate()
    expect(error2).toBeInstanceOf(Error)
    expect(error2.message).toBe('Email is invalid')
    expect(values).toEqual({
      username: 'Harrie',
      password: '123456',
      contacts: { phone: '123456', email: 'email' }
    })
  })

  it('subscribe', () => {
    const store = new FormStore()

    store.subscribe((name) => {
      expect(name).toBe('username')
      expect(store.get(name)).toBe('Harrie')
    })

    store.set('username', 'Harrie')
  })
})
