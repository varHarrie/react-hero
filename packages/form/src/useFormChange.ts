import * as React from 'react'

import FormStore from './FormStore'

export default function useFormChange<T> (
  store: FormStore<T> | undefined,
  onChange: (name: string) => void
) {
  React.useEffect(() => {
    if (!store) return

    return store.subscribe((n) => {
      onChange(n)
    })
  }, [store])
}
