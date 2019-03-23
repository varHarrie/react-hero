export function isObject (obj: any) {
  return obj !== null && typeof obj === 'object'
}

export function deepGet (obj: any, path: string) {
  const parts = path.split('.')
  const length = parts.length

  for (let i = 0; i < length; i++) {
    if (!isObject(obj)) return undefined
    obj = obj[parts[i]]
  }

  return obj
}

export function deepSet (obj: any, path: string, value: any) {
  if (!isObject(obj)) return obj

  const root = obj
  const parts = path.split('.')
  const length = parts.length

  for (let i = 0; i < length; i++) {
    const p = parts[i]

    if (i === length - 1) {
      obj[p] = value
    } else if (!isObject(obj[p])) {
      obj[p] = {}
    }

    obj = obj[p]
  }

  return root
}

export function deepCopy<T> (target: T): T {
  const type = typeof target

  if (target === null || type === 'boolean' || type === 'number' || type === 'string') {
    return target
  }

  if (target instanceof Date) {
    return new Date(target.getTime()) as any
  }

  if (Array.isArray(target)) {
    return target.map((o) => deepCopy(o)) as any
  }

  if (typeof target === 'object') {
    const obj: any = {}

    for (let key in target) {
      obj[key] = deepCopy(target[key])
    }

    return obj
  }

  return undefined as any
}

export function getPropName (valueProp: string | ((type: any) => string), type: any) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp
}

export function getValueFromEvent (...args: any[]) {
  const e = args[0] as React.ChangeEvent<any>
  return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
}
