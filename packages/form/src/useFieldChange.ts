import * as React from 'react'

import FormStore from './FormStore'

export default function useFieldChange<T> (
  store: FormStore<T> | undefined,
  name: string | undefined,
  onChange: (store: FormStore<T>, name: string) => void
) {
  React.useEffect(() => {
    if (!name || !store) return

    return store.subscribe((n) => {
      if (name === '*' || n === name || n === '*') {
        onChange(store, name)
      }
    })
  }, [name, store])
}
